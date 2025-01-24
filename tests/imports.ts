// Most tests taken are from Sastrawi
// https://github.com/sastrawi/sastrawi/blob/master/tests/SastrawiTest/Morphology/Disambiguator/
export const rules = {
  'rule 1: berV -> ber-V | be-rV': [
    ['berapi', 'api'],
    ['berambut', 'rambut'],
  ],

  'rule 2: berCAP -> ber-CAP, C!="r" and P!="er"': [
    ['bermain', 'main'],
    ['bertabur', 'tabur'],
  ],

  'rule 3: berCAerV -> ber-CAerV, C!="r"': [
    ['berdaerah', 'daerah'],
  ],

  'rule 4: belajar -> bel-ajar': [
    ['belajar', 'ajar'],
  ],

  'rule 5: beC1erC -> be-C1erC, C1!={"r"|"l"}': [
    ['bekerja', 'kerja'],
    ['beternak', 'ternak'],
  ],

  'rule 6: terV -> ter-V | te-rV': [
    ['terancam', 'ancam'],
    ['teracun', 'racun'],
  ],

  'rule 7: terCP -> ter-CP, C!="r" and P!="er"': [
    ['tertangkap', 'tangkap'],
  ],

  'rule 8: terCer -> ter-Cer, C!="r"': [
    ['terperuk', 'peruk'],
  ],

  'rule 9: teC1erC2 -> te-C1erC2, C1!="r"': [
    ['teternak', 'ternak'],
    ['teterbang', 'terbang'],
  ],

  'rule 10: me{l|r|w|y}V -> me-{l|r|w|y}V': [
    ['melihat', 'lihat'],
    ['meyakin', 'yakin'],
  ],

  'rule 11: mem{b|f|v} -> mem-{b|f|v}': [
    ['membaca', 'baca'],
    ['memveto', 'veto'],
  ],

  'rule 12: mempe -> mem-pe': [
    ['mempengaruh', 'pengaruh'],
  ],

  'rule 13: mem{rV|V} -> me-m{rV|V} | me-p{rV|V}': [
    ['memasuk', 'masuk'],
    ['memakai', 'pakai'],
  ],

  'rule 14: men{c|d|j|s|t|z} -> men-{c|d|j|s|t|z}': [
    ['mencantum', 'cantum'],
    ['menjemput', 'jemput'],
    ['mensyukuri', 'syukur'],
    ['mensyaratkan', 'syarat'],
    ['mentaati', 'taat'],
    ['menziarahi', 'ziarah'],
  ],

  'rule 15: menV -> me-nV | me-tV': [
    ['menikmati', 'nikmat'],
    ['menulis', 'tulis'],
    ['menari', 'tari'],
  ],

  'rule 16: meng{g|h|q|k} -> meng-{g|h|q|k}': [
    ['menggunakan', 'guna'],
    ['menghambat', 'hambat'],
    ['mengqasar', 'qasar'],
    ['mengkritik', 'kritik'],
  ],

  'rule 17: mengV -> meng-V | meng-kV': [
    ['mengerat', 'erat'],
    ['mengokang', 'kokang'],
    ['mengecil', 'kecil'],
    ['mengecas', 'cas'],
    ['mengecat', 'cat'],
    ['mengerikan', 'ngeri'],
  ],

  'rule 18: menyV -> meny-sV | me-nyV': [
    ['menyala', 'nyala'],
    ['menyapu', 'sapu'],
    ['menyikat', 'sikat'],
    ['menyanyi', 'nyanyi']
  ],

  'rule 19: mempV -> mem-pV, V != "e"': [
    ['mempunyai', 'punya'],
    ['memproteksi', 'proteksi'],
  ],

  'rule 20: pe{w|y}V -> pe-{w|y}V': [
    ['pewarna', 'warna'],
    ['peyoga', 'yoga'],
  ],

  'rule 21: perV -> per-V | pe-rV': [
    ['peradilan', 'adil'],
    ['perusak', 'rusak'],
    ['perancang', 'rancang'],
  ],

  'rule 22: perCAP -> per-CAP, C != "r", P != "er"': [
    ['pertahan', 'tahan'],
  ],

  'rule 23: perCAerV -> per-CAerV, C != "r"': [
    ['perdaerah', 'daerah'],
  ],

  'rule 24: pem{b|f|v} -> pem-{b|f|v}': [
    ['pembaruan', 'baru'],
    ['pemfokusan', 'fokus'],
    ['pemvaksinan', 'vaksin'],
  ],

  'rule 25: pem{rV|V} -> pe-m{rV|V} | pe-p{rV|V}': [
    ['pemilik', 'milik'],
    ['pemilih', 'pilih'],
    ['pemukul', 'pukul'],
  ],

  'rule 26: pen{c|d|j|z} -> pen-{c|d|j|z}': [
    ['pencari', 'cari'],
    ['pendaki', 'daki'],
    ['penjual', 'jual'],
  ],

  'rule 27: penV -> pe-nV | pe-tV': [
    ['penilai', 'nilai'],
    ['penari', 'tari'],
    ['penerap', 'terap'],
    ['peninggalan', 'tinggal'],
    ['penolong', 'tolong'],
    ['penulis', 'tulis'],
  ],

  'rule 28: peng{g|h|q} -> peng-{g|h|q|k}': [
    ['pengganti', 'ganti'],
    ['penghajar', 'hajar'],
    ['pengqasar', 'qasar'],
  ],

  'rule 29: pengV -> peng-V | peng-kV': [
    ['pengikat', 'ikat'],
    ['pengait', 'kait'],
    ['penguat', 'kuat'],
    ['pengetahuan', 'tahu'],
    ['pengeblog', 'blog'],
  ],

  'rule 30: penyV -> peny-sV': [
    ['penyanyi', 'nyanyi'],
    ['penyekat', 'sekat'],
    ['penyikat', 'sikat'],
    ['penyalut', 'salut'],
  ],

  'rule 31: penlV -> pel-V, "pelajar" ? "ajar"': [
    ['pelajar', 'ajar'],
    ['pelayan', 'layan'],
    ['peledak', 'ledak'],
    ['pelupa', 'lupa']
  ],

  'rule 32: peCP -> pe-CP, C != {r|w|y|l|m|n}, P != "er"': [
    ['petarung', 'tarung']
  ],

  'rule 33: pe-C1erC2 -> per-C1erC2, C != {r|w|y|l|m|n}': [
    ['terpercaya', 'percaya']
  ]
}

