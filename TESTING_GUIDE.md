# 🔧 CARA TEST FIX YANG BENAR

## ⚠️ PENTING: Browser Cache Issue

Jika perubahan tidak terlihat, lakukan:

### 1. Hard Refresh Browser
```
Chrome/Edge: Ctrl + Shift + R (Windows) atau Cmd + Shift + R (Mac)
Firefox: Ctrl + F5
Safari: Cmd + Shift + R
```

### 2. Clear Cache
```
Chrome: F12 → Network tab → Check "Disable cache"
Atau: Settings → Clear browsing data → Cached images
```

### 3. Restart Dev Server
```bash
# Kill server
Ctrl + C

# Start again
npm run dev
```

---

## ✅ APA YANG SUDAH DIUBAH

### 1. Eyes Size (CSS)
**File**: `/src/pages/CuteVirtualPet.css` line 461

**SEBELUM**:
```css
.cute-eye {
  width: 6px;   /* Terlalu kecil */
  height: 6px;
}
```

**SESUDAH**:
```css
.cute-eye {
  width: 10px;  /* Ukuran pas */
  height: 10px;
}
```

### 2. Game Timers (JSX)
**File**: `/src/pages/CuteVirtualPet.jsx` line 226

**SEBELUM**:
```javascript
duration: 60, 90, 120  /* Terlalu lama */
```

**SESUDAH**:
```javascript
duration: 30, 45, 45   /* MAX 30-45 detik */
```

### 3. Game Selection Modal (JSX)
**File**: `/src/pages/CuteVirtualPet.jsx` line 1461

**DITAMBAHKAN**:
```jsx
{showGameSelect && (
  <div className="cute-modal-overlay">
    {/* 4 games untuk dipilih */}
  </div>
)}
```

---

## 🧪 CARA TEST

### Test 1: Pet Eyes
```
1. Buka http://localhost:5173/cute-pet
2. Zoom in ke mata pet
3. Harus ukuran 10px (bukan 6px atau 14px)
4. Warna #2D2D2D (soft black)
5. NO white highlight
```

### Test 2: Game Selection
```
1. Click tombol "Games"
2. Modal harus muncul dengan 4 pilihan:
   - Whack-a-Mole
   - Garden Catch
   - Cooking Match
   - Memory Flip
3. Click salah satu
4. Game harus mulai
```

### Test 3: Game Timer
```
1. Start any game
2. Lihat timer di atas
3. Whack-a-Mole: 30 detik (bukan 60)
4. Garden Catch: 45 detik (bukan 90)
5. Cooking Match: 45 detik (bukan 120)
```

### Test 4: Garden Catch Basket
```
1. Pilih Garden Catch
2. Gerakkan mouse kiri-kanan
3. Basket 🧺 harus ikut gerak
4. Tangkap fruit yang jatuh
```

---

## 🐛 JIKA MASIH BERMASALAH

### Check Console Errors
```
1. Buka DevTools (F12)
2. Tab Console
3. Lihat ada error merah atau tidak
4. Screenshot error jika ada
```

### Check File Changes
```bash
# Check if CSS changed
grep "width: 10px" /src/pages/CuteVirtualPet.css

# Check if JSX changed
grep "duration: 30" /src/pages/CuteVirtualPet.jsx

# Check modal exists
grep "showGameSelect" /src/pages/CuteVirtualPet.jsx
```

### Force Rebuild
```bash
# Stop server
Ctrl + C

# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall
npm install

# Start again
npm run dev
```

---

## 📋 CHECKLIST VERIFIKASI

- [ ] Browser hard refresh (Ctrl+Shift+R)
- [ ] Console tidak ada error
- [ ] Pet eyes ukuran 10px
- [ ] Games button memunculkan modal
- [ ] 4 games terlihat di modal
- [ ] Timer games 30-45 detik
- [ ] Garden Catch basket bergerak
- [ ] Tidak ada emoji furniture

---

## 🎯 EXPECTED RESULT

### Pet Appearance:
```
✅ Eyes: 10px, soft black, no highlight
✅ Body: Round cute shape
✅ Animations: Smooth breathing, blink
```

### Games:
```
✅ Modal appears on click
✅ 4 games selectable
✅ Timer counts down from 30-45s
✅ Games end automatically
✅ Coins awarded correctly
```

### Furniture:
```
✅ Scaled to pet size (1.5-1.8x)
✅ Custom SVG (not emoji)
✅ Proper positioning
```

---

## 📞 JIKA MASIH ADA MASALAH

Kirim screenshot:
1. Browser URL
2. Console errors (jika ada)
3. Pet close-up (mata)
4. Games modal (saat dibuka)

Ini akan membantu debug lebih lanjut!
