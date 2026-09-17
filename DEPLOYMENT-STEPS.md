# 🚀 Live Deployment Guide - Get Your Demo Link

Follow these steps to deploy your application and get live demo links for submission.

---

## Option 1: Deploy Backend to Render (Easiest - Recommended)

### Step 1: Deploy Backend to Render

1. **Go to Render**: https://render.com
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → Select **"Web Service"**
4. **Connect your repository**: `urumurinoella3-beep/klab-task-management`
5. **Configure the service**:
   - **Name**: `klab-task-backend`
   - **Region**: Select closest to Rwanda (e.g., Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: `back_end`
   - **Runtime**: `Java`
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -Dserver.port=$PORT -jar target/*.jar`
   - **Instance Type**: `Free`

6. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   JAVA_VERSION = 17
   MAVEN_VERSION = 3.8.6
   ```

7. **Create PostgreSQL Database**:
   - Click "New +" → **"PostgreSQL"**
   - **Name**: `klab-task-database`
   - **Region**: Same as backend
   - **Instance Type**: `Free`
   - Click **"Create Database"**

8. **Connect Database to Backend**:
   - Go back to your Web Service
   - Click "Environment" tab
   - Add environment variable:
     - **Key**: `DATABASE_URL`
     - **Value**: Click "Insert" → Select your PostgreSQL database → Select "Internal Database URL"

9. **Click "Create Web Service"**

10. **Wait for deployment** (5-10 minutes)

11. **Get your backend URL**: 
    - Will be something like: `https://klab-task-backend.onrender.com`
    - Test it: `https://klab-task-backend.onrender.com/api/tasks`
    - Should return `[]` (empty array)

---

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Click "Add New"** → **"Project"**
4. **Import your repository**: `urumurinoella3-beep/klab-task-management`
5. **Configure the project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `front_end`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Add Environment Variable**:
   - Click "Environment Variables"
   - **Name**: `VITE_API_URL`
   - **Value**: `https://klab-task-backend.onrender.com/api/tasks` (your Render backend URL)
   - Select "Production, Preview, and Development"

7. **Click "Deploy"**

8. **Wait for deployment** (2-3 minutes)

9. **Get your frontend URL**: 
    - Will be something like: `https://klab-task-management.vercel.app`
    - Open it in browser to test

---

### Step 3: Update CORS Settings

Since your frontend is now deployed, you need to allow it in CORS:

1. **Go back to Render dashboard**
2. **Select your backend service**
3. **Go to "Environment" tab**
4. **Add new environment variable**:
   - **Key**: `CORS_ORIGINS`
   - **Value**: `https://klab-task-management.vercel.app,http://localhost:5173`
   - (Replace with your actual Vercel URL)

5. **Save Changes** (Backend will redeploy automatically)

---

## Option 2: Deploy Backend to Railway (Alternative)

### Step 1: Deploy to Railway

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose**: `urumurinoella3-beep/klab-task-management`
6. **Add PostgreSQL**:
   - Click "+" → "Database" → "Add PostgreSQL"
7. **Configure Backend Service**:
   - Click on your repo service
   - Go to "Settings"
   - **Root Directory**: `back_end`
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -Dserver.port=$PORT -jar target/*.jar`
8. **Add Environment Variables**:
   - Railway automatically provides `DATABASE_URL`
   - Add: `JAVA_VERSION = 17`
9. **Generate Domain**:
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
10. **Get your URL**: `https://your-app.up.railway.app`

Then deploy frontend to Vercel (same as Option 1, Step 2)

---

## Option 3: Deploy Everything to Render

### For Both Backend and Frontend on Render:

**Backend**: Follow Option 1, Step 1

**Frontend on Render**:
1. Click "New +" → **"Static Site"**
2. Connect repository
3. Configure:
   - **Name**: `klab-task-frontend`
   - **Root Directory**: `front_end`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = your backend URL
5. Deploy

---

## 🎯 Your Live Demo Links

After deployment, you'll have:

**Backend API**: `https://klab-task-backend.onrender.com`
- Test: `https://klab-task-backend.onrender.com/api/tasks`
- API Docs: `https://klab-task-backend.onrender.com/swagger-ui/index.html`

**Frontend App**: `https://klab-task-management.vercel.app`
- This is your **Live Demo Link** for submission

---

## 📝 For Your Submission Form

**Live Demo Link**: 
```
https://klab-task-management.vercel.app
```
(or whatever your Vercel URL is)

**Backend API**:
```
https://klab-task-backend.onrender.com
```

---

## ⚠️ Important Notes

### Render Free Tier
- Backend goes to sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal for free tier

### Vercel Free Tier
- Frontend is always fast (CDN)
- No sleep time
- Perfect for demo

### Testing Your Deployment
1. Open frontend URL in browser
2. Try creating a task (might take 30 seconds first time if backend is asleep)
3. Verify all CRUD operations work
4. Share the link!

---

## 🐛 Troubleshooting

### Backend returns 500 error
- Check Render logs: Dashboard → Your service → "Logs"
- Verify DATABASE_URL is set correctly
- Check Java version is 17

### Frontend can't connect to backend
- Verify VITE_API_URL environment variable in Vercel
- Check CORS_ORIGINS includes your Vercel URL
- Open browser console to see error details

### Database connection error
- Make sure PostgreSQL database is created on Render
- Verify DATABASE_URL is linked to backend service
- Check database is in same region as backend

---

## 🚀 Quick Deploy Script (Manual Alternative)

If you prefer manual deployment without platforms:

### Using Heroku (Requires Credit Card)
```bash
# Backend
cd back_end
heroku create klab-task-backend
heroku addons:create heroku-postgresql:mini
git push heroku main
heroku open

# Frontend
cd front_end
npm run build
# Upload dist folder to Netlify Drop or Surge.sh
```

---

## ✅ Deployment Checklist

- [ ] Backend deployed to Render/Railway
- [ ] PostgreSQL database created and connected
- [ ] Backend URL tested (returns `[]` from /api/tasks)
- [ ] Frontend deployed to Vercel
- [ ] Environment variable VITE_API_URL set in Vercel
- [ ] CORS_ORIGINS updated in backend with Vercel URL
- [ ] Frontend tested in browser
- [ ] Can create, edit, delete tasks
- [ ] API documentation accessible
- [ ] Live demo link ready for submission

---

## 🎉 You're Ready!

Once deployed:
1. Test your live app thoroughly
2. Copy the Vercel URL
3. Paste it in your submission form
4. Submit your project!

**Estimated Time**: 15-20 minutes total

---

**Need Help?** 
- Render Support: https://render.com/docs
- Vercel Support: https://vercel.com/docs
- Railway Support: https://docs.railway.app
