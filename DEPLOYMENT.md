# 🚀 DEPLOYMENT GUIDE - NEXI

Guia completa per desplegar NEXI a Netlify.

## Prerequisits

- ✅ Compte a GitHub
- ✅ Compte a Netlify
- ✅ Totes les variables d'entorn configurades
- ✅ Repository creat a GitHub

## Passos de Deploy

### 1. Preparar el Repositori GitHub

```bash
# Clonar o crear repositori
git clone https://github.com/[TU_USUARIO]/nexi-eports.git
cd nexi-eports

# Crear .env.local (NO pujar a GitHub)
cp .env.example .env.local
# Edita .env.local amb les teves claus

# Verificar .gitignore conté .env.local
echo ".env.local" >> .gitignore

# Verificar la construcció local funciona
npm install
npm run build
```

### 2. Connectar a Netlify

#### Opció A: Via Dashboard de Netlify (Recomanda)

1. Vai a **https://app.netlify.com**
2. Clica **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** com a provedir Git
4. Autoritza Netlify a accedir a GitHub
5. Selecciona el repositori `nexi-eports`
6. Clica **"Deploy site"**

#### Opció B: Via CLI de Netlify

```bash
# Instal·lar CLI de Netlify
npm install -g netlify-cli

# Login
netlify login

# Inicialitza el projecte
netlify init

# Deploy
netlify deploy --prod
```

### 3. Configurar Variables d'Entorn

**A Netlify Dashboard:**

1. Vai a **Settings** → **Build & deploy** → **Environment**
2. Clica **"Edit variables"**
3. Afegeix totes aquestes variables (de `.env.local`):

```
VITE_SUPABASE_URL = https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGc...
VITE_CLAUDE_API_KEY = sk-ant-...
AIRTABLE_API_KEY = key...
AIRTABLE_BASE_ID = appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME = Leads
GMAIL_USER = your-email@gmail.com
GMAIL_APP_PASSWORD = xxxx xxxx xxxx xxxx
EPORTS_PHONE_COMMERCIAL = 977090505
EPORTS_PHONE_SUPPORT = 977353735
EPORTS_EMAIL = info@eportsinternet.com
```

4. Clica **"Save"**
5. Netlify reconstruirà automàticament el projecte

### 4. Verificar el Deploy

- ✅ URL de Netlify: `https://nexi-eports.netlify.app`
- ✅ Verifica el chat funciona
- ✅ Prova enviar un missatge
- ✅ Verifica les funcions Netlify al: **Settings** → **Functions**

## 🔄 Actualitzacions Futures

Quan actualitzis el codi:

```bash
# Fer canvis localment
git add .
git commit -m "Descripció dels canvis"
git push origin main
```

Netlify detectarà automàticament els canvis a GitHub i farà un deploy nova.

## 🐛 Troubleshooting

### Error: "Environment variables not found"

**Solució:** Verifica que totes les variables estan a Netlify Settings i que es va guardar correctament.

### Error: "Claude API key invalid"

**Solució:** 
- Verifica que la clau `VITE_CLAUDE_API_KEY` és correcta
- Assegura't que la clau comença amb `sk-ant-`
- Regenera la clau a https://console.anthropic.com si cal

### Error: "Supabase connection refused"

**Solució:**
- Verifica que `VITE_SUPABASE_URL` i `VITE_SUPABASE_ANON_KEY` són correctes
- Verifica que les taules existeixen a Supabase
- Verifica que Row Level Security (RLS) no bloqueja l'accés

### Error: "Airtable 401 Unauthorized"

**Solució:**
- Verifica que `AIRTABLE_API_KEY` és correcta
- Verifica que el Base ID és correcte
- Verifica que la taula "Leads" existeix

### Chat no carrega

**Solució:**
1. Obrir **Developer Tools** (F12)
2. Anar a **Console**
3. Buscar errors vermells
4. Comprovar les funcions Netlify al: **Settings** → **Functions** → **Logs**

## 📊 Monitorització

### Logs de Netlify Functions

1. Vai a **Netlify Dashboard** → el teu projecte
2. **Functions** → Selecciona una funció
3. **Logs** per veure errors i debugging

### Monitorar Claude API

1. Vai a **https://console.anthropic.com** → **Dashboard**
2. **Usage** per veure gastos
3. **Billing** per configurar limits

### Monitorar Supabase

1. Vai a **https://app.supabase.com** → el teu projecte
2. **Database** per veure converses
3. **SQL Editor** per fer queries

## 🎉 Completat!

El teu NEXI està en viu! 🚀

### Pròxims Passos:

- [ ] Integrar el widget a la web d'eports
- [ ] Configurar monitorització
- [ ] Entrenar NEXI amb casos reals
- [ ] Analitzar converses als logs

---

Per a més informació, consulta [README.md](./README.md)
