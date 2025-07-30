'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Target, Dumbbell, BarChart3, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';

const goals = [
  {
    id: 'weight_loss',
    title: 'Emagrecimento',
    description: 'Perder peso de forma saudável e sustentável',
    icon: Target,
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 'muscle_gain',
    title: 'Ganho de Massa',
    description: 'Aumentar massa muscular e força',
    icon: Dumbbell,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'recomposition',
    title: 'Recomposição',
    description: 'Perder gordura e ganhar músculo simultaneamente',
    icon: BarChart3,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Melhorar desempenho atlético e energia',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

const plans = [
  {
    id: 'base',
    name: 'Base',
    price: 97,
    description: 'Ideal para começar sua jornada',
    features: ['Acesso básico', 'IA limitada', 'Suporte email']
  },
  {
    id: 'escalada',
    name: 'Escalada',
    price: 83,
    description: 'Para quem quer resultados mais rápidos',
    features: ['Acesso completo', 'IA avançada', 'Suporte prioritário'],
    popular: true
  },
  {
    id: 'auge',
    name: 'Auge',
    price: 59.90,
    description: 'Experiência premium completa',
    features: ['Tudo incluso', 'Consultoria 1:1', 'Suporte 24/7']
  }
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: '',
    age: '',
    height: '',
    weight: '',
    plan: 'escalada'
  });
  const { user } = useAuth();
  const router = useRouter();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.id), {
        goal: formData.goal,
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        weight: parseFloat(formData.weight),
        plan: formData.plan,
        updatedAt: new Date()
      });

      toast.success('Perfil configurado com sucesso!');
      router.push('/app');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.goal !== '';
      case 2:
        return formData.age && formData.height && formData.weight;
      case 3:
        return formData.plan !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {i}
                  </div>
                  {i < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      i < step ? 'bg-primary-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center text-gray-600">
            Passo {step} de 3
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <Card className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                  Qual é seu objetivo principal?
                </h1>
                <p className="text-gray-600">
                  Escolha o objetivo que melhor descreve o que você quer alcançar
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <motion.div
                    key={goal.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      className={`w-full p-6 rounded-xl border-2 transition-all ${
                        formData.goal === goal.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({ ...formData, goal: goal.id })}
                    >
                      <div className={`w-12 h-12 rounded-full ${goal.color} flex items-center justify-center mx-auto mb-4`}>
                        <goal.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
                      <p className="text-gray-600 text-sm">{goal.description}</p>
                    </button>
                  </motion.div>
                ))}
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                  Conte-nos mais sobre você
                </h1>
                <p className="text-gray-600">
                  Essas informações nos ajudam a personalizar suas recomendações
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="175"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="70.5"
                  />
                </div>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                  Escolha seu plano
                </h1>
                <p className="text-gray-600">
                  Selecione o plano que melhor se adequa às suas necessidades
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      className={`w-full p-6 rounded-xl border-2 transition-all relative ${
                        formData.plan === plan.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({ ...formData, plan: plan.id })}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Mais Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-2xl font-bold text-primary-500 mb-2">
                          R$ {plan.price.toFixed(2).replace('.', ',')}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                        
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className={step === 1 ? 'invisible' : ''}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Próximo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              loading={loading}
              disabled={!canProceed()}
            >
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}