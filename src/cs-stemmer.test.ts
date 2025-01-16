// Most tests taken are from Sastrawi
// https://github.com/sastrawi/sastrawi/blob/master/tests/SastrawiTest/Morphology/Disambiguator/

import { describe, expect, test } from 'vitest'
import CSStemmer from './cs-stemmer'

const stemmer = new CSStemmer()
const rule = (title: string, rules?: [word: string, expected: string][]) => {
  if (!rules) {
    describe.todo(title)
    return
  }

  describe(title, () => {
    test.each(rules)(
      '%s -> %s',
      (word, expected) => expect(stemmer.stem(word)).toBe(expected)
    )
  })
}

rule('rule 1: berV -> ber-V | be-rV', [
  ['berapi', 'api'],
  ['berambut', 'rambut'],
])

rule('rule 2: berCAP -> ber-CAP, C!="r" and P!="er"', [
  ['bermain', 'main'],
  ['bertabur', 'tabur'],
])

rule('rule 3: berCAerV -> ber-CAerV, C!="r"', [
  ['berdaerah', 'daerah'],
])

rule('rule 4: belajar -> bel-ajar', [
  ['belajar', 'ajar'],
])

rule('rule 5: beC1erC -> be-C1erC, C1!={"r"|"l"}', [
  ['bekerja', 'kerja'],
  ['beternak', 'ternak'],
])

rule('rule 6: terV -> ter-V | te-rV', [
  ['terancam', 'ancam'],
  ['teracun', 'racun'],
])

rule('rule 7: terCP -> ter-CP, C!="r" and P!="er"', [
  ['tertangkap', 'tangkap'],
])

rule('rule 8: terCer -> ter-Cer, C!="r"', [
  ['terperuk', 'peruk'],
])

rule('rule 9: teC1erC2 -> te-C1erC2, C1!="r"', [
  ['teternak', 'ternak'],
  ['teterbang', 'terbang'],
])

rule('rule 10: me{l|r|w|y}V -> me-{l|r|w|y}V', [
  ['melihat', 'lihat'],
  ['meyakin', 'yakin'],
])

rule('rule 11: mem{b|f|v} -> mem-{b|f|v}', [
  ['membaca', 'baca'],
  ['memveto', 'veto'],
])

rule('rule 12: mempe -> mem-pe', [
  ['mempengaruh', 'pengaruh'],
])

rule('rule 13: mem{rV|V} -> me-m{rV|V} | me-p{rV|V}', [
  ['memasuk', 'masuk'],
  ['memakai', 'pakai'],
])

rule('rule 14: men{c|d|j|s|t|z} -> men-{c|d|j|s|t|z}', [
  ['mencantum', 'cantum'],
  ['menjemput', 'jemput'],
  ['mensyukuri', 'syukur'],
  ['mensyaratkan', 'syarat'],
  ['mentaati', 'taat'],
  ['menziarahi', 'ziarah'],
])

rule('rule 15: menV -> me-nV | me-tV', [
  ['menikmati', 'nikmat'],
  ['menulis', 'tulis'],
  ['menari', 'tari'],
])

rule('rule 16: meng{g|h|q|k} -> meng-{g|h|q|k}', [
  ['menggunakan', 'guna'],
  ['menghambat', 'hambat'],
  ['mengqasar', 'qasar'],
  ['mengkritik', 'kritik'],
])

rule('rule 17: mengV -> meng-V | meng-kV', [
  ['mengerat', 'erat'],
  ['mengira', 'kira'],
  ['mengecil', 'kecil'],
  ['mengecas', 'cas'],
  ['mengecat', 'cat'],
  ['mengerikan', 'ngeri'],
])

rule('rule 18: menyV -> meny-sV | me-nyV', [
  ['menyala', 'nyala'],
  ['menyapu', 'sapu'],
  ['menyikat', 'sikat'],
  ['menyanyi', 'nyanyi']
])

rule('rule 19: mempV -> mem-pV, V != "e"', [
  ['mempunyai', 'punya'],
  ['memproteksi', 'proteksi'],
])

rule('rule 20: pe{w|y}V -> pe-{w|y}V', [
  ['pewarna', 'warna'],
  ['peyoga', 'yoga'],
])

rule('rule 21: perV -> per-V | pe-rV', [
  ['peradilan', 'adil'],
  ['perusak', 'rusak'],
  ['perancang', 'rancang'],
])

rule('rule 22: perCAP -> per-CAP, C != "r", P != "er"', [
  ['pertahan', 'tahan'],
])

rule('rule 23: perCAerV -> per-CAerV, C != "r"', [
  ['perdaerah', 'daerah'],
])

rule('rule 24: pem{b|f|v} -> pem-{b|f|v}', [
  ['pembaruan', 'baru'],
  ['pemfokusan', 'fokus'],
  ['pemvaksinan', 'vaksin'],
])

rule('rule 25: pem{rV|V} -> pe-m{rV|V} | pe-p{rV|V}', [
  ['pemilik', 'milik'],
  ['pemilih', 'pilih'],
  ['pemukul', 'pukul'],
])

rule('rule 26: pen{c|d|j|z} -> pen-{c|d|j|z}', [
  ['pencari', 'cari'],
  ['pendaki', 'daki'],
  ['penjual', 'jual'],
])

rule('rule 27: penV -> pe-nV | pe-tV', [
  ['penilai', 'nilai'],
  ['penari', 'tari'],
  ['penerap', 'terap'],
  ['peninggalan', 'tinggal'],
  ['penolong', 'tolong'],
  ['penulis', 'tulis'],
])

rule('rule 28: peng{g|h|q} -> peng-{g|h|q|k}', [
  ['pengganti', 'ganti'],
  ['penghajar', 'hajar'],
  ['pengqasar', 'qasar'],
])

rule('rule 29: pengV -> peng-V | peng-kV', [
  ['pengalihan', 'alih'],
  ['pengikat', 'ikat'],
  ['pengawal', 'kawal'],
  ['penguat', 'kuat'],
  ['pengetahuan', 'tahu'],
  ['pengeblog', 'blog'],
])

rule('rule 30: penyV -> peny-sV', [
  ['penyanyi', 'nyanyi'],
  ['penyekat', 'sekat'],
  ['penyikat', 'sikat'],
  ['penyalut', 'salut'],
])

rule('rule 31: penlV -> pel-V, "pelajar" ? "ajar"', [
  ['pelajar', 'ajar'],
  ['pelayan', 'layan'],
  ['peledak', 'ledak'],
  ['pelupa', 'lupa']
])

rule('rule 32: peCP -> pe-CP, C != {r|w|y|l|m|n}, P != "er"', [
  ['petarung', 'tarung']
])

rule('rule 33: pe-C1erC2 -> per-C1erC2, C != {r|w|y|l|m|n}')
