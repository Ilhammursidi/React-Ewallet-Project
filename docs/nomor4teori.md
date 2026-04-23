# WEEK 7 Nomor 4
# 

## a. Perbedaan Linux Kernel dan Distro

**Linux Kernel**  
Kernel adalah inti dari sistem operasi Linux. Tugasnya menghubungkan hardware (CPU, RAM, dll) dengan software.

**Contoh:**

* Kernel itu seperti “mesin” pada mobil.  

**Linux Distro**  
Distro adalah variasi sistem operasi Linux yang sudah lengkap (kernel + aplikasi + tampilan).

**contoh distro:**
* Ubuntu : paling populer dan mudah digunakan
* Debian : paling stabil dan sering digunakan untuk server
* Linux Mint : tata letaknya mirip windows

**Perumpamaan:**

* Kernel = mesin mobil
* Distro = mobil lengkap (mesin + body + interior)

---

## b. Linux FHS (Filesystem Hierarchy Standard)

FHS adalah aturan tentang susunan folder di Linux.

**Contoh folder penting:**

* `/home` => tempat file user
* `/root` => berisikan file milik root
* `/etc`  => berisikan file konfigurasi
* `/bin`  => berisikan program esensial
* `/usr`  => berisikan program non-esensial
* `/var`  => berisikan file tambahan atau pendukung
* `/mnt`  => storage yang dipasang secara sementara ataupun manual
* `/media`=> removable media yang terpasang secara otomatis (USB, eksternal HDD, dll)

**Contoh penggunaan:**

* File konfigurasi nginx → `/etc/nginx`
* File user → `/home/username`

---

## c. Sistem Permission dan Owner

Di Linux, setiap file punya:

* **Owner (pemilik)**
* **Group (kelompok)**
* **Permission (izin akses)**

**Jenis permission:**

* `r` = read (baca) = 4
* `w` = write (tulis) = 2
* `x` = execute (jalankan) = 1 

**Contoh:**

```
-rwxr-xr--
```

Artinya:

* Owner: bisa baca, tulis, jalankan
* Group: bisa baca & jalankan
* Others: hanya baca

**contoh mengubah owner dan group:**
```
sudo chown user:group file.txt

drwxrwx--- 4 user group 4096 Apr 16 21:54 file.txt
```

**contoh mengubah permission(numerik)**
```
sudo chmod 764 file.txt

drwxrw-r-- 4 user group 4096 Apr 16 21:54 file.txt
```

---

## d. Prinsip Enkripsi pada SSH

**1. Enkripsi Simetris (Symmetric Encryption)**

Digunakan untuk mengenkripsi seluruh sesi data setelah koneksi terjalin. Kedua belah pihak (klien dan server) menggunakan kunci yang sama untuk enkripsi dan dekripsi.

Cara kerja:

Client dan server pakai 1 kunci yang sama
Kunci ini digunakan untuk:
- mengunci data
- membuka data

Algoritma:

- AES (yang paling sering)
- ChaCha20

Kenapa dipakai?

- Cepat
- Cocok untuk kirim data terus-menerus

**2. Enkripsi Asimetris (Asymmetric Encryption)**

Digunakan saat inisiasi sesi untuk bertukar kunci simetris secara aman dan untuk autentikasi. Ini melibatkan sepasang kunci: public key (publik) dan private key (pribadi).

Cara kerja:

Pakai 2 kunci:
- Public key (boleh dibagikan)
- Private key (rahasia)

Algoritma:

- RSA
- ECDSA
- Ed25519

Fungsi di SSH:

- Login tanpa password (pakai SSH key)
- Tukar kunci secara aman  

**3. Hashing (Message Authentication Code / MAC)**

Menggunakan MAC (Message Authentication Code) untuk memastikan pesan tidak diubah selama transmisi.

Algoritma: 
- SHA-256 
- SHA-512 
- HMAC-SHA2

Proses Autentikasi dengan Key Pair
1. Client mengirim permintaan login + public key identifier
2. Server cek public key di ~/.ssh/authorized_keys
3. Server buat random challenge, enkripsi dengan public key client
4. Client dekripsi dengan private key-nya, kirim bukti ke server
5. Server verifikasi → akses diberikan

