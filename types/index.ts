export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  age?: number;
  height?: number;
  weight?: number;
  goal: 'weight_loss' | 'muscle_gain' | 'recomposition' | 'performance';
  plan: 'base' | 'escalada' | 'auge';
  xp: number;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'fitness' | 'nutrition' | 'consistency' | 'social' | 'milestone' | 'special';
  xpReward: number;
  unlockedAt?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  xpReward: number;
  completed: boolean;
  completedAt?: Date;
  expiresAt: Date;
}

export interface Recommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'habit';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}