// https://github.com/ariaghora/mpstemmer/blob/master/simplebenchmark.py
export const informalWords = [
  ["nerjang", "terjang"],
  ["nuduh", "tuduh"],
  ["nerima", "terima"],
  ["negur", "tegur"],
  ["mukul", "pukul"],
  ["mimpin", "pimpin"],
  ["nyoba", "coba"],
  ["nyiram", "siram"],
  ["nyuruh", "suruh"],
  ["nyimpen", "simpan"],
  ["nyebrang", "seberang"],
  ["nganggep", "anggap"],
  ["ngamuk", "amuk"],
  ["ngambil", "ambil"],
  ["ngebuka", "buka"],
  ["ngebantu", "bantu"],
  ["ngelepas", "lepas"],
  ["kebayang", "bayang"],
  ["keinjek", "injak"],
  ["kekabul", "kabul"],
  ["kepergok", "pergok"],
  ["ketipu", "tipu"],
  ["keulang", "ulang"],
  ["kewujud", "wujud"],
  ["critain", "cerita"],
  ["betulin", "betul"],
  ["manjain", "manja"],
  ["gangguin", "ganggu"],
  ["gantian", "ganti"],
  ["ikutan", "ikut"],
  ["musuhan", "musuh"],
  ["sabunan", "sabun"],
  ["temenan", "teman"],
  ["tukeran", "tukar"],
  ["nanyain", "tanya"],
  ["nunjukin", "tunjuk"],
  ["mentingin", "penting"],
  ["megangin", "pegang"],
  ["nyelametin", "selamat"],
  ["nyempetin", "sempat"],
  ["ngorbanin", "korban"],
  ["ngadepin", "hadap"],
  ["ngebuktiin", "bukti"],
  ["ngewarnain", "warna"],
  ["kedengeran", "dengar"],
  ["ketemuan", "temu"],
  ["beneran", "benar"],
  ["ginian", "begini"],
  ["kawinan", "kawin"],
  ["mainan", "main"],
  ["parkiran", "parkir"],
  ["duluan", "dahulu"],
  ["gendutan", "gendut"],
  ["karatan", "karat"],
  ["palingan", "paling"],
  ["sabaran", "sabar"],
  ["kebagusan", "bagus"],
  ["sanaan", "sana"],
  ["cepetan", "cepat"],
  ["sepagian", "pagi"]
]

