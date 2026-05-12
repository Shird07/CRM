# Implementation Plan: Completing CRM Workflow Tasks

Berdasarkan `agent.md`, terdapat 5 poin teknis utama yang harus diselesaikan untuk menyempurnakan fitur aplikasi. Berikut adalah rencana implementasinya:

## User Review Required

> [!WARNING]
> **Monitoring Real-Time**: Untuk notifikasi "Win" secara real-time di Dashboard Admin, kita memiliki dua opsi:
> 1.  **Sistem Polling Frontend (Simpel)**: Dashboard merefresh data secara otomatis setiap X detik tanpa perlu setup tambahan.
> 2.  **Laravel Reverb / Pusher (Advanced)**: Menggunakan WebSockets. Lebih *real-time* namun membutuhkan setup server WebSocket lokal/external.
> *Rencana ini menggunakan **Opsi 1 (Polling Frontend)** sebagai default untuk kemudahan. Beritahu saya jika Anda ingin menggunakan Reverb/Pusher.*

## Open Questions

1.  **Initial Setup**: Kolom apa saja di tabel `users` yang dianggap wajib (esensial) sehingga Sales diizinkan masuk ke halaman utama? (Misal: `no_hp`, `alamat`, `avatar`?)
2.  **User Management**: Apakah Admin perlu memiliki halaman tersendiri (seperti `/admin/sales/create`) atau cukup menggunakan Modal Pop-up pada `Admin/SalesPage` yang sudah ada?

## Proposed Changes

---

### 1. Admin Responsibilities: User Management & Monitoring

#### [NEW] `app/Http/Controllers/Admin/SalesController.php`
- Membuat fungsi `store`, `update`, dan `destroy` untuk akun Sales.
- **Logika Pemindahan Region**: Memastikan pembaruan kolom `region_id` di tabel `users` tidak menimpa riwayat `region_id` yang sudah ada pada tabel `prospeks` dan `activities`.

#### [MODIFY] `resources/js/Pages/Admin/Dashboard.jsx` (atau SalesPage)
- Menambahkan *Form/Modal* untuk Create dan Update data Sales.
- Menambahkan **Logika Polling / Notifikasi** menggunakan `useEffect` dan `setInterval` yang memanggil `router.reload({ only: ['latestWins'] })` untuk memunculkan notifikasi "Win" terbaru tanpa merefresh seluruh halaman secara manual.

---

### 2. Sales Responsibilities: Initial Setup (Middleware)

#### [NEW] `app/Http/Middleware/CheckProfileCompletion.php`
- Middleware untuk memeriksa kelengkapan profil Sales (contoh: mengecek `no_hp` dan `alamat`).
- Jika kosong, akan mem-blokir akses dan mengarahkan paksa (*redirect*) ke route `profile.edit` dengan *flash message* peringatan.

#### [MODIFY] `bootstrap/app.php`
- Mendaftarkan middleware `CheckProfileCompletion` ke dalam alias middleware agar dapat dipasang pada route group `sales.*`.

---

### 3. Sales Responsibilities: Communication (WhatsApp Integration)

#### [MODIFY] Frontend Components (contoh: `DetailProspek.jsx`, `Sales/Prospek/Show.jsx`)
- Membuat helper function javascript `formatWhatsApp(number)` untuk membersihkan karakter selain angka dan mengganti awalan '0' menjadi '62'.
- Menambahkan tombol **"Chat via WhatsApp"** dengan tautan `https://wa.me/{formattedNumber}` pada UI detail prospek dan database pelanggan.

---

### 4. Sales Responsibilities: Scheduling / Reminder

#### [NEW] `app/Console/Commands/CheckFollowUpReminders.php`
- (Opsional/Jika dibutuhkan background task) Membuat *Artisan command* yang bisa dijalankan oleh Task Scheduler untuk mengecek tenggat waktu `follow_up` dan memicu pengiriman notifikasi.

#### [MODIFY] Logika Notifikasi UI
- Memanfaatkan tabel `notifications` (Laravel Database Notifications) agar setiap jadwal penawaran (follow-up) secara otomatis memunculkan *badge* / pop-up pada ikon *Bell* (Lonceng) di *Topbar* Sales Dashboard saat tenggat waktu telah tiba atau H-1.

## Verification Plan

### Manual Verification
- Login sebagai **Admin**: 
  - Mencoba menambah, mengubah, dan memindahkan regional seorang akun Sales.
  - Memverifikasi bahwa data prospek lama yang dimiliki sales tersebut masih tercatat pada region yang lama.
  - Melihat apakah notifikasi Win muncul tanpa me-refresh seluruh halaman (polling berfungsi).
- Login sebagai **Sales Baru**: 
  - Memastikan *redirect* paksa berfungsi jika profil belum lengkap.
  - Membuka halaman detail prospek dan mengklik tombol WhatsApp untuk memastikan diarahkan ke URL API WA yang benar.
  - Mengecek notifikasi jadwal *follow-up* muncul pada ikon lonceng sesuai waktu yang ditentukan.
