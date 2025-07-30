import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Achievement, Challenge } from '@/types';
import toast from 'react-hot-toast';

export function useGameification() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserGameData();
    }
  }, [user]);

  const fetchUserGameData = async () => {
    if (!user) return;

    try {
      // Fetch achievements
      const achievementsQuery = query(
        collection(db, 'achievements'),
        where('userId', '==', user.id)
      );
      const achievementsSnapshot = await getDocs(achievementsQuery);
      const userAchievements = achievementsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Achievement[];

      // Fetch challenges
      const challengesQuery = query(
        collection(db, 'challenges'),
        where('userId', '==', user.id)
      );
      const challengesSnapshot = await getDocs(challengesQuery);
      const userChallenges = challengesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Challenge[];

      setAchievements(userAchievements);
      setChallenges(userChallenges);
    } catch (error) {
      console.error('Error fetching game data:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeChallenge = async (challengeId: string) => {
    if (!user) return;

    try {
      const challengeRef = doc(db, 'challenges', challengeId);
      await updateDoc(challengeRef, {
        completed: true,
        completedAt: new Date()
      });

      // Update local state
      setChallenges(prev => 
        prev.map(challenge => 
          challenge.id === challengeId 
            ? { ...challenge, completed: true, completedAt: new Date() }
            : challenge
        )
      );

      // Award XP (this would typically be done in a Cloud Function)
      const challenge = challenges.find(c => c.id === challengeId);
      if (challenge) {
        const userRef = doc(db, 'users', user.id);
        const newXP = user.xp + challenge.xpReward;
        const newLevel = Math.floor(newXP / 1000) + 1;

        await updateDoc(userRef, {
          xp: newXP,
          level: newLevel
        });

        toast.success(`Desafio concluído! +${challenge.xpReward} XP`);
      }
    } catch (error) {
      console.error('Error completing challenge:', error);
      toast.error('Erro ao completar desafio');
    }
  };

  const unlockAchievement = async (achievementData: Omit<Achievement, 'id' | 'unlockedAt'>) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'achievements'), {
        ...achievementData,
        userId: user.id,
        unlockedAt: new Date()
      });

      toast.success(`Conquista desbloqueada: ${achievementData.title}!`);
      fetchUserGameData(); // Refresh data
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  return {
    achievements,
    challenges,
    loading,
    completeChallenge,
    unlockAchievement,
    refetch: fetchUserGameData
  };
}