# stemin

[![Test Status](https://github.com/miseya/stemin/actions/workflows/test.yml/badge.svg)](https://github.com/miseya/stemin/actions/workflows/test.yml)
[![Release Status](https://github.com/miseya/stemin/actions/workflows/release.yml/badge.svg)](https://github.com/miseya/stemin/actions/workflows/release.yml)
[![NPM Version](https://img.shields.io/npm/v/stemin)](https://www.npmjs.com/package/stemin)

> *stem* + in(donesian)

JavaScript library for stemming Indonesian words, based heavily on [mpstemmer](https://github.com/ariaghora/mpstemmer).

`stemin` memberikan dukungan untuk mengubah kata tidak baku yang berimbuhan, lihat [penggunaan](#penggunaan) untuk contoh lebih lengkap, atau [coba sekarang](https://miseya.github.io/stemin)!

## Instalasi

### Node.js

```sh
npm install stemin
```

```ts
import { MPStemmer } from 'stemin'      // ES Module

const { MPStemmer } = require('stemin') // CommonJS
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/stemin"></script>
<script>
const { MPStemmer } = window.stemin
</script>
```

## Penggunaan

```ts
const stemmer = new MPStemmer()

stemmer.stem('ketersinggungan') // singgung
stemmer.stem('ngebesarin') // besar

// menambahkan kata dasar
stemmer.words.add('naon')
stemmer.stem('kunaon') // naon

// menambahkan kata ganti atau sinonim
stemmer.synonyms.set('santuy', 'santai')
stemmer.stem('nyantuy') // santai
```

## Perbandingan

Fitur utama dari `stemin` adalah kecepatan dan akurasi yang lebih baik dibandingkan dengan `sastrawijs`, dukungan untuk stemming kata non standar (tidak baku/gaul), dan *fuzzy search* menggunakan Levenshtein distance.

### Testing

Berdasarkan hasil pengujian, disimpulkan bahwa `stemin` lebih akurat dalam melakukan stemming. Walaupun menggunakan kamus yang sama, `sastrawijs` tidak dapat memenuhi beberapa aturan yang ada.

<details>
    <summary>Hasil pengujian</summary>

```
 ❯ tests/sastrawijs.test.ts (86 tests | 11 failed) 48ms
   × rule 1: berV -> ber-V | be-rV > berapi -> api 11ms
     → expected 'rap' to be 'api' // Object.is equality
   × rule 15: menV -> me-nV | me-tV > menari -> tari 1ms
     → expected 'ari' to be 'tari' // Object.is equality
   × rule 17: mengV -> meng-V | meng-kV > mengerat -> erat 1ms
     → expected 'rat' to be 'erat' // Object.is equality
   × rule 17: mengV -> meng-V | meng-kV > mengecil -> kecil 2ms
     → expected 'mengecil' to be 'kecil' // Object.is equality
   × rule 17: mengV -> meng-V | meng-kV > mengerikan -> ngeri 3ms
     → expected 'mengerikan' to be 'ngeri' // Object.is equality
   × rule 18: menyV -> meny-sV | me-nyV > menyapu -> sapu 1ms
     → expected 'menyapu' to be 'sapu' // Object.is equality
   × rule 21: perV -> per-V | pe-rV > perusak -> rusak 1ms
     → expected 'usak' to be 'rusak' // Object.is equality
   × rule 21: perV -> per-V | pe-rV > perancang -> rancang 1ms
     → expected 'ancang' to be 'rancang' // Object.is equality
   × rule 27: penV -> pe-nV | pe-tV > penilai -> nilai 1ms
     → expected 'ilai' to be 'nilai' // Object.is equality
   × rule 27: penV -> pe-nV | pe-tV > penari -> tari 1ms
     → expected 'ari' to be 'tari' // Object.is equality
   × rule 30: penyV -> peny-sV > penyikat -> sikat 1ms
     → expected 'ikat' to be 'sikat' // Object.is equality
 ✓ tests/cs-stemmer.test.ts (86 tests) 30ms
```

</details>

### Benchmark

Secara performa, proses *confix stripping* dari `stemin` lebih unggul dibandingkan dengan [`sastrawijs`](https://github.com/damzaky/sastrawijs/commit/635b38d2ed16e74a6b2c7927b24495cfdfc763fc) hingga >15x lipat.
Hal ini dikarenakan `stemin` menggunakan data struktur yang sesuai (Set dan Map) untuk menyimpan sekitar ~29,933 kata dasar dan ~1,495 pasangan kata non standar.

<details>
    <summary>Hasil benchmark</summary>

```
 ✓ tests/stemmer.bench.ts (4) 3465ms
     name                       hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · sastrawijs             105.27   7.9020  15.0041   9.4994  10.0683  15.0041  15.0041  15.0041  ±5.24%       53
   · cs-stemmer           1,661.68   0.5688   1.5568   0.6018   0.6069   0.9038   1.4066   1.5568  ±0.97%      831   fastest
   · mp-stemmer           1,280.46   0.7321   1.9259   0.7810   0.7494   1.5363   1.6240   1.9259  ±1.37%      641
   · mp-stemmer w/ fuzzy   10.7277  90.6340  97.0473  93.2167  94.6084  97.0473  97.0473  97.0473  ±1.76%       10   slowest

 BENCH  Summary

  cs-stemmer - tests/stemmer.bench.ts
    1.30x faster than mp-stemmer
    15.79x faster than sastrawijs
    154.90x faster than mp-stemmer w/ fuzzy
```

</details>

## Referensi

- Adriani, M., Asian, J., Nazief, B., Tahaghoghi, S. M., & Williams, H. E. (2007). Stemming Indonesian: A confix-stripping approach. *ACM Transactions on Asian Language Information Processing (TALIP), 6*(4), 1-33.
- Arifin, A. Z., Mahendra, I. P. A. K., & Ciptaningtyas, H. T. (2009, April). Enhanced confix stripping stemmer and ants algorithm for classifying news document in indonesian language. In *The International Conference on Information & Communication Technology and Systems* (Vol. 5, pp. 149-158).
- Librian, A. (2014). Sastrawi: High quality stemmer library for Indonesian Language (Bahasa). *GitHub*. https://github.com/sastrawi/sastrawi
- Prabono, A. G. (2020). Mpstemmer: a multi-phase stemmer for standard and nonstandard Indonesian words. *GitHub*. https://github.com/ariaghora/mpstemmer
- Zaky, D. (2017). SastrawiJs: Indonesian language stemmer Javascript port of PHP Sastrawi project. *GitHub*. https://github.com/damzaky/sastrawijs

## Lisensi

Stemin didistribusikan di bawah Lisensi MIT. Kamus kata dasar diambil dari sastrawi & kateglo dengan lisensi [CC-BY-NC-SA 3.0](https://github.com/ivanlanin/kateglo#lisensi-isi).
