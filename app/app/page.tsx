'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Trophy, 
  Brain,
  Calendar,
  Zap,
  Award,
  Activity
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useGameification } from '@/hooks/useGameification';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatXP, calculateLevel, getXPForNextLevel } from '@/lib/utils';

// Mock data for charts
const progressData = [
  { name: 'Jan', peso: 75, meta: 70 },
  { name: 'Fev', peso: 73, meta: 70 },
  { name: 'Mar', peso: 71, meta: 70 },
  { name: 'Abr', peso: 70.5, meta: 70 },
  { name: 'Mai', peso: 69.8, meta: 70 },
];

const recommendations = [
  {
    id: 1,
    type: 'workout',
    title: 'Treino de Força Hoje',
    description: 'Baseado no seu progresso, recomendamos um treino focado em membros superiores.',
    priority: 'high' as const
  },
  {
    id: 2,
    type: 'nutrition',
    title: 'Hidratação',
    description: 'Você está 200ml abaixo da meta de água hoje. Que tal um copo agora?',
    priority: 'medium' as const
  },
  {
    id: 3,
    type: 'habit',
    title: 'Momento de Descanso',
    description: 'Seus dados mostram que você precisa de mais 30min de sono por noite.',
    priority: 'low' as const
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { achievements, challenges } = useGameification();

  if (!user) return null;

  const currentLevel = calculateLevel(user.xp);
  const xpForNext = getXPForNextLevel(user.xp);
  const recentAchievements = achievements.slice(0, 3);
  const activeChallenges = challenges.filter(c => !c.completed).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h2>
              <p className="text-primary-100">
                Você está no nível {currentLevel} com {formatXP(user.xp)} XP
              </p>
              <div className="mt-4 bg-white/20 rounded-full h-2 w-64">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${((user.xp % 1000) / 1000) * 100}%` }}
                />
              </div>
              <p className="text-sm text-primary-100 mt-2">
                {xpForNext} XP para o próximo nível
              </p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 p-4 rounded-full">
                <Zap className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Progresso</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Desafios</p>
                <p className="text-2xl font-bold text-gray-900">{activeChallenges.length}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conquistas</p>
                <p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sequência</p>
                <p className="text-2xl font-bold text-gray-900">12 dias</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Progresso de Peso</h3>
              <Button variant="ghost" size="sm">Ver Mais</Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="peso" 
                  stroke="#1ab894" 
                  strokeWidth={2}
                  dot={{ fill: '#1ab894' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="meta" 
                  stroke="#ef4444" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Brain className="h-5 w-5 text-primary-500 mr-2" />
                <h3 className="text-lg font-semibold">IA Recomenda</h3>
              </div>
              <Button variant="ghost" size="sm">Ver Todas</Button>
            </div>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-100' :
                    rec.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {rec.type === 'workout' && <Target className="h-4 w-4 text-red-600" />}
                    {rec.type === 'nutrition' && <Calendar className="h-4 w-4 text-yellow-600" />}
                    {rec.type === 'habit' && <Activity className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold">Conquistas Recentes</h3>
              </div>
              <Button variant="ghost" size="sm">Ver Todas</Button>
            </div>
            <div className="space-y-3">
              {recentAchievements.length > 0 ? (
                recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Nenhuma conquista ainda. Continue se esforçando!
                </p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Active Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold">Desafios Ativos</h3>
              </div>
              <Button variant="ghost" size="sm">Ver Todos</Button>
            </div>
            <div className="space-y-3">
              {activeChallenges.length > 0 ? (
                activeChallenges.map((challenge) => (
                  <div key={challenge.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{challenge.title}</h4>
                      <p className="text-xs text-gray-600">{challenge.description}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Completar
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Nenhum desafio ativo. Novos desafios chegam em breve!
                </p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}