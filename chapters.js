const CHAPTERS = [
    {
        id: 1,
        title: "Bab 1: Nahwu & Shorof",
        description: "Membedakan dua cabang ilmu utama bahasa Arab: Nahwu (Harakat Akhir) dan Shorof (Bentuk Kata).",
        xpReward: 300,
        scenes: [
            {
                type: "intro",
                text: "Ahlan wa Sahlan! Selamat datang di petualangan Bahasa Arab. Di bab pertama ini, kita akan membangun fondasi yang kuat.",
                speaker: "Ustadz",
                arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
            },
            {
                type: "narrative",
                text: "Bahasa Arab memiliki dua ilmu utama yang sangat penting: Nahwu dan Shorof. Keduanya bekerja sama, tapi tugasnya berbeda.",
                speaker: "Ustadz",
                arabic: "النَّحْوُ وَ الصَّرْفُ"
            },
            // --- NAHWU ---
            {
                type: "narrative",
                text: "Mari kita mulai dengan **Ilmu Nahwu**. Fokus Nahwu adalah perubahan harakat HURUF TERAKHIR suatu kata karena posisinya dalam kalimat.",
                speaker: "Ustadz",
                arabic: "النَّحْوُ"
            },
            {
                type: "interactive",
                text: "Perhatikan kata 'Muhammad' di sini. Dia adalah Pelaku (Fa'il), jadi harakat akhirnya Dhommah (un). Klik kata 'Muhammadun'!",
                speaker: "Ustadz",
                arabic: "جَاءَ مُحَمَّدٌ",
                interaction: "click-word",
                target: "مُحَمَّدٌ",
                feedback: "Benar! Huruf Dal berharakat Dhommah Tanwin (un) karena dia Fa'il."
            },
            {
                type: "interactive",
                text: "Sekarang 'Muhammad' menjadi Objek (Maf'ul Bih). Harakat akhirnya berubah menjadi Fathah (an). Klik 'Muhammadan'!",
                speaker: "Ustadz",
                arabic: "رَأَيْتُ مُحَمَّدًا",
                interaction: "click-word",
                target: "مُحَمَّدًا",
                feedback: "Tepat! Karena dia objek, harakatnya Fathah Tanwin (an)."
            },
            {
                type: "interactive",
                text: "Terakhir, jika diawali Huruf Jar (Bi), harakatnya menjadi Kasrah (in). Klik 'Muhammadin'!",
                speaker: "Ustadz",
                arabic: "مَرَرْتُ بِمُحَمَّدٍ",
                interaction: "click-word",
                target: "بِمُحَمَّدٍ",
                feedback: "Mumtaz! Huruf Jar 'Bi' membuat kata setelahnya menjadi Majrur (Kasrah)."
            },
            {
                type: "narrative",
                text: "Jadi kesimpulannya: **Nahwu** mengurus perubahan harakat akhir (Ekor Kata).",
                speaker: "Ustadz"
            },
            // --- SHOROF ---
            {
                type: "narrative",
                text: "Sekarang **Ilmu Shorof**. Shorof mempelajari perubahan BENTUK KATA dari satu akar menjadi kata lain dengan makna berbeda.",
                speaker: "Ustadz",
                arabic: "الصَّرْفُ"
            },
            {
                type: "narrative",
                text: "Contoh akar kata: H - M - D (Pujian). Dari 3 huruf ini kita bisa buat banyak kata!",
                speaker: "Ustadz",
                arabic: "ح - م - د"
            },
            {
                type: "interactive",
                text: "1. Kata Kerja Lampau (Fi'il Madhi): 'Dia telah memuji'. Klik kata 'Hamida'.",
                speaker: "Ustadz",
                arabic: "حَمِدَ",
                interaction: "click-word",
                target: "حَمِدَ",
                feedback: "Bagus. Polanya: Fa-i-la."
            },
            {
                type: "interactive",
                text: "2. Kata Kerja Sekarang (Fi'il Mudhari'): 'Dia sedang memuji'. Klik kata 'Yahmadu'.",
                speaker: "Ustadz",
                arabic: "يَحْمَدُ",
                interaction: "click-word",
                target: "يَحْمَدُ",
                feedback: "Benar. Ada tambahan Ya di depan."
            },
            {
                type: "interactive",
                text: "3. Pelaku (Isim Fa'il): 'Orang yang memuji'. Klik kata 'Haamidun'.",
                speaker: "Ustadz",
                arabic: "حَامِدٌ",
                interaction: "click-word",
                target: "حَامِدٌ",
                feedback: "Shahih! Polanya: Faa-ilun."
            },
            {
                type: "interactive",
                text: "4. Objek (Isim Maf'ul): 'Yang dipuji'. Klik kata 'Mahmuudun'.",
                speaker: "Ustadz",
                arabic: "مَحْمُوْدٌ",
                interaction: "click-word",
                target: "مَحْمُوْدٌ",
                feedback: "Tepat. Polanya: Maf-uu-lun."
            },
            {
                type: "interactive",
                text: "5. Lebih Terpuji (Isim Tafdhil/Nama): 'Ahmad'. Klik kata 'Ahmadu'.",
                speaker: "Ustadz",
                arabic: "أَحْمَدُ",
                interaction: "click-word",
                target: "أَحْمَدُ",
                feedback: "Sempurna! Ahmad artinya 'Yang lebih terpuji'."
            },
            {
                type: "narrative",
                text: "Itulah Shorof! Mengubah bentuk (Pola/Wazan) untuk merubah makna.",
                speaker: "Ustadz"
            }
        ]
    },
    {
        id: 2,
        title: "Bab 2: Tiga Jenis Kata",
        description: "Mengenal Isim, Fi'il, dan Harf sebagai penyusun kalimat.",
        xpReward: 350,
        scenes: [
            {
                type: "intro",
                text: "Sebuah kalimat sempurna (Al-Jumlah) tersusun dari 3 jenis bata utama.",
                speaker: "Ustadz",
                arabic: "أَقْسَامُ الْكَلِمَةِ"
            },
            // --- ISIM ---
            {
                type: "interactive",
                text: "Pertama: **Isim** (Kata Benda). Termasuk nama orang, benda, tempat, sifat. Klik kata 'Al-Masjidu' (Masjid).",
                speaker: "Ustadz",
                arabic: "الْمَسْجِدُ",
                interaction: "click-word",
                target: "الْمَسْجِدُ",
                feedback: "Benar! Masjid adalah nama tempat."
            },
            {
                type: "interactive",
                text: "Klik kata 'Al-Baytu' (Rumah).",
                speaker: "Ustadz",
                arabic: "الْبَيْتُ",
                interaction: "click-word",
                target: "الْبَيْتُ",
                feedback: "Tepat! Rumah adalah kata benda."
            },
            // --- FI'IL ---
            {
                type: "interactive",
                text: "Kedua: **Fi'il** (Kata Kerja). Menunjukkan perbuatan dan waktu. Klik 'Sajada' (Dia telah bersujud).",
                speaker: "Ustadz",
                arabic: "سَجَدَ",
                interaction: "click-word",
                target: "سَجَدَ",
                feedback: "Bagus! Sajada adalah aksi lampau."
            },
            {
                type: "interactive",
                text: "Klik 'Ijtama'a' (Dia telah berkumpul).",
                speaker: "Ustadz",
                arabic: "اِجْتَمَعَ",
                interaction: "click-word",
                target: "اِجْتَمَعَ",
                feedback: "Benar! Ijtama'a adalah kata kerja."
            },
            // --- HARF ---
            {
                type: "narrative",
                text: "Ketiga: **Harf** (Huruf/Kata Depan). Tidak bermakna sempurna kecuali bersambung dengan kata lain.",
                speaker: "Ustadz",
                arabic: "الْحَرْفُ"
            },
            {
                type: "interactive",
                text: "Contoh Harf adalah 'Fii' (Di dalam), 'Min' (Dari), 'Ilaa' (Ke). Klik kata 'Fii'.",
                speaker: "Ustadz",
                arabic: "فِي الْمَسْجِدِ",
                interaction: "click-word",
                target: "فِي",
                feedback: "Shahih! Fii artinya 'Di dalam'."
            },
            {
                type: "interactive",
                text: "Klik kata 'Ilaa' (Ke).",
                speaker: "Ustadz",
                arabic: "ذَهَبَ إِلَى الْبَيْتِ",
                interaction: "click-word",
                target: "إِلَى",
                feedback: "Mantap! Ilaa artinya 'Ke'."
            },
            // --- SENTENCE ---
            {
                type: "narrative",
                text: "Kita bisa menyusun kalimat sempurna dari ketiganya.",
                speaker: "Ustadz",
                arabic: "سَجَدَ فِي الْمَسْجِدِ"
            },
            {
                type: "interactive",
                text: "Coba klik kata kerjanya (Fi'il) dalam kalimat ini!",
                speaker: "Ustadz",
                arabic: "اِجْتَمَعَ فِي الْبَيْتِ",
                interaction: "click-word",
                target: "اِجْتَمَعَ",
                feedback: "Luar biasa! Kamu sudah bisa membedakan jenis kata."
            }
        ]
    },
    {
        id: 3,
        title: "Bab 3: Analisa Harakat",
        description: "Hukum Tanwin vs Alif Lam.",
        xpReward: 400,
        scenes: [
            {
                type: "intro",
                text: "Sekarang kita masuk ke analisa tanda baca (Harakat). Aturan emasnya: Tanwin dan Alif Lam (Al) TIDAK BOLEH bersatu!",
                speaker: "Ustadz",
                arabic: "ال  vs  ـٌ"
            },
            {
                type: "narrative",
                text: "Tanwin (un/an/in) menunjukkan kata itu UMUM (Nakirah). Alif Lam (Al) menunjukkan kata itu KHUSUS (Ma'rifah).",
                speaker: "Ustadz",
                arabic: "نَكِرَة  &  مَعْرِفَة"
            },
            // --- RULES ---
            {
                type: "interactive",
                text: "Jika 'Thoolibun' (Seorang siswa) dimasuki Al, tanwinnya hilang. Mana yang benar?",
                speaker: "Ustadz",
                arabic: "طَالِبٌ + ال",
                interaction: "choice",
                choices: ["الطَّالِبٌ", "الطَّالِبُ"],
                correctChoice: "الطَّالِبُ",
                feedback: "Benar! 'Ath-Thoolibu'. Tanwin dhommah (un) berubah jadi dhommah biasa (u)."
            },
            {
                type: "interactive",
                text: "Dalam keadaan Nashab (Fathah): 'Thooliban'. Jika diberi Al menjadi?",
                speaker: "Ustadz",
                arabic: "طَالِبًا + ال",
                interaction: "choice",
                choices: ["الطَّالِبَ", "الطَّالِبًا"],
                correctChoice: "الطَّالِبَ",
                feedback: "Tepat! 'Ath-Thooliba'. Fathah tanwin (an) jadi fathah biasa (a)."
            },
            {
                type: "interactive",
                text: "Dalam keadaan Jar (Kasrah): 'Thoolibin'. Jika diberi Al menjadi?",
                speaker: "Ustadz",
                arabic: "طَالِبٍ + ال",
                interaction: "choice",
                choices: ["الطَّالِبِ", "الطَّالِبٍ"],
                correctChoice: "الطَّالِبِ",
                feedback: "Sempurna! 'Ath-Thoolibi'. Kasrah tanwin (in) jadi kasrah biasa (i)."
            },
            // --- AL-FATIHAH PRACTICE ---
            {
                type: "narrative",
                text: "Mari kita praktikkan pada Surat Al-Fatihah.",
                speaker: "Ustadz",
                arabic: "سُوْرَةُ الْفَاتِحَةِ"
            },
            {
                type: "interactive",
                text: "Ayat 2: 'Al-Hamdu'. Kenapa dibaca 'Du' (bukan Dun)? Klik kata 'Al-Hamdu'.",
                speaker: "Ustadz",
                arabic: "الْحَمْدُ لِلَّهِ",
                interaction: "click-word",
                target: "الْحَمْدُ",
                feedback: "Karena ada Alif Lam (Al)! Maka tanwin tidak boleh masuk."
            },
            {
                type: "interactive",
                text: "Ayat 4: 'Maaliki Yaumi Ad-Diini'. Kata 'Ad-Diini' ada Alif Lam, jadi harakatnya kasrah biasa (i), bukan tanwin. Klik 'Ad-Diini'.",
                speaker: "Ustadz",
                arabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
                interaction: "click-word",
                target: "ٱلدِّينِ",
                feedback: "Bagus sekali analisis kamu!"
            }
        ]
    },
    {
        id: 4,
        title: "Bab 4: Dua Pola Kalimat",
        description: "Jumlah Fi'liyyah dan Jumlah Ismiyyah.",
        xpReward: 450,
        scenes: [
            {
                type: "intro",
                text: "Dalam bahasa Arab, kalimat (Jumlah) dibagi dua berdasarkan kata pertamanya.",
                speaker: "Ustadz",
                arabic: "نَوْعَا الْجُمْلَةِ"
            },
            // --- JUMLAH FI'LIYYAH ---
            {
                type: "narrative",
                text: "1. **Jumlah Fi'liyyah**: Kalimat yang diawali Kata Kerja (Fi'il). Rumusnya: Fi'il + Fa'il + (Objek).",
                speaker: "Ustadz",
                arabic: "الْجُمْلَةُ الْفِعْلِيَّةُ"
            },
            {
                type: "interactive",
                text: "Contoh: 'Jaa-a Zaidun' (Zaid telah datang). Klik kata kerjanya (Fi'il)!",
                speaker: "Ustadz",
                arabic: "جَاءَ زَيْدٌ",
                interaction: "click-word",
                target: "جَاءَ",
                feedback: "Benar. 'Jaa-a' adalah Fi'il Madhi."
            },
            {
                type: "interactive",
                text: "Contoh dengan Objek: 'Dhoroba Zaidun Al-Kalba' (Zaid memukul anjing). Klik Pelakunya (Fa'il)!",
                speaker: "Ustadz",
                arabic: "ضَرَبَ زَيْدٌ الْكَلْبَ",
                interaction: "click-word",
                target: "زَيْدٌ",
                feedback: "Tepat. Zaid adalah pelakunya."
            },
            // --- JUMLAH ISMIYYAH ---
            {
                type: "narrative",
                text: "2. **Jumlah Ismiyyah**: Kalimat yang diawali Kata Benda (Isim). Rumusnya: Mubtada (Subjek) + Khobar (Predikat).",
                speaker: "Ustadz",
                arabic: "الْجُمْلَةُ الْاِسْمِيَّةُ"
            },
            {
                type: "interactive",
                text: "Contoh: 'Al-Masjidu Jamiilun' (Masjid itu indah). Klik Mubtada-nya (Masjid)!",
                speaker: "Ustadz",
                arabic: "الْمَسْجِدُ جَمِيْلٌ",
                interaction: "click-word",
                target: "الْمَسْجِدُ",
                feedback: "Benar. Masjid adalah subjek yang dibicarakan."
            },
            {
                type: "interactive",
                text: "Khobar (Predikat) tidak selalu satu kata. Bisa juga 'Jar Majrur' (Keterangan Tempat). Klik 'Fii Al-Fashli' (Di kelas).",
                speaker: "Ustadz",
                arabic: "زَيْدٌ فِي الْفَصْلِ",
                interaction: "click-word",
                target: "فِي",
                feedback: "Shahih. 'Fii Al-Fashli' adalah Khobar (Kabar) tentang Zaid."
            },
            {
                type: "narrative",
                text: "Ingat: Awal kalimat Fi'il = Fi'liyyah. Awal kalimat Isim = Ismiyyah.",
                speaker: "Ustadz"
            }
        ]
    },
    {
        id: 5,
        title: "Bab 5: Tujuh Bab Penting",
        description: "Mengenal posisi I'rab: Marfu', Manshub, dan Majrur.",
        xpReward: 500,
        scenes: [
            {
                type: "intro",
                text: "Ini adalah inti ilmu Nahwu. Kita mengenal 7 jabatan kata (posisi). Ada yang Marfu' (u), Manshub (a), dan Majrur (i).",
                speaker: "Ustadz",
                arabic: "الْأَبْوَابِ السَّبْعَةِ"
            },
            // --- MARFU' ---
            {
                type: "narrative",
                text: "**A. Kelompok MARFU'** (Harakat Akhir Dhommah). Ada 5 jabatan:",
                speaker: "Ustadz",
                arabic: "الْمَرْفُوْعَاتُ"
            },
            {
                type: "interactive",
                text: "1. Fa'il (Pelaku). Klik 'Zaidun'.",
                speaker: "Ustadz",
                arabic: "جَاءَ زَيْدٌ",
                interaction: "click-word",
                target: "زَيْدٌ",
                feedback: "Benar."
            },
            {
                type: "interactive",
                text: "2. Mubtada (Subjek Awal). Klik 'Al-Masjidu'.",
                speaker: "Ustadz",
                arabic: "الْمَسْجِدُ جَمِيْلٌ",
                interaction: "click-word",
                target: "الْمَسْجِدُ",
                feedback: "Tepat."
            },
            {
                type: "interactive",
                text: "3. Khobar (Predikat). Klik 'Jamiilun'.",
                speaker: "Ustadz",
                arabic: "الْمَسْجِدُ جَمِيْلٌ",
                interaction: "click-word",
                target: "جَمِيْلٌ",
                feedback: "Bagus."
            },
            {
                type: "interactive",
                text: "4. Isim KANA (Setelah Kana). Klik 'Al-Masjidu' setelah Kana.",
                speaker: "Ustadz",
                arabic: "كَانَ الْمَسْجِدُ جَمِيْلًا",
                interaction: "click-word",
                target: "الْمَسْجِدُ",
                feedback: "Lihat, dia tetap Dhommah."
            },
            {
                type: "interactive",
                text: "5. Khobar INNA (Setelah Inna). Klik 'Jamiilun' setelah Inna.",
                speaker: "Ustadz",
                arabic: "إِنَّ الْمَسْجِدَ جَمِيْلٌ",
                interaction: "click-word",
                target: "جَمِيْلٌ",
                feedback: "Shahih. Khobar Inna itu Marfu'."
            },
            // --- MANSHUB ---
            {
                type: "narrative",
                text: "**B. Kelompok MANSHUB** (Harakat Akhir Fathah). Ada 3 jabatan:",
                speaker: "Ustadz",
                arabic: "الْمَنْصُوْبَاتُ"
            },
            {
                type: "interactive",
                text: "1. Maf'ul Bih (Objek). Klik 'Al-Kalba'.",
                speaker: "Ustadz",
                arabic: "ضَرَبَ زَيْدٌ الْكَلْبَ",
                interaction: "click-word",
                target: "الْكَلْبَ",
                feedback: "Benar, objek selalu Fathah."
            },
            {
                type: "interactive",
                text: "2. Khobar KANA. Klik 'Jamiilan'.",
                speaker: "Ustadz",
                arabic: "كَانَ الْمَسْجِدُ جَمِيْلًا",
                interaction: "click-word",
                target: "جَمِيْلًا",
                feedback: "Tepat."
            },
            {
                type: "interactive",
                text: "3. Isim INNA. Klik 'Al-Masjida'.",
                speaker: "Ustadz",
                arabic: "إِنَّ الْمَسْجِدَ جَمِيْلٌ",
                interaction: "click-word",
                target: "الْمَسْجِدَ",
                feedback: "Bagus. Isim Inna jadi Fathah."
            },
            // --- MAJRUR ---
            {
                type: "narrative",
                text: "**C. Kelompok MAJRUR** (Harakat Akhir Kasrah). Ada 2 jabatan:",
                speaker: "Ustadz",
                arabic: "الْمَجْرُوْرَاتُ"
            },
            {
                type: "interactive",
                text: "1. Isim Jar (Didahului Harf Jar). Klik 'Al-Masjidi'.",
                speaker: "Ustadz",
                arabic: "فِي الْمَسْجِدِ",
                interaction: "click-word",
                target: "الْمَسْجِدِ",
                feedback: "Benar."
            },
            {
                type: "interactive",
                text: "2. Mudhof Ilaih (Sandaran). Dalam 'Baitullahi' (Rumah Allah), klik 'Allahi'.",
                speaker: "Ustadz",
                arabic: "بَيْتُ اللهِ",
                interaction: "click-word",
                target: "اللهِ",
                feedback: "Mumtaz! Kata kedua dalam kepemilikan selalu Kasrah."
            },
            // --- COMPLEX ANALYSIS ---
            {
                type: "narrative",
                text: "Tantangan Terakhir Bab 5! Analisa kalimat kompleks ini:",
                speaker: "Ustadz",
                arabic: "تَحْلِيْلُ الْجُمَلِ"
            },
            {
                type: "interactive",
                text: "Kalimat: 'Yata'allamu Zaidun Ilma At-Tafsiiri' (Zaid mempelajari ilmu tafsir). Klik Objek (Maf'ul Bih) yang Fathah!",
                speaker: "Ustadz",
                arabic: "يَتَعَلَّمُ زَيْدٌ عِلْمَ التَّفْسِيْرِ",
                interaction: "click-word",
                target: "عِلْمَ",
                feedback: "Luar biasa! 'Ilma' adalah objeknya."
            }
        ]
    },
    {
        id: 6,
        title: "Bab 6: Mengenal 3K",
        description: "Kata yang Mabni (Kebal Perubahan): Kata Ganti, Tunjuk, dan Sambung.",
        xpReward: 550,
        scenes: [
            {
                type: "intro",
                text: "Di bab terakhir ini, kita belajar '3K'. Tiga kelompok kata yang MABNI (Tetap), harakat akhirnya tidak berubah walau posisinya beda.",
                speaker: "Ustadz",
                arabic: "الْمَبْنِيُّ (٣ ك)"
            },
            // --- KATA GANTI ---
            {
                type: "narrative",
                text: "1. **Kata Ganti (Dhomir)**. Contoh: Huwa (Dia), Anta (Kamu), Ana (Saya), Nahnu (Kami).",
                speaker: "Ustadz",
                arabic: "الضَّمِيْرُ"
            },
            {
                type: "interactive",
                text: "Dalam kalimat 'Huwa Thoolibun' (Dia siswa), klik 'Huwa'.",
                speaker: "Ustadz",
                arabic: "هُوَ طَالِبٌ",
                interaction: "click-word",
                target: "هُوَ",
                feedback: "Benar. Huwa tetap 'Huwa', tidak jadi 'Huwi'."
            },
            {
                type: "interactive",
                text: "Mana kata ganti 'Kami' (Nahnu)?",
                speaker: "Ustadz",
                arabic: "نَحْنُ نَجْلِسُ",
                interaction: "click-word",
                target: "نَحْنُ",
                feedback: "Tepat."
            },
            // --- KATA TUNJUK ---
            {
                type: "narrative",
                text: "2. **Kata Tunjuk (Isyarah)**. Dekat: Hadza (Ini Lk), Hadzihi (Ini Pr). Jauh: Dzalika (Itu Lk), Tilka (Itu Pr).",
                speaker: "Ustadz",
                arabic: "اِسْمُ الْإِشَارَةِ"
            },
            {
                type: "interactive",
                text: "Klik kata tunjuk 'Ini' (Hadza).",
                speaker: "Ustadz",
                arabic: "هَذَا كِتَابٌ",
                interaction: "click-word",
                target: "هَذَا",
                feedback: "Bagus. Hadza selalu berakhiran sukun (alif)."
            },
            {
                type: "interactive",
                text: "Klik kata tunjuk 'Itu' (Tilka) untuk perempuan/benda.",
                speaker: "Ustadz",
                arabic: "تِلْكَ سَيَّارَةٌ",
                interaction: "click-word",
                target: "تِلْكَ",
                feedback: "Benar."
            },
            // --- KATA SAMBUNG ---
            {
                type: "narrative",
                text: "3. **Kata Sambung (Maushul)**. Artinya 'Yang'. Alladzi (Lk), Allati (Pr).",
                speaker: "Ustadz",
                arabic: "اِسْمُ الْمَوْصُوْلِ"
            },
            {
                type: "interactive",
                text: "Klik kata sambung 'Yang' (Alladzi).",
                speaker: "Ustadz",
                arabic: "جَاءَ الَّذِيْ نَصَرَ",
                interaction: "click-word",
                target: "الَّذِيْ",
                feedback: "Sempurna! Alladzi juga mabni."
            },
            {
                type: "narrative",
                text: "Selamat! Kamu telah menyelesaikan materi dasar Nahwu & Shorof (Bab 1-6). Barakallahu fiikum!",
                speaker: "Ustadz",
                arabic: "بَارَكَ اللهُ فِيْكُمْ"
            }
        ]
    }
];
