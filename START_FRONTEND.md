# 🚀 How to Start the Frontend

## Quick Start (Windows)

### Step 1: Open Command Prompt or PowerShell
Press `Windows Key + R`, type `cmd`, and press Enter

### Step 2: Navigate to Frontend Folder
```bash
cd C:\Users\HP\Petshub-naija\frontend
```

### Step 3: Install Dependencies (First Time Only)
```bash
npm install
```

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: Open Browser
The terminal will show:
```
VITE v5.4.21  ready in XXX ms

➜  Local:   http://localhost:5173/Petshub-naija/
➜  Network: use --host to expose
```

**Open your browser and go to:**
```
http://localhost:5173/Petshub-naija/
```

---

## ✅ What You Should See

A beautiful pet platform with:
- 🏠 Home page with hero section
- 🛒 Shop with products
- 🐾 Pet marketplace
- 📱 Social feed
- 💬 Messages
- 🛍️ Cart & Wishlist
- And more!

---

## ❌ Troubleshooting

### "Cannot find module" error
```bash
cd C:\Users\HP\Petshub-naija\frontend
npm install
```

### Port 5173 already in use
```bash
# Kill the process
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Then start again
npm run dev
```

### "npm: command not found"
Install Node.js from: https://nodejs.org/
Then restart your terminal

### Blank page in browser
- Make sure you're going to: `http://localhost:5173/Petshub-naija/` (with the trailing path)
- Check the terminal for errors
- Try pressing `Ctrl+C` to stop, then run `npm run dev` again

---

## 🎯 All Pages Available

Once running, visit these URLs:

1. **Home**: http://localhost:5173/Petshub-naija/
2. **Shop**: http://localhost:5173/Petshub-naija/shop
3. **Cart**: http://localhost:5173/Petshub-naija/cart
4. **Wishlist**: http://localhost:5173/Petshub-naija/wishlist
5. **Checkout**: http://localhost:5173/Petshub-naija/checkout
6. **Orders**: http://localhost:5173/Petshub-naija/orders
7. **Marketplace**: http://localhost:5173/Petshub-naija/marketplace
8. **Create Listing**: http://localhost:5173/Petshub-naija/marketplace/create
9. **Social Feed**: http://localhost:5173/Petshub-naija/feed
10. **Profile**: http://localhost:5173/Petshub-naija/profile
11. **Messages**: http://localhost:5173/Petshub-naija/messages
12. **Admin Dashboard**: http://localhost:5173/Petshub-naija/admin
13. **Login**: http://localhost:5173/Petshub-naija/login
14. **Register**: http://localhost:5173/Petshub-naija/register

---

## 🎉 That's It!

Your PetHub Nigeria platform should now be displaying in your browser!