Fungsi:
- Mencegah data diubah di tengah jalan

---

## e. Perbedaan HTTP dan HTTPS

**HTTP (HyperText Transfer Protocol)**  
Protokol komunikasi dasar untuk transfer data di web. Berjalan di port 80 dan tidak memiliki enkripsi.

**HTTPS (HTTP Secure)**
Versi aman dari HTTP yang menggunakan TLS/SSL untuk enkripsi. Berjalan di port 443.

| HTTP                         | HTTPS              |
| ---------------------------- | ------------------ |
| Tidak aman                   | Aman (terenkripsi) |
| Data bisa dilihat orang lain | Data aman          |
| Port 80                      | Port 443           |

**Contoh:**

* HTTP → login bisa disadap
* HTTPS → login aman

---

## f. Docker OCI Compliance Standard

OCI (Open Container Initiative) adalah organisasi open-source yang didirikan pada 2015 oleh Docker, CoreOS, dan perusahaan teknologi lainnya, di bawah naungan Linux Foundation. Tujuannya adalah membuat standar terbuka untuk container agar dapat berjalan di berbagai platform dan runtime.  

Docker mengikuti standar OCI supaya container dan image bisa dipakai di berbagai platform lain tanpa masalah.

**1. Image Standard (OCI Image Spec)**

Mengatur bentuk image container

Isinya:
- Struktur layer
- Metadata
- Cara penyimpanan image

Di Docker:
Saat kamu bikin image:
```
docker build -t app .
```

Image itu sudah mengikuti standar OCI

**2. Runtime Standard (OCI Runtime Spec)**

Mengatur cara menjalankan container

Isinya:
- Cara start container
- Penggunaan CPU & RAM
- Isolasi proses

Di Docker:
Saat kamu jalankan:
```
docker run app
```

Docker sebenarnya pakai:
- runc
untuk menjalankan container sesuai standar OCI

**Tujuannya:**

* Agar container bisa jalan di mana saja
* Tidak tergantung platform tertentu

**Contoh:**

* Image Docker bisa dijalankan di berbagai runtime

---

## g. Perbedaan Container dan VM

Container adalah cara menjalankan aplikasi secara terisolasi, tapi masih berbagi sistem operasi yang sama.

VM (Virtual Machine) adalah komputer virtual lengkap di dalam komputer lain.

| Container | VM               |
| --------- | ---------------- |
| Ringan    | Berat            |
| Cepat     | Lebih lambat     |
| Share OS  | Punya OS sendiri |

Kapan Pakai Apa?
Pakai Container kalau:
- Mau cepat
- Hemat resource
- Deploy aplikasi  

Pakai VM kalau:
- Butuh OS berbeda
- Butuh isolasi penuh
- Testing sistem

**Contoh:**

* Container → seperti aplikasi biasa
* VM → seperti komputer dalam komputer

---

## h. Image Layer pada Docker

Docker image terdiri dari beberapa layer (lapisan).

**Manfaat:**

* Lebih cepat build
* Hemat storage
* Bisa reuse layer

**Contoh:**

```
FROM node
COPY .
RUN npm install
```

Setiap baris = 1 layer

---

## i. Docker Volume dan Network

**Docker Volume**

Digunakan untuk menyimpan data agar tidak hilang.

**Contoh:**

```
docker volume create mydata
```

**Kegunaan:**

* Data database tidak hilang walau container mati

---

**Docker Network**

Digunakan agar container bisa saling komunikasi.

**Contoh:**

```
docker network create mynet
```

**Kegunaan:**

* Backend bisa connect ke database

---

## j. Web Server dan Reverse Proxy

**Web Server**

Server yang melayani request dari user.

**Contoh:**

* Menampilkan website

---

**Reverse Proxy**

Perantara antara user dan server.

**Fungsi:**

* Membagi beban (load balancing)
* Menyembunyikan server asli
* Menambah keamanan

**Contoh:**

* User → Nginx → Backend

---