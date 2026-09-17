# 🚀 START HERE - Deploy Your App in 15 Minutes

## What You'll Get:
- ✅ Live backend API URL
- ✅ Live frontend demo URL (for submission form)
- ✅ Both working together perfectly

---

## 🎯 STEP-BY-STEP (Follow Exactly)

### Part 1: Deploy Backend (10 minutes)

**1. Go to Render.com**
- Open: https://render.com
- Click "Get Started" or "Sign Up"
- Choose "Sign up with GitHub"
- Authorize Render to access your GitHub

**2. Create PostgreSQL Database**
- Click "New +" button (top right)
- Select "PostgreSQL"
- Fill in:
  - **Name**: `klab-database`
  - **Database**: `klab_task_management`
  - **Region**: Select "Frankfurt (EU Central)" (closest to Rwanda)
  - **PostgreSQL Version**: 16
  - **Plan**: Free
- Click "Create Database"
- **Wait 2-3 minutes** for it to be ready
- ✅ **SAVE THIS**: Once ready, copy the "Internal Database URL" (you'll need it)

**3. Deploy Backend Service**
- Click "New +" button again
- Select "Web Service"
- Click "Build and deploy from a Git repository" → Next
- Find and select: `urumurinoella3-beep/klab-task-management`
  - If not listed, click "Configure account" and give Render access
- Click "Connect"

**4. Configure Backend Service**
Fill in these fields **EXACTLY**:
- **Name**: `klab-task-backend` (or any name you like)
- **Region**: Frankfurt (EU Central) - **SAME as database**
- **Branch**: `main`
- **Root Directory**: `back_end`
- **Runtime**: Select "Java"
- **Build Command**: `mvn clean install -DskipTests`
- **Start Command**: `java -Dserver.port=$PORT -jar target/*.jar`
- **Instance Type**: Free

**5. Add Environment Variables**
Scroll down to "Environment Variables":
- Click "Add Environment Variable"
- Add these ONE BY ONE:

**Variable 1:**
- Key: `DATABASE_URL`
- Value: (Paste the Internal Database URL you copied from step 2)

**Variable 2:**
- Key: `JAVA_VERSION`
- Value: `17`

**Variable 3:**
- Key: `CORS_ORIGINS`
- Value: `http://localhost:5173,http://localhost:5174,https://klab-task-management.vercel.app`

**6. Create Web Service**
- Click "Create Web Service" button at bottom
- **WAIT 8-10 minutes** - It will build your application
- You'll see logs scrolling - this is normal
- When done, you'll see "Live" with a green dot

**7. Get Your Backend URL**
- At the top, you'll see your URL: `https://klab-task-backend.onrender.com` (or similar)
- **COPY THIS URL** - you need it for frontend!
- Test it: Open `https://your-backend-url.onrender.com/api/tasks` in browser
- Should show: `[]` (empty array) ✅

---

### Part 2: Deploy Frontend (5 minutes)

**1. Go to Vercel.com**
- Open: https://vercel.com
- Click "Sign Up" or "Login"
- Choose "Continue with GitHub"
- Authorize Vercel

**2. Create New Project**
- Click "Add New..." → "Project"
- Find: `urumurinoella3-beep/klab-task-management`
  - If not shown, click "Import Git Repository" and search for it
- Click "Import"

**3. Configure Project**
- **Framework Preset**: Select "Vite"
- Click "Edit" next to "Root Directory"
- Type: `front_end`
- **Build Command**: `npm run build` (should be auto-filled)
- **Output Directory**: `dist` (should be auto-filled)

**4. Add Environment Variable**
- Click "Environment Variables" section (expand it)
- Add:
  - **NAME**: `VITE_API_URL`
  - **VALUE**: `https://your-backend-url.onrender.com/api/tasks`
    - ⚠️ **REPLACE** `your-backend-url.onrender.com` with YOUR actual Render URL from Part 1 Step 7
    - **MUST include** `/api/tasks` at the end
  - Leave "Production, Preview, and Development" checked
- Click "Add"

**5. Deploy**
- Click "Deploy" button
- **WAIT 2-3 minutes** - Much faster than backend!
- When done, you'll see "Congratulations" with confetti 🎉

**6. Get Your Live Demo Link**
- You'll see a preview image of your app
- At the top: `https://klab-task-management.vercel.app` (or similar)
- **THIS IS YOUR LIVE DEMO LINK** ✅
- Click "Visit" or open the URL

**7. Update CORS (Important!)**
- Go back to Render.com
- Open your backend service
- Click "Environment" tab
- Find `CORS_ORIGINS`
- Click "Edit"
- Update value to: `https://your-vercel-url.vercel.app,http://localhost:5173`
  - Replace with YOUR actual Vercel URL
- Click "Save Changes"
- Backend will redeploy (wait 1-2 minutes)

---

## ✅ Testing Your Live App

**1. Open Your Vercel URL** (your live demo link)

**2. Wait 30-60 seconds** on first load
- Render free tier: backend sleeps after inactivity
- First request wakes it up (slow)
- After that, it's fast!

**3. Test All Features:**
- ✅ See the black minimalist design
- ✅ Create a new task (click "New Task")
- ✅ Task appears in grid
- ✅ Edit a task
- ✅ Delete a task
- ✅ Search tasks
- ✅ Filter by status
- ✅ Change pages

**4. Test API Documentation:**
- Open: `https://your-backend-url.onrender.com/swagger-ui/index.html`
- ✅ Should see Swagger interface

---

## 📝 For Your Submission Form

Copy these:

**GitHub Repository Link:**
```
https://github.com/urumurinoella3-beep/klab-task-management
```

**Live Demo Link:**
```
https://klab-task-management.vercel.app
```
(Replace with YOUR actual Vercel URL - copy from Vercel dashboard)

**Backend API URL** (optional, but impressive):
```
https://klab-task-backend.onrender.com
```
(Replace with YOUR actual Render URL)

---

## 🐛 If Something Goes Wrong

### Backend won't deploy
- Check Render logs: Dashboard → Your service → "Logs" tab
- Look for red error messages
- Common fix: Make sure "Root Directory" is `back_end`

### Frontend shows "Failed to fetch" or API errors
- Check environment variable in Vercel: Dashboard → Your project → "Settings" → "Environment Variables"
- Make sure `VITE_API_URL` has the correct Render URL
- Must end with `/api/tasks`
- After changing, redeploy: "Deployments" tab → "..." menu → "Redeploy"

### Frontend loads but app is empty
- Backend might be asleep (Render free tier)
- Wait 60 seconds and refresh
- First load is always slow

### CORS errors in browser console
- Go to Render → Backend service → Environment → Edit CORS_ORIGINS
- Add your Vercel URL
- Save and wait for redeploy

---

## ⏱️ Timeline

- **Backend Deploy**: 8-10 minutes (building Java app)
- **Frontend Deploy**: 2-3 minutes (very fast)
- **Testing**: 2 minutes
- **TOTAL**: ~15 minutes

---

## 🎉 You're Done!

Once both are deployed and tested:

1. ✅ Copy your Vercel URL
2. ✅ Open submission form
3. ✅ Paste URL in "Live Demo Link" field
4. ✅ Submit!

**Your URLs:**
- **Live Demo** (for submission): `https://klab-task-management.vercel.app`
- **Backend API**: `https://klab-task-backend.onrender.com`
- **GitHub**: `https://github.com/urumurinoella3-beep/klab-task-management`

---

## 💡 Pro Tips

1. **Bookmark both dashboards**: Render and Vercel
2. **Test your link** before submitting
3. **Screenshot your live app** for your records
4. **Backend takes 30-60 seconds** on first request (free tier limitation)
5. After submission, keep both services running until evaluation

---

## 📞 Need Help?

If stuck:
1. Check the logs (most errors show there)
2. Make sure all environment variables are correct
3. Verify Root Directory settings
4. Try redeploying (sometimes needed)

**Most Common Issue**: 
- Backend URL not correctly set in Vercel environment variable
- **Fix**: Settings → Environment Variables → Edit VITE_API_URL → Redeploy

---

**Good luck! Your app will be live in 15 minutes! 🚀**
