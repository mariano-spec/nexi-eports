# ⚡ NEXI - AI Assistant for eportsinternet.com

NEXI és l'assistent virtual intel·ligent per a eportsinternet.com, un operador de telecomunicacions residencial de Catalonia.

## 🎯 Características

- ✅ Chat en temps real alimentat per Claude AI
- ✅ Informació de tarifes i paquets integrats
- ✅ Generació automàtica de pressupostos personalitzats
- ✅ Recollida intel·ligent de dades de clients
- ✅ Integració amb Airtable per a leads
- ✅ Emmagatzemament de converses a Supabase
- ✅ Enviament d'emails automàtics
- ✅ Detecció d'horaris per oferir telèfon o cita
- ✅ Widget flotant per a webs
- ✅ Responsive en mòbil

## 🛠️ Stack Tecnològic

**Frontend:**
- React 18+
- Vite
- Tailwind CSS
- Lucide Icons

**Backend:**
- Netlify Functions (Node.js)
- Claude API (Anthropic)
- Supabase (PostgreSQL)
- Airtable API

**Integracions:**
- Gmail SMTP (envament d'emails)
- SimplyBook (cites)

## 📋 Setup Initial

### 1. Variables d'Entorn

Copia `.env.example` a `.env.local` i completa els valors:

```bash
cp .env.example .env.local
```

Edita `.env.local` amb les teves claus:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_CLAUDE_API_KEY=sk-ant-...
AIRTABLE_API_KEY=key...
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Leads
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

### 2. Instal·lació de Dependències

```bash
npm install
```

### 3. Execució en Desenvolupament

```bash
npm run dev
```

Accedeix a `http://localhost:3000`

### 4. Build per a Producció

```bash
npm run build
```

## 🚀 Deploy a Netlify

### Opció 1: Desplega el Git

1. Puja el codi a GitHub
2. Connecta el repositori a Netlify
3. Configurar les variables d'entorn a Netlify
4. Netlify construirà i desplegarà automàticament

### Opció 2: Deploy Manual

```bash
npm run deploy
```

## 📁 Estructura del Projecte

```
nexi-eports/
├── src/
│   ├── components/
│   │   ├── NexiChat.jsx          # Component principal del chat
│   │   └── ChatMessages.jsx      # Llista de missatges
│   ├── styles/
│   │   └── globals.css           # Estils globals
│   ├── App.jsx                   # Component principal
│   └── main.jsx                  # Entry point
├── netlify/
│   └── functions/
│       ├── chat.js               # API del chatbot (Claude)
│       ├── save-conversation.js  # Guardar converses
│       ├── save-lead.js          # Guardar leads a Airtable
│       └── send-email.js         # Enviar emails
├── public/
├── .env.example
├── .env.local                    # ⚠️ NO compartir!
├── netlify.toml                  # Config de Netlify
├── vite.config.js
├── package.json
└── README.md
```

## 🔐 Seguretat

- ⚠️ **NUNCA** comparteixis les claus d'API
- Manten `.env.local` als `.gitignore`
- Usa variables d'entorn a Netlify
- Limita els permisos d'Airtable i Supabase
- Configura limits de gastos a Claude API

## 📞 Support

**Telèfons eportsinternet:**
- Comercial: 977 090 505
- Atenció: 977 353 735

**Horari:**
- Dilluns-Divendres: 9:00-18:00

## 📄 Llicència

Propietat d'eportsinternet. Tots els drets reservats.

---

Desenvolupat amb ❤️ per a eportsinternet
