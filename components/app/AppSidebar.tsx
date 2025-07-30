'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Trophy, 
  Target, 
  Brain, 
  User, 
  CreditCard,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: Home },
  { name: 'Conquistas', href: '/app/achievements', icon: Trophy },
  { name: 'Desafios', href: '/app/challenges', icon: Target },
  { name: 'IA Recomenda', href: '/app/recommendations', icon: Brain },
  { name: 'Perfil', href: '/app/profile', icon: User },
  { name: 'Plano', href: '/app/plan', icon: CreditCard },
];

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <div className="bg-primary-500 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-dark-900">Meu Auge</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="bg-primary-100 p-2 rounded-full">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Usuário</p>
                <p className="text-xs text-gray-500">Plano Escalada</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}