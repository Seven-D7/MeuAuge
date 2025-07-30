# Meu Auge - SaaS de Bem-estar com IA

Uma plataforma moderna de bem-estar que combina inteligência artificial, gamificação e acompanhamento personalizado para ajudar usuários a alcançarem seus objetivos de saúde.

## 🚀 Tecnologias

- **Frontend**: Next.js 13+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **Animações**: Framer Motion
- **Gráficos**: Recharts
- **UI**: Lucide React (ícones)
- **Notificações**: React Hot Toast

## 🎯 Funcionalidades

### Landing Page
- Hero section com CTA otimizado
- Seções de módulos especializados (Emagrecimento, Hipertrofia, etc.)
- Recursos de IA e gamificação
- Tabela de planos com preços
- Design responsivo e mobile-first

### Autenticação
- Login/cadastro com email e senha
- Integração com Google Auth
- Onboarding personalizado
- Proteção de rotas

### Dashboard do Usuário
- Visão geral do progresso
- Sistema de XP e níveis
- Gráficos de evolução
- Recomendações de IA
- Conquistas e desafios

### Gamificação
- Sistema de XP e níveis
- Conquistas categorizadas
- Desafios diários, semanais e mensais
- Badges e recompensas

### Sistema de Planos
- Base (R$ 97/mês)
- Escalada (R$ 83/mês) - Mais popular
- Auge (R$ 59,90/mês) - Premium

## 🛠️ Configuração

### Pré-requisitos
- Node.js 18+
- Conta no Firebase
- (Opcional) Conta no Stripe para pagamentos

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd meu-auge
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Preencha as variáveis no `.env.local`:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Execute o projeto:
```bash
npm run dev
```

## 🔥 Configuração do Firebase

### 1. Criar Projeto
1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative o Google Analytics (opcional)

### 2. Configurar Authentication
1. Vá para Authentication > Sign-in method
2. Ative Email/Password
3. Ative Google (configure OAuth)

### 3. Configurar Firestore
1. Vá para Firestore Database
2. Crie o banco em modo de produção
3. Configure as regras de segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Achievements and challenges are user-specific
    match /achievements/{achievementId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /challenges/{challengeId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 4. Configurar Storage
1. Vá para Storage
2. Configure as regras para upload de avatares:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📱 Estrutura do Projeto

```
/
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Grupo de rotas de autenticação
│   ├── app/               # Área logada (protegida)
│   ├── onboarding/        # Configuração inicial
│   └── page.tsx           # Landing page
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   ├── layout/           # Header, Footer, Sidebar
│   └── app/              # Componentes específicos da área logada
├── context/              # Context providers (Auth, etc.)
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── types/                # Definições TypeScript
└── public/               # Assets estáticos
```

## 🎨 Design System

### Cores
- **Primary**: #1ab894 (Verde)
- **Dark**: #111828 (Azul escuro)
- **White**: #ffffff

### Componentes
- Botões com animações Framer Motion
- Cards com hover effects
- Sistema de grid responsivo
- Tipografia consistente

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- Netlify
- Railway
- Heroku

## 📈 Próximos Passos

### Funcionalidades Planejadas
- [ ] Integração com Stripe para pagamentos
- [ ] Sistema de notificações push
- [ ] Chat com IA (GPT-4)
- [ ] Análise corporal com ML
- [ ] App mobile (React Native)
- [ ] Dashboard administrativo
- [ ] Sistema de referência/afiliados

### Melhorias Técnicas
- [ ] Testes automatizados (Jest, Cypress)
- [ ] PWA (Progressive Web App)
- [ ] Otimização de performance
- [ ] Monitoramento de erros (Sentry)
- [ ] Analytics avançados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@meuauge.com ou abra uma issue no GitHub.

---

Desenvolvido com ❤️ para transformar vidas através da tecnologia.