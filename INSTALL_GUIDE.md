# 📱 Calmora - Cara Install di Handphone

## 🎯 Quick Start (5 Menit)

### Step 1: Jalankan Aplikasi
```bash
cd /workspaces/Calmora
npm install
npm run dev
```

### Step 2: Buka di Browser
- **Android:** Chrome → `http://localhost:5173` (atau IP address)
- **iOS:** Safari → `http://localhost:5173` (atau IP address)

### Step 3: Install App

#### Android (Chrome):
1. Buka aplikasi
2. Tunggu popup "Install Calmora" muncul (atau tap menu ⋮)
3. Tap **"Install"**
4. ✅ App icon muncul di home screen

#### iOS (Safari):
1. Buka aplikasi di Safari
2. Tap **Share button** (kotak dengan panah ke atas)
3. Scroll ke bawah → **"Add to Home Screen"**
4. Tap **"Add"** di pojok kanan atas
5. ✅ App icon muncul di home screen

---

## 🌐 Deploy ke Internet (Agar Bisa Diakses dari Mana Saja)

### Option 1: Vercel (Paling Mudah - Gratis)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Build aplikasi:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Enter untuk semua pertanyaan (default OK)
   - Selesai! Dapat URL seperti: `https://calmora.vercel.app`

4. **Install dari URL:**
   - Buka URL di handphone
   - Install seperti langkah di atas

### Option 2: Netlify (Gratis)

1. **Buka:** https://app.netlify.com/drop

2. **Drag & Drop** folder `dist/` ke halaman Netlify

3. **Selesai!** Dapat URL seperti: `https://calmora.netlify.app`

### Option 3: GitHub Pages (Gratis)

1. **Push ke GitHub**

2. **Settings → Pages:**
   - Source: Deploy from branch
   - Branch: gh-pages

3. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

4. **Deploy:**
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

5. **URL:** `https://username.github.io/Calmora`

### Option 4: Hosting Sendiri (Node.js Server)

```bash
# Install serve
npm install -g serve

# Serve production build
serve -s dist -p 3000
```

Akses: `http://your-ip:3000`

---

## 📲 Fitur yang Didapat Setelah Install

### ✅ Works Offline
- Tidak perlu internet untuk buka app
- Data tersimpan lokal
- Auto-sync saat online kembali

### ✅ Auto Sync
- Sinkronisasi otomatis setiap 30 detik
- Data aman tidak hilang
- Multi-device support

### ✅ Full Screen
- No browser UI (address bar hilang)
- App experience seperti native
- Icon di home screen

### ✅ Push Notifications (Ready)
- Siap untuk notifikasi
- Perlu backend untuk enable

### ✅ App Shortcuts
- Long press icon → Quick actions
- Dashboard, Pet, Tasks, Journal

---

## 🎮 Virtual Pet - Quick Guide

### Care Your Pet:
1. **Feed** - Beri makan (20+ foods)
2. **Play** - Main mini games (4 games)
3. **Sleep** - Tidur (recover energy)
4. **Dress** - Ganti baju (15+ clothes)
5. **Decorate** - Hias room (5 themes)

### Earn Coins:
- Mini games: 2-5 coins per game
- Feed pet: +3 coins
- Complete tasks: Rewards

### Spend Coins:
- Food: 8-25 coins
- Clothes: 80-350 coins
- Accessories: 70-300 coins
- Environment: 0-350 coins
- Furniture: 30-350 coins

---

## ⚙️ Settings & Customization

### Change Sync Interval:
Edit `src/services/sync.js`:
```javascript
const SYNC_INTERVAL = 30000 // Ganti angka (ms)
```

### Change App Name:
Edit `public/manifest.json`:
```json
{
  "name": "Your App Name",
  "short_name": "YourApp"
}
```

### Change Theme Color:
Edit `public/manifest.json`:
```json
{
  "theme_color": "#6366f1",
  "background_color": "#f5f5f5"
}
```

### Change App Icon:
1. Buat icon 192x192 dan 512x512
2. Replace `public/icon-192.png` dan `public/icon-512.png`
3. Reload app

---

## 🐛 Troubleshooting

### "Install" tidak muncul?
- **Android:** Pastikan Chrome, update ke latest
- **iOS:** Pastikan iOS 11.3+ (Safari)
- Clear browser cache
- Reload halaman

### App tidak works offline?
- Buka app dulu saat online (untuk cache)
- Check service worker di DevTools → Application → Service Workers
- Reload offline page

### Sync tidak jalan?
- Check online status
- Check console untuk errors
- Check sync queue:
  ```javascript
  localStorage.getItem('calmora-sync-pending')
  ```

### Layout mobile broken?
- Test di Chrome DevTools Device Mode
- Clear cache
- Check viewport meta tag

### Icon tidak muncul?
- Check file `public/icon-192.png` ada
- Check `public/manifest.json` correct
- Reload app

---

## 📊 Testing Checklist

### Sebelum Deploy:
- [ ] Run `npm run build` - No errors
- [ ] Test di desktop browser
- [ ] Test di mobile browser
- [ ] Test offline mode
- [ ] Test install prompt

### Setelah Deploy:
- [ ] App loads dari URL
- [ ] Install prompt muncul
- [ ] App works offline
- [ ] Sync indicator shows
- [ ] Virtual Pet works
- [ ] Mini games playable

---

## 🎉 Selesai!

Aplikasi Calmora sudah siap:
- ✅ Bisa di-install di handphone
- ✅ Works offline
- ✅ Auto sync
- ✅ Virtual Pet lengkap
- ✅ Mobile optimized

**Selamat menikmati!** 🚀

---

## 📞 Support

Butuh bantuan?
- Check `PWA_MOBILE_SETUP.md` untuk detail
- Check `SUMMARY.md` untuk summary
- Check console untuk errors
- Clear cache dan reload

**Happy Productivity!** ✨
