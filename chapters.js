const CHAPTERS = [
    {
        id: 1,
        title: "Nahwu & Shorof",
        description: "Dasar Ilmu Bahasa Arab",
        xpReward: 100,
        scenes: [
            {
                type: "intro",
                text: "Ahlan wa Sahlan! Selamat datang di petualangan Bahasa Arab. Kita akan mulai dari fondasi paling dasar.",
                speaker: "Ustadz",
                arabic: "السَّلَامُ عَلَيْكُمْ"
            },
            {
                type: "narrative",
                text: "Dalam Bahasa Arab, ada dua ilmu utama yang seperti dua sisi mata uang: Nahwu dan Shorof.",
                speaker: "Ustadz",
                arabic: "النَّحْوُ وَ الصَّرْفُ"
            },
            {
                type: "interactive",
                text: "Coba perhatikan kata 'Muhammad' ini. Klik kata tersebut untuk melihat keajaiban Nahwu.",
                speaker: "Ustadz",
                arabic: "مُحَمَّدٌ",
                interaction: "click-word",
                target: "مُحَمَّدٌ",
                feedback: "Benar! Lihat huruf terakhirnya? Dhommah (un)!"
            },
            {
                type: "narrative",
                text: "Nahwu mengurus perubahan harakat AKHIR kata. Jika posisinya berubah, harakatnya berubah.",
                speaker: "Ustadz",
                arabic: "جَاءَ مُحَمَّدٌ"
            },
            {
                type: "interactive",
                text: "Sekarang, Muhammad menjadi objek. Klik pada kata Muhammad yang harakatnya berubah menjadi Fathah (an).",
                speaker: "Ustadz",
                arabic: "رَأَيْتُ مُحَمَّدًا",
                interaction: "click-word",
                target: "مُحَمَّدًا",
                feedback: "Tepat! Huruf Dal sekarang berharakat Fathah karena dia objek."
            },
            {
                type: "narrative",
                text: "Itulah Nahwu! Mengurus 'Ekor' kata. Sekarang, bagaimana dengan Shorof?",
                speaker: "Ustadz",
                arabic: "الصَّرْفُ"
            },
            {
                type: "interactive",
                text: "Shorof mengubah BENTUK kata. Dari 'Hamida' (Memuji), kita bisa buat kata 'Yang Terpuji'. Klik kata 'Ahmad'!",
                speaker: "Ustadz",
                arabic: "حَمِدَ -> أَحْمَدُ",
                interaction: "click-word",
                target: "أَحْمَدُ",
                feedback: "Pintar! Akar katanya sama (H-M-D), tapi bentuknya berubah. Itu Shorof."
            }
        ]
    },
    {
        id: 2,
        title: "Tiga Jenis Kata",
        description: "Isim, Fi'il, dan Harf",
        xpReward: 150,
        scenes: [
            {
                type: "intro",
                text: "Setiap kalimat dalam Al-Quran tersusun dari 3 jenis bata: Isim (Benda), Fi'il (Kerja), dan Harf (Huruf).",
                speaker: "Ustadz",
                arabic: "أَقْسَامُ الْكَلِمَةِ"
            },
            {
                type: "interactive",
                text: "Isim adalah nama benda atau orang. Coba temukan Isim (Masjid) dalam kalimat ini.",
                speaker: "Ustadz",
                arabic: "ذَهَبَ إِلَى الْمَسْجِدِ",
                interaction: "click-word",
                target: "الْمَسْجِدِ",
                feedback: "Benar! Al-Masjid adalah kata benda (Isim)."
            },
            {
                type: "interactive",
                text: "Fi'il adalah kata kerja. Mana kata yang menunjukkan aksi 'Pergi'?",
                speaker: "Ustadz",
                arabic: "ذَهَبَ زَيْدٌ",
                interaction: "click-word",
                target: "ذَهَبَ",
                feedback: "Shahih! Dzahaba artinya 'Telah pergi'."
            },
            {
                type: "interactive",
                text: "Terakhir, Harf. Kata kecil yang menyambungkan. Klik kata 'Di dalam' (Fii).",
                speaker: "Ustadz",
                arabic: "صَلَّى فِي الْمَسْجِدِ",
                interaction: "click-word",
                target: "فِي",
                feedback: "Mumtaz! Fii adalah Harf Jar."
            }
        ]
    },
    {
        id: 3,
        title: "Analisa Harakat",
        description: "Tanwin dan Alif Lam",
        xpReward: 200,
        scenes: [
            {
                type: "narrative",
                text: "Ada aturan besi dalam bahasa Arab: Tanwin dan Alif Lam (Al) adalah musuh abadi!",
                speaker: "Ustadz",
                arabic: "ال  vs  ـٌ"
            },
            {
                type: "interactive",
                text: "Lihat kata ini: 'Kitabun'. Jika kita tambahkan 'Al', manakah bentuk yang benar?",
                speaker: "Ustadz",
                arabic: "كِتَابٌ + ال = ؟",
                interaction: "choice",
                choices: ["الْكِتَابٌ", "الْكِتَابُ"],
                correctChoice: "الْكِتَابُ",
                feedback: "Benar! Tanwin harus pergi jika Al datang."
            },
            {
                type: "narrative",
                text: "Tanwin artinya 'Sebuah' (Umum/Nakirah). Alif Lam artinya 'Itu' (Khusus/Ma'rifah).",
                speaker: "Ustadz",
                arabic: "نَكِرَة  &  مَعْرِفَة"
            }
        ]
    },
    {
        id: 4,
        title: "Dua Pola Kalimat",
        description: "Jumlah Ismiyyah & Fi'liyyah",
        xpReward: 250,
        scenes: [
            {
                type: "intro",
                text: "Kalimat sempurna (Jumlah) ada dua model, tergantung kata depannya.",
                speaker: "Ustadz",
                arabic: "الْجُمْلَةُ"
            },
            {
                type: "interactive",
                text: "Jika diawali Isim, disebut Jumlah Ismiyyah. Klik kalimat yang diawali Isim (Zaid).",
                speaker: "Ustadz",
                arabic: "زَيْدٌ قَائِمٌ  |  قَامَ زَيْدٌ",
                interaction: "choice",
                choices: ["زَيْدٌ قَائِمٌ", "قَامَ زَيْدٌ"],
                correctChoice: "زَيْدٌ قَائِمٌ",
                feedback: "Bagus! Zaid (Orang) ada di depan, maka ini Jumlah Ismiyyah."
            },
            {
                type: "interactive",
                text: "Jika diawali Fi'il, disebut Jumlah Fi'liyyah. Klik kalimat yang diawali Fi'il (Telah berdiri).",
                speaker: "Ustadz",
                arabic: "زَيْدٌ قَائِمٌ  |  قَامَ زَيْدٌ",
                interaction: "choice",
                choices: ["زَيْدٌ قَائِمٌ", "قَامَ زَيْدٌ"],
                correctChoice: "قَامَ زَيْدٌ",
                feedback: "Tepat! Qoma (Berdiri) adalah kata kerja di depan."
            }
        ]
    },
    {
        id: 5,
        title: "Tujuh Bab Penting",
        description: "Fa'il, Maf'ul, dan Jar",
        xpReward: 300,
        scenes: [
            {
                type: "narrative",
                text: "Mari kita bedah peran kata (I'rab). Siapa Pelaku? Siapa Korban?",
                speaker: "Ustadz",
                arabic: "الْإِعْرَابُ"
            },
            {
                type: "interactive",
                text: "Fa'il adalah Pelaku. Dia selalu 'Marfu' (biasanya Dhommah). Klik Pelaku (Zaid)!",
                speaker: "Ustadz",
                arabic: "ضَرَبَ زَيْدٌ الْكَلْبَ",
                interaction: "click-word",
                target: "زَيْدٌ",
                feedback: "Benar! Zaidun berakhiran dhommah karena dia pelakunya."
            },
            {
                type: "interactive",
                text: "Maf'ul Bih adalah Objek. Dia selalu 'Manshub' (Fathah). Klik Objek (Anjing)!",
                speaker: "Ustadz",
                arabic: "ضَرَبَ زَيْدٌ الْكَلْبَ",
                interaction: "click-word",
                target: "الْكَلْبَ",
                feedback: "Kasihan anjingnya! Al-Kalba berakhiran fathah karena dia objek."
            },
            {
                type: "interactive",
                text: "Isim Jar adalah kata setelah huruf jar. Dia 'Majrur' (Kasrah). Klik kata 'Masjid'!",
                speaker: "Ustadz",
                arabic: "فِي الْمَسْجِدِ",
                interaction: "click-word",
                target: "الْمَسْجِدِ",
                feedback: "Sah! Al-Masjidi berakhiran kasrah karena ada 'Fii' sebelumnya."
            }
        ]
    },
    {
        id: 6,
        title: "Mengenal 3K",
        description: "Kata yang Mabni (Tetap)",
        xpReward: 350,
        scenes: [
            {
                type: "narrative",
                text: "Tidak semua kata bisa berubah harakatnya. Ada kelompok '3K' yang Mabni (Kebal Perubahan).",
                speaker: "Ustadz",
                arabic: "الْمَبْنِيُّ"
            },
            {
                type: "interactive",
                text: "1. Kata Ganti (Dhomir). Klik kata 'Dia' (Huwa).",
                speaker: "Ustadz",
                arabic: "هُوَ طَالِبٌ",
                interaction: "click-word",
                target: "هُوَ",
                feedback: "Benar! Huwa tidak akan pernah berubah menjadi Huwi atau Huwu."
            },
            {
                type: "interactive",
                text: "2. Kata Tunjuk (Isyarah). Klik kata 'Ini' (Hadza).",
                speaker: "Ustadz",
                arabic: "هَذَا كِتَابٌ",
                interaction: "click-word",
                target: "هَذَا",
                feedback: "Tepat! Hadza selalu berakhiran alif sukun."
            },
            {
                type: "interactive",
                text: "3. Kata Sambung (Maushul). Klik kata 'Yang' (Alladzi).",
                speaker: "Ustadz",
                arabic: "جَاءَ الَّذِيْ نَصَرَ",
                interaction: "click-word",
                target: "الَّذِيْ",
                feedback: "Sempurna! Kamu telah menguasai dasar-dasar ini."
            }
        ]
    }
];
