# PWA Reunion 30 Tahun — IKU Bangsar Batch 1/97 (v1)

Modul v1: log masuk (telefon + kod akses), daftar alumni baharu, profil, undi tarikh,
undi tempat (susunan + kehadiran), kaji selidik, keputusan langsung dan panel AJK.

```
reunion-iku-97/
├── backend/
│   ├── Code.gs            ← tampal dalam Apps Script
│   └── appsscript.json    ← manifest (zon waktu, tetapan web app)
└── frontend/              ← naik ke GitHub Pages
    ├── index.html
    ├── config.js          ← tampal URL Web App di sini
    ├── manifest.json
    ├── sw.js
    └── icons/
```

## Langkah 1: Backend (Google Sheets + Apps Script)

1. Cipta Google Sheet baharu, contoh **"DB Reunion IKU 1-97"**.
2. **Extensions → Apps Script**. Padam kod asal, tampal isi `Code.gs`.
3. **Project Settings** → tanda "Show appsscript.json manifest file" → tampal isi `appsscript.json`.
4. Simpan, muat semula Sheet. Menu **🎓 Reunion IKU** akan muncul.
5. Jalankan **🎓 Reunion IKU → 1. Setup awal** (benarkan akses bila diminta).
6. Tab **Tetapan**: isi `NO_WA_AJK`, `APP_URL` (alamat GitHub Pages), semak `TARIKH_TUTUP_UNDIAN`.
7. Tab **Alumni**: tukar baris contoh `A001` kepada nama dan telefon anda (Peranan = ADMIN).
   Masukkan senarai rakan batch (ID A002, A003… Status = AKTIF, Peranan = AHLI).
8. Tab **Calon_Tarikh** & **Calon_Tempat**: ubah ikut keputusan AJK. Lajur Aktif = TIDAK untuk sembunyikan.
9. Jalankan **2. Jana kod akses**.
10. **Deploy → New deployment → Web app**
    - Execute as: **Me**
    - Who has access: **Anyone**
    Salin URL yang berakhir dengan `/exec`.

## Langkah 2: Frontend (GitHub Pages)

1. Buka `frontend/config.js`, tampal URL `/exec` pada `API_URL`.
2. Cipta repo, contoh `reunion-iku-97`, naik semua fail dalam folder `frontend/` ke root repo.
3. **Settings → Pages → Deploy from branch → main / root**.
4. Alamat app: `https://USERNAME.github.io/reunion-iku-97/`. Masukkan alamat ini dalam `APP_URL` di tab Tetapan.

## Langkah 3: Hantar jemputan

- Jalankan **3. Jana pautan jemputan WhatsApp**. Lajur `Pautan_WA` akan berisi pautan wa.me dengan
  mesej siap. Pautan dalam mesej terus log masuk rakan anda (telefon + kod terisi automatik).
- Atau log masuk sebagai ADMIN → **Buka panel AJK** → tapis "Belum log masuk" → **Hantar jemputan**.
- Rakan yang tiada dalam senarai boleh **Daftar sebagai alumni**. Mereka muncul di panel AJK sebagai
  "Menunggu kelulusan". Tekan **Luluskan**, kemudian **Hantar jemputan** untuk hantar kod.

## Kemas kini kod

- **Backend**: selepas ubah `Code.gs`, pergi **Deploy → Manage deployments → Edit (pensel) → Version: New version**.
  Jangan buat deployment baharu, supaya URL `/exec` kekal sama.
- **Frontend**: tukar `VERSI` dalam `sw.js` (contoh `iku97-v1.0.1`) setiap kali naik fail baharu.

## Nota keselamatan

- Tiada nombor IC dikumpul. Data: nama, telefon, negeri, jawatan dan emel (pilihan).
- Token sesi ditandatangani HMAC-SHA256 dan tamat selepas 60 hari. Menu "Log keluar semua pengguna"
  menukar rahsia jika perlu.
- Log masuk dikunci 15 minit selepas 5 cubaan gagal.
- Jangan kongsi Google Sheet secara awam. Kongsi hanya dengan AJK.

## Cara keputusan dikira

- **Tarikh**: jumlah alumni yang tandakan boleh hadir. Jika seri, yang lebih ramai "Pasti datang" di atas.
- **Tempat**: markah Borda. Dengan 5 calon, pilihan pertama = 5 mata, terakhir = 1 mata.
  Kiraan kehadiran dan "rakan Sabah/Sarawak tak dapat hadir" dipaparkan sebagai pertimbangan tambahan.