// https://github.com/ariaghora/mpstemmer/blob/master/benchmark_dataset/indoprogress_1.txt
export const benchmarkDataset = [
  "SANTA Cruz California berbeda hari itu. Warganya tampak bahagia. Mereka yang sebelumnya saling cuek mendadak jadi ramah dan saling sapa. Bahkan ada yang turun ke jalan berkonvoi mengekspresikan kegembiraannya. Mereka jadi begitu karena jagoannya menang. Ya, Joseph Robinette Biden Jr. akhirnya mengungguli Donald John Trump dalam Pemilihan Presiden Amerika Serikat. Santa Cruz sendiri dikenal sebagai wilayah pendukung Demokrat, yang tak lain partainya Biden.",
  "Saya sudah tinggal lima tahun di kota pantai ini sebagai imigran. Santa Cruz, kota dengan penduduk mayoritas kulit putih, mendaku welcome terhadap imigran. Klaim tersebut nampak pada poster-poster di toko, restoran dan bar di sekitar downtown yang bertuliskan “We welcome all races, religions, countries of origin, sexual orientations, genders and abilities.” Setiap melihat poster-poster itu saya memang meresponsnya dengan bergumam sinis, “yeah, you are welcome no matter who you are, as long as you can paid.” Namun setidaknya pernyataan bahwa kota ini ramah terhadap pendatang melegakan hati.",
  "Namun, keramahan kota ini mulai tercela di masa pemerintahan Trump. Pernah di tembok kampus tempat istri saya kuliah muncul pamflet dari kelompok supremasi kulit putih yang isinya mengutuk kehadiran imigran. Kejadian ini berlangsung berkali-kali. Yang paling menghebohkan adalah kemunculan tali simpul untuk menggantung leher manusia di plang penanda jalan salah satu sudut kota. Tali lynching adalah simbol pembantaian kulit hitam oleh masyarakat kulit putih dengan cara menggantung leher orang kulit hitam di hadapan umum.",
  "Kekerasan terhadap kaum kulit hitam ini marak terjadi menjelang berakhirnya Perang Sipil (1861-1865). Berakhirnya perang itu diiringi dengan wacana penghapusan perbudakan dan pemberian hak kepada kaum kulit hitam. Tentu saja tidak semua orang kulit putih menyukainya. Kebencian rasial ini kemudian menyasar leher orang kulit hitam untuk digantung. Aksi menggantung leher ini masif terjadi khususnya di negara bagian selatan.",
  "Oleh karena itu, jujur, bagi saya berita kekalahan Trump adalah kabar menggembirakan. Sebab, semjak Trump menjadi presiden, rasisme tidak lagi ditabukan tampil di ruang publik. Kebencian simbolik yang hadir terang-terangan di Santa Cruz, begitu juga tempat lainnya pada masa pemerintahan Trump, adalah penanda bahwa rasisme masihlah mengakar kuat di Amerika. Sosok rasis seperti Trump mewakili banyak orang di negeri ini.",
  "Meski demikian, kita tidak boleh cepat-cepat berasumsi bahwa pendukung Biden dari kalangan kulit putih bebas dari cara berpikir rasialis.",
  "Dugaan itu muncul ketika saya menguping pembicaraan dua pelanggan tempo hari. Sembari menunggu sushi yang saya buat, dua pelanggan kulit putih ini bercakap-cakap tentang betapa senangnya mereka mendengar kekalahan Trump. Bagi mereka, Trump dan pendukungnya memperkeruh hubungan kaum kulit putih dan kulit berwarna. Semua manusia adalah sama, tidak ada ras yang lebih istimewa dibanding ras lain. Begitulah kesimpulan pembicaraan singkat mereka.",
  "Otak saya kemudian berputar merenungkan pembicaraan yang terkesan bijak itu. Saya pikir mereka termasuk kelompok color blindness, yaitu tidak melihat atau meragukan, bahkan menyangkal fakta bahwa ada ras tertentu mendapatkan posisi istimewa daripada ras lainnya. Bagi mereka yang ‘buta warna’ itu, semua manusia posisinya setara. Oleh sebab itu, mereka tidak sepakat dengan kelompok white supremacy pendukung Trump karena menempatkan kaum kulit putih sebagai sentrum, posisi teristimewa. Bagi mereka, tidak ada hierarki semacam itu.",
  "Pandangan para ‘buta warna’ ini sebenarnya melenceng dari perlawanan terhadap rasisme sistematik yang didengungkan gerakan Black Lives Matter (BLM). Rasisme itu terinstitusi dan dinormalisasi; tidak ada kesetaraan. Pengakuan terhadap rasisme adalah wajib jika ingin menolak dan melawannya, bukan dengan meragukan atau menyangkalnya seolah dia tidak ada. Justru penyangkalan adalah bagian dari dukungan terhadap rasisme.",
  "Biasanya mereka yang ‘buta warna’ ini menggunakan argumen ‘kelas’: bahwa pada dasarnya yang ada adalah pengistimewaan kelas bukan ras. Mereka yang berpunya diperlakukan lebih istimewa daripada mereka yang tak punya. Hal ini berlaku bagi siapa saja, tidak mengenal ras apa pun. Ya benar, tapi hal itu tidaklah mutlak. Jika Anda berkulit hitam jalan-jalan di ruang publik, rasa waswas akan berkecamuk di dalam diri saat berpapasan dengan polisi meskipun Anda dari kalangan berpunya. Kekayaan yang Anda punya tak mampu menjamin muncul kepercayaan diri bahwa Anda tidak dicurigai aparat, dan Anda bebas dari prasangka rasis.",
  "Pernahkah anda mendengar kasus kematian Breonna Taylor? Perempuan kulit hitam asal Kentucky ini ditembak delapan kali oleh polisi di apartemennya sendiri. Tidak peduli privasi si penghuni, polisi tiba-tiba saja masuk ke apartemen perempuan malang ini. Dia disangka sebagai pelaku kriminal, padahal tidak ada bukti.",
  "Breona bukan termasuk dalam kategori orang miskin. Dia pekerja medis, gajinya cukup untuk hidup, menabung dan rekreasi. Dia juga punya uang untuk menempati apartemen. Karena dia kulit hitam, maka kekuatan ekonomi yang dia miliki sebagai modal dia mengakses ‘privasi’ tidak berfungsi sepenuhnya. Prasangka rasis yang tertanam di kepala polisi membuat mereka berhak masuk ke ruang privat tanpa izin meski tanpa bukti kuat, bahkan mencabut nyawanya.",
  "Prasangka rasis yang menyudutkan kelompok kulit berwarna ini terus muncul dan itu membuat mereka selalu merasa dicurigai.",
  "Kaum imigran juga mengalami perasaan semacam itu. Mereka mengalami perasaan inferior di hadapan kaum kulit putih. Saya merasakannya sendiri, begitu juga buruh migran yang saya ajak kerja di dapur restoran. Kami, para buruh migran, merasa tidak nyaman memilih lagu yang kami suka jika para pekerja kulit putih bekerja bersama kami, padahal memilih lagu adalah ‘hak’ buruh dapur secara bergiliran.",
  "Pemilik restoran di Amerika pada umumnya menyediakan pengeras suara di dapur dan membiarkan para pegawainya memutar lagu yang mereka suka agar lebih semangat dalam bekerja. Setiap buruh migran yang mendapatkan giliran memilih lagu seringkali tidak menggunakan haknya dan memberikannya ke buruh kulit putih. Seandainya buruh migran memilih lagu, maka mereka memilih lagu yang dibayangkan disukai oleh pekerja lainnya. Biasanya yang mereka pilih adalah lagu-lagu Top 40. Ada perasaan canggung jika selera musik mereka merusak kenyamanan para buruh dapur.",
  "Sementara buruh kulit putih tidak ambil pusing saat mendapatkan giliran memutar lagu.  Pekerja kulit putih lebih nyaman menggunakan haknya daripada pekerja migran. Mereka tidak peduli lagunya disukai atau tidak oleh khalayak, sekalipun pada saat itu sebagian besar yang bekerja adalah buruh migran.",
  "Kerelaan buruh migran mengabaikan hak ini tidak ada hubungannya dengan relasi kuasa di tempat bekerja. Pekerja kulit putih secara formal bukanlah bos karena mereka bukan pemilik alat produksi. Mereka adalah buruh yang digaji sama dengan buruh migran. Apa yang dikerjakan pun sama.",
  "Kejadian serupa juga nampak pada rapat evaluasi perusahaan. Hak menyatakan pendapat lebih sering diekspresikan oleh buruh kulit putih. Buruh migran memilih diam. Bukan semata karena kesulitan berbahasa, namun karena sungkan menjadi sorotan jika pendapatnya merusak harmoni perusahaan.",
  "Maka dari itu sangat salah kaprah kalau kesuksesan demokrasi hanya diukur dari adanya kebebasan untuk menyatakan pendapat sebab tidak semua orang berada dalam kondisi setara untuk melaksanakan haknya berpendapat.",
  "Dominasi kulit putih beroperasi di ruang perasaan dan perasaan seringkali dianggap ruang yang personal dan abstrak. Perasaan ini, kalau tidak stabil, bakal dianggap sebagai gangguan psikologis yang bisa berujung pada kategori gangguan mental.",
  "Ketika perasaan-perasaan tidak nyaman ini diterjemahkan sebagai ketidakstabilan mental, maka rasisme menjadi kabur. Ia dianggap masalah medis. Obatnya adalah terapi atau mengonsumsi pil penenang. Problemnya dianggap ada pada mental si penderita yang terganggu, bukan pada rasisme itu sendiri.",
  "Orang kulit putih tidak mempunyai problem perasan macam itu. Situasi sosial yang mengistimewakan mereka membuat tubuhnya bebas dari perasaan tertekan dan bebas dari rasa canggung untuk mengekspresikan diri. Maka dari itu istilah ‘kita semuanya sama’ sebagai alasan menolak ideologi supremasi kulit putih adalah rancu.",
  "Alasan ‘dominasi kelas’ sebagai dasar untuk meragukan konsep ‘dominasi ras’ juga problematis karena membuat rasisme seolah ilusi. Pengutamaan dominasi kelas tidak akan mampu menjelaskan bahwa kekayaan tidaklah mutlak menjamin kaum kulit berwarna mendapat perlakuan istimewa, bebas dari sergapan prasangka dan bebas dari perasaan tidak nyaman sebagai kulit berwarna.",
  "Karena di Amerika rasisme begitu sistematik, maka sangat salah kaprah menempatkan perlawanan BLM terhadap rasisme sebagai konflik horizontal ala konflik SARA di Indonesia. Menganggapnya sebagai konflik ala SARA malah menyangkal dominasi terstruktur yang memberikan keistimewaan kepada kaum kulit putih. BLM melawan hegemoni yang memposisikan kulit putih sebagai kaum yang dominan dan istimewa. Perlawanan ini bergerak vertikal, menyasar ke atas.",
  "Ya, kadang rasisme sulit dimengerti bagi mereka yang tak pernah merasakannya. Tidak merasakan membuat mereka menyimpulkan rasisme tidak ada, sama seperti ketidakpercayaan sebagian orang terhadap Corona.",
]
