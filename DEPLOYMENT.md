# 🚀 PetHub Nigeria - Deployment Guide

Complete guide to deploy your full-stack application to production.

---

## 📋 Overview

- **Frontend**: GitHub Pages (Free)
- **Backend**: Railway (Free tier)
- **Database**: Neon PostgreSQL (Free tier)

---

## 1️⃣ Deploy Database (Neon PostgreSQL)

### Step 1: Create Neon Account
1. Go to https://neon.tech/
2. Sign up with GitHub (free)
3. Create a new project: **pethub-nigeria**

### Step 2: Get Database URL
1. After creating project, click "Connection Details"
2. Copy the **Connection String** (looks like this):
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. Save this URL - you'll need it for Railway!

---

## 2️⃣ Deploy Backend (Railway)

### Step 1: Create Railway Account
1. Go to https://railway.app/
2. Sign up with GitHub (free $5 credit monthly)

### Step 2: Deploy Backend
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **IamWheelze/Petshub-naija**
4. Railway will auto-detect and deploy

### Step 3: Configure Environment Variables
In Railway dashboard, go to **Variables** tab and add:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://iamwheelze.github.io/Petshub-naija
```

**Important:** Replace `DATABASE_URL` with your Neon connection string from Step 1!

### Step 4: Run Database Migrations
In Railway dashboard:
1. Go to **Settings** → **Deploy Triggers**
2. Add a **Deploy Command**:
   ```bash
   npx prisma migrate deploy && npm run start
   ```

OR use Railway CLI:
```bash
npm install -g @railway/cli
railway login
railway link
railway run npx prisma migrate deploy
```

### Step 5: Get Backend URL
1. Go to **Settings** → **Domains**
2. Click **Generate Domain**
3. Your backend URL will be: `https://pethub-nigeria-production.up.railway.app`
4. **Save this URL!**

---

## 3️⃣ Deploy Frontend (GitHub Pages)

### Already Configured! ✅

Your frontend auto-deploys when you push to GitHub.

### Update Frontend to Use Production Backend

1. Create production environment file:

**Create:** `frontend/.env.production`
```env
VITE_API_URL=https://your-backend-url.up.railway.app
VITE_FRONTEND_URL=https://iamwheelze.github.io/Petshub-naija
```

2. Update API config in frontend:

**Edit:** `frontend/src/config/api.ts`
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
```

3. Commit and push:
```bash
git add .
git commit -m "feat: Configure production backend URL"
git push origin claude/pethub-naija-fi-0172M1NdXnvxL335F4cT6tQ5
```

GitHub Actions will automatically deploy to Pages!

---

## 4️⃣ Update Backend CORS for Production

**Edit:** `backend/src/server.ts`

Make sure CORS allows your GitHub Pages domain:
```typescript
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://iamwheelze.github.io'
    ],
    credentials: true,
  })
);
```

Commit and push - Railway will auto-deploy!

---

## 🎯 Verify Deployment

### Backend Health Check
```bash
curl https://your-backend-url.up.railway.app/health
```

Should return:
```json
{
  "status": "success",
  "message": "PetHub Nigeria API is running",
  "timestamp": "..."
}
```

### Frontend
Visit: **https://iamwheelze.github.io/Petshub-naija/**

---

## 📊 Deployment Checklist

- [ ] Neon PostgreSQL database created
- [ ] Railway backend deployed
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Backend health check passes
- [ ] Frontend environment variables updated
- [ ] CORS configured for production
- [ ] Frontend deployed to GitHub Pages
- [ ] Test authentication flow end-to-end

---

## 🔧 Alternative Deployment Options

### Backend Alternatives:
- **Render** (https://render.com) - Free tier, easy setup
- **Fly.io** (https://fly.io) - Free allowance
- **Vercel** (https://vercel.com) - Serverless functions

### Database Alternatives:
- **Supabase** (https://supabase.com) - PostgreSQL + Auth
- **PlanetScale** (https://planetscale.com) - MySQL serverless
- **Railway** (https://railway.app) - Can host both backend & DB

### Frontend Alternatives:
- **Vercel** - Instant deployments
- **Netlify** - Continuous deployment
- **Cloudflare Pages** - Fast edge network

---

## 🆘 Troubleshooting

### Backend won't start
- Check Railway logs: Dashboard → Deployments → View Logs
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

### Database connection fails
- Verify Neon database is active
- Check connection string has `?sslmode=require`
- Test connection locally first

### Frontend can't reach backend
- Check CORS configuration
- Verify VITE_API_URL is correct
- Check browser console for errors

### Migrations fail
- Ensure DATABASE_URL is set
- Run manually: `railway run npx prisma migrate deploy`
- Check Prisma schema is valid

---

## 💰 Cost Breakdown

**Total Monthly Cost: $0** (Free tier)

- **Neon**: Free tier (3 GB storage, 1 database)
- **Railway**: Free $5 credit monthly (enough for small apps)
- **GitHub Pages**: Free (unlimited public repos)

**Upgrade when needed:**
- Railway Pro: $20/month (more resources)
- Neon Scale: $19/month (more databases)

---

## 🎉 You're Live!

Your PetHub Nigeria platform is now deployed and accessible worldwide!

**Frontend:** https://iamwheelze.github.io/Petshub-naija/
**Backend:** https://your-backend-url.up.railway.app
**Database:** Neon PostgreSQL (serverless)

Share your platform with the world! 🌍🐾
