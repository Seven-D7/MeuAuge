'use client';

import { motion } from 'framer-motion';
import { 
  Target, 
  Trophy, 
  Brain, 
  BarChart3, 
  Zap, 
  Users, 
  Star,
  Check,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function LandingPage() {
  const modules = [
    {
      icon: Target,
      title: 'Emagrecimento',
      description: 'Perca peso de forma saudável com acompanhamento personalizado'
    },
    {
      icon: Trophy,
      title: 'Hipertrofia',
      description: 'Ganhe massa muscular com treinos e nutrição otimizados'
    },
    {
      icon: BarChart3,
      title: 'Recomposição',
      description: 'Transforme seu corpo perdendo gordura e ganhando músculo'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Melhore seu desempenho atlético e energia diária'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'IA Personalizada',
      description: 'Recomendações inteligentes baseadas no seu progresso e objetivos'
    },
    {
      icon: Trophy,
      title: 'Gamificação',
      description: 'Sistema de XP, conquistas e desafios para manter você motivado'
    },
    {
      icon: BarChart3,
      title: 'Análises Corporais',
      description: 'Acompanhe sua evolução com gráficos detalhados e insights'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Conecte-se com outros usuários e compartilhe sua jornada'
    }
  ];

  const plans = [
    {
      name: 'Base',
      price: 97,
      features: [
        'Acesso básico à plataforma',
        'Recomendações de IA limitadas',
        'Acompanhamento básico',
        'Suporte por email'
      ]
    },
    {
      name: 'Escalada',
      price: 83,
      popular: true,
      features: [
        'Acesso completo à plataforma',
        'IA avançada personalizada',
        'Análises corporais detalhadas',
        'Suporte prioritário',
        'Desafios exclusivos'
      ]
    },
    {
      name: 'Auge',
      price: 59.90,
      features: [
        'Tudo do plano Escalada',
        'Consultoria 1:1 mensal',
        'Acesso antecipado a novidades',
        'Comunidade VIP',
        'Suporte 24/7'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Transforme Sua Vida com{' '}
              <span className="text-primary-100">Inteligência Artificial</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
            >
              Alcance seus objetivos de saúde e bem-estar com gamificação, 
              acompanhamento personalizado e a mais avançada tecnologia de IA.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-white text-dark-900 hover:bg-gray-100">
                <Link href="/login" className="flex items-center">
                  Comece Agora Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Ver Demonstração
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="funcionalidades" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
              Módulos Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha seu objetivo e receba um plano personalizado para alcançar seus resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <module.icon className="h-8 w-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                  <p className="text-gray-600">{module.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
              Tecnologia de Ponta
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recursos avançados que tornam sua jornada mais eficiente e motivadora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Planos flexíveis para todos os perfis e objetivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-primary-500 mb-2">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </div>
                    <p className="text-gray-600">por mês</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'primary' : 'outline'}
                  >
                    Começar Agora
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Transformar Sua Vida?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Junte-se a milhares de pessoas que já estão alcançando seus objetivos com o Meu Auge
            </p>
            <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
              <Link href="/login" className="flex items-center">
                Comece Sua Jornada Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}