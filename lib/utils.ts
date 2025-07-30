import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Protege contra undefined ou valores inválidos
export function formatXP(xp?: number): string {
  if (typeof xp !== 'number' || isNaN(xp)) return '0';

  if (xp >= 1_000_000) {
    return `${(xp / 1_000_000).toFixed(1)}M`;
  }
  if (xp >= 1_000) {
    return `${(xp / 1_000).toFixed(1)}K`;
  }
  return xp.toString();
}

export function calculateLevel(xp?: number): number {
  if (typeof xp !== 'number' || isNaN(xp)) return 1;
  return Math.floor(xp / 1000) + 1;
}

export function getXPForNextLevel(currentXP?: number): number {
  const level = calculateLevel(currentXP);
  const xp = typeof currentXP === 'number' && !isNaN(currentXP) ? currentXP : 0;
  return level * 1000 - xp;
}

export function formatCurrency(amount?: number): string {
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(safeAmount);
}
