'use client';

import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function AppHeader() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-dark-900">
            Olá, {user?.name || 'Usuário'}! 👋
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-2 rounded-full">
              <span className="text-primary-600 font-medium">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <Button variant="ghost" onClick={logout} className="text-sm">
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}