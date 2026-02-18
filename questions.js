const GAME_DATA = {
    levels: [
        {
            id: 1,
            title: "Bab 1: Nahwu & Shorof",
            description: "Bedakan antara perubahan harakat akhir (Nahwu) dan perubahan bentuk kata (Shorof).",
            xpReward: 100,
            questions: [
                {
                    id: 101,
                    type: "choice",
                    question: "Ilmu yang mempelajari perubahan harakat akhir suatu kata dalam kalimat disebut...",
                    options: ["Nahwu", "Shorof", "Tajwid", "Fiqh"],
                    answer: "Nahwu"
                },
                {
                    id: 102,
                    type: "choice",
                    question: "Perubahan kata dari 'Hamida' (telah memuji) menjadi 'Yahmadu' (sedang memuji) adalah pembahasan ilmu...",
                    options: ["Nahwu", "Shorof", "Balahgah", "Mantiq"],
                    answer: "Shorof"
                },
                {
                    id: 103,
                    type: "choice",
                    question: "Manakah yang merupakan fokus kajian ilmu Nahwu?",
                    options: ["Perubahan bentuk kata dasar", "Perubahan harakat huruf terakhir", "Cara membaca Al-Quran", "Arti kata per kata"],
                    answer: "Perubahan harakat huruf terakhir"
                },
                {
                    id: 104,
                    type: "choice",
                    question: "Jika kata 'Muhammad' berubah menjadi 'Muhammadan', ini adalah contoh perubahan dalam...",
                    options: ["Shorof", "Nahwu", "Imla", "Khat"],
                    answer: "Nahwu"
                },
                {
                    id: 105,
                    type: "choice",
                    question: "Membentuk kata 'Mahmud' (yang dipuji) dari akar kata 'Hamida' adalah contoh...",
                    options: ["Shorof", "Nahwu", "I'rab", "Bina"],
                    answer: "Shorof"
                }
            ]
        },
        {
            id: 2,
            title: "Bab 2: Tiga Jenis Kata",
            description: "Kenali perbedaan Isim (Benda), Fi'il (Kerja), dan Harf (Huruf).",
            xpReward: 150,
            questions: [
                {
                    id: 201,
                    type: "choice",
                    question: "Kata 'Al-Madrasah' (Sekolah) termasuk jenis kata...",
                    options: ["Isim", "Fi'il", "Harf", "Dhomir"],
                    answer: "Isim"
                },
                {
                    id: 202,
                    type: "choice",
                    question: "Kata 'Dzahaba' (Dia telah pergi) termasuk jenis kata...",
                    options: ["Isim", "Fi'il", "Harf", "Sifat"],
                    answer: "Fi'il"
                },
                {
                    id: 203,
                    type: "choice",
                    question: "Kata 'Fii' (Di dalam) termasuk jenis kata...",
                    options: ["Isim", "Fi'il", "Harf", "Mubtada"],
                    answer: "Harf"
                },
                {
                    id: 204,
                    type: "choice",
                    question: "Manakah di bawah ini yang merupakan Fi'il (Kata Kerja)?",
                    options: ["Al-Kitabu", "Min", "Jalasa", "Zaidun"],
                    answer: "Jalasa"
                },
                {
                    id: 205,
                    type: "choice",
                    question: "Manakah di bawah ini yang merupakan Isim (Kata Benda)?",
                    options: ["Yaktubu", "Ila", "Qalamun", "Qara'a"],
                    answer: "Qalamun"
                }
            ]
        },
        {
            id: 3,
            title: "Bab 3: Analisa Harakat",
            description: "Aturan Tanwin dan Alif Lam.",
            xpReward: 200,
            questions: [
                {
                    id: 301,
                    type: "choice",
                    question: "Apa hukum Tanwin dan Alif Lam dalam satu kata?",
                    options: ["Boleh bersatu", "Tidak boleh bersatu", "Harus bersatu", "Tergantung kalimat"],
                    answer: "Tidak boleh bersatu"
                },
                {
                    id: 302,
                    type: "choice",
                    question: "Jika kata 'Kitabun' dimasuki Alif Lam, maka menjadi...",
                    options: ["Al-Kitabun", "Al-Kitabu", "Al-Kitabin", "Kitabu"],
                    answer: "Al-Kitabu"
                },
                {
                    id: 303,
                    type: "choice",
                    question: "Manakah penulisan yang BENAR?",
                    options: ["Al-Masjidun", "Masjidu", "Al-Masjidu", "Al-Masjidin"],
                    answer: "Al-Masjidu"
                },
                {
                    id: 304,
                    type: "choice",
                    question: "Kata 'Thaliban' jika diberi Alif Lam menjadi...",
                    options: ["Ath-Thaliban", "Ath-Thaliba", "Ath-Thalibu", "Ath-Thalibi"],
                    answer: "Ath-Thaliba"
                },
                {
                    id: 305,
                    type: "choice",
                    question: "Tanwin menunjukkan bahwa kata benda tersebut bersifat...",
                    options: ["Khusus (Ma'rifah)", "Umum (Nakirah)", "Mabni", "Tetap"],
                    answer: "Umum (Nakirah)"
                }
            ]
        },
        {
            id: 4,
            title: "Bab 4: Dua Pola Kalimat",
            description: "Membedakan Jumlah Ismiyyah dan Jumlah Fi'liyyah.",
            xpReward: 250,
            questions: [
                {
                    id: 401,
                    type: "choice",
                    question: "Kalimat yang diawali oleh Isim (Kata Benda) disebut...",
                    options: ["Jumlah Fi'liyyah", "Jumlah Ismiyyah", "Syibhul Jumlah", "Isim Isyarah"],
                    answer: "Jumlah Ismiyyah"
                },
                {
                    id: 402,
                    type: "choice",
                    question: "Kalimat 'Zaidun Jalasun' (Zaid duduk) adalah contoh...",
                    options: ["Jumlah Fi'liyyah", "Jumlah Ismiyyah", "Fi'il Madhi", "Harf Jar"],
                    answer: "Jumlah Ismiyyah"
                },
                {
                    id: 403,
                    type: "choice",
                    question: "Kalimat 'Jaa-a Zaidun' (Zaid telah datang) adalah contoh...",
                    options: ["Jumlah Fi'liyyah", "Jumlah Ismiyyah", "Mubtada Khobar", "Isim Fa'il"],
                    answer: "Jumlah Fi'liyyah"
                },
                {
                    id: 404,
                    type: "choice",
                    question: "Rumus Jumlah Ismiyyah adalah...",
                    options: ["Fi'il + Fa'il", "Mubtada + Khobar", "Fi'il + Maf'ul", "Mubtada + Fa'il"],
                    answer: "Mubtada + Khobar"
                },
                {
                    id: 405,
                    type: "choice",
                    question: "Rumus Jumlah Fi'liyyah adalah...",
                    options: ["Isim + Isim", "Fi'il + Fa'il", "Mubtada + Khobar", "Harf + Isim"],
                    answer: "Fi'il + Fa'il"
                }
            ]
        },
        {
            id: 5,
            title: "Bab 5: Tujuh Bab Penting",
            description: "Mengenal posisi Marfu', Manshub, dan Majrur.",
            xpReward: 300,
            questions: [
                {
                    id: 501,
                    type: "choice",
                    question: "Fa'il (Pelaku) harakat akhirnya harus...",
                    options: ["Fathah (Manshub)", "Kasrah (Majrur)", "Dhommah (Marfu')", "Sukun (Majzum)"],
                    answer: "Dhommah (Marfu')"
                },
                {
                    id: 502,
                    type: "choice",
                    question: "Maf'ul Bih (Objek) harakat akhirnya harus...",
                    options: ["Fathah (Manshub)", "Kasrah (Majrur)", "Dhommah (Marfu')", "Sukun (Majzum)"],
                    answer: "Fathah (Manshub)"
                },
                {
                    id: 503,
                    type: "choice",
                    question: "Kata yang didahului Huruf Jar (seperti 'Fii', 'Ala') harakat akhirnya...",
                    options: ["Fathah", "Kasrah", "Dhommah", "Sukun"],
                    answer: "Kasrah"
                },
                {
                    id: 504,
                    type: "choice",
                    question: "Dalam kalimat 'Dhoroba Zaidun Al-Kalba', kata 'Zaidun' berharakat dhommah karena...",
                    options: ["Sebagai Objek (Maf'ul)", "Sebagai Pelaku (Fa'il)", "Didahului Huruf Jar", "Sebagai Keterangan"],
                    answer: "Sebagai Pelaku (Fa'il)"
                },
                {
                    id: 505,
                    type: "choice",
                    question: "Dalam kalimat 'Fii Al-Masjidi', kata 'Al-Masjidi' berharakat kasrah karena...",
                    options: ["Isim Jar (didahului Harf)", "Mubtada", "Khobar", "Fa'il"],
                    answer: "Isim Jar (didahului Harf)"
                }
            ]
        },
        {
            id: 6,
            title: "Bab 6: Mengenal 3K",
            description: "Kata Ganti, Kata Tunjuk, dan Kata Sambung (Mabni).",
            xpReward: 350,
            questions: [
                {
                    id: 601,
                    type: "choice",
                    question: "Kata 'Huwa' (Dia) termasuk jenis...",
                    options: ["Kata Tunjuk (Isyarah)", "Kata Ganti (Dhomir)", "Kata Sambung (Maushul)", "Kata Kerja (Fi'il)"],
                    answer: "Kata Ganti (Dhomir)"
                },
                {
                    id: 602,
                    type: "choice",
                    question: "Kata 'Hadza' (Ini) termasuk jenis...",
                    options: ["Kata Tunjuk (Isyarah)", "Kata Ganti (Dhomir)", "Kata Sambung (Maushul)", "Kata Benda (Isim)"],
                    answer: "Kata Tunjuk (Isyarah)"
                },
                {
                    id: 603,
                    type: "choice",
                    question: "Kata 'Alladzi' (Yang) termasuk jenis...",
                    options: ["Kata Tunjuk (Isyarah)", "Kata Ganti (Dhomir)", "Kata Sambung (Maushul)", "Harf Jar"],
                    answer: "Kata Sambung (Maushul)"
                },
                {
                    id: 604,
                    type: "choice",
                    question: "Kata-kata dalam kelompok 3K (Dhomir, Isyarah, Maushul) memiliki sifat...",
                    options: ["Mu'rab (Berubah harakat)", "Mabni (Tetap harakat)", "Majrur (Kasrah)", "Manshub (Fathah)"],
                    answer: "Mabni (Tetap harakat)"
                },
                {
                    id: 605,
                    type: "choice",
                    question: "Manakah yang merupakan Kata Ganti Orang Kedua (Kamu)?",
                    options: ["Huwa", "Nahnu", "Anta", "Ana"],
                    answer: "Anta"
                }
            ]
        }
    ]
};
