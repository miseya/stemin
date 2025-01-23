import { distance } from 'fastest-levenshtein'
import formalSet from './dict/formal-set'
import informalMap from './dict/informal-map'
import CSStemmer from './cs-stemmer'

export default class MPStemmer {
  /**
   * Kamus kata dasar
   * @example
   * stemmer.words.has('halo')     // Cek apakah kata "halo" ada di kamus
   * stemmer.words.add('engga')    // Tambah kata "engga"
   * stemmer.words.delete('halo')  // Hapus kata "halo"
   */
  words: Set<string>
  /**
   * Kamus sinonim/perbaikan kata dalam format `[kata awal]: [kata akhir]`
   * @example
   * stemmer.synonyms.get('kalo')        // Ambil kata baku dari "kalo"
   * stemmer.synonyms.set('ga', 'tidak') // Tambah pasangan kata baru
   * stemmer.synonyms.delete('kalo')     // Hapus kata "kalo"
   */
  synonyms: Map<string, string>

  private memo: Map<string, string>
  private csstemmer: CSStemmer

  /**
  * @param [words=formalSet] Kamus kata dasar
  * @param [synonyms=informalMap] Kamus kata ganti/sinonim/perbaikan kata
  */
  constructor(words: string[] | Set<string> = formalSet, synonyms: Map<string, string> = informalMap) {
    this.words = Array.isArray(words) ? new Set(words) : words
    this.synonyms = synonyms
    this.memo = new Map()
    this.csstemmer = new CSStemmer(this.words)

    // filtering kata ambigu dari kamus bawaan
    if (this.words === formalSet) {
      [
        'adap', 'kukur', 'ketemu', 'kesohor', 'soba', 'urang', 'urita',
        'gera',
      ]
        .forEach((word) => formalSet.delete(word))
    }
  }

  private setMemo(word: string, stem: string): string {
    this.memo.set(word, stem)
    return stem
  }

  /**
   * Cek apakah kata memiliki afiks. `m|n|ng|ny|ke-V-i|in|an`
   */
  checkAffixed(word: string): boolean {
    return /^(m|n|ng|ny|ke)|(i|in|an)$/.test(word)
  }

  /**
   * Perbaiki prefiks kata tidak baku agar menjadi baku
   * @example
   * nyapa  -> menyapa
   * ngecas -> cas
   * ngirit -> mengirit
   * kesini -> sini
   * gini   -> begitu
   */
  fixPrefix(word: string): string {
    let res = word

    if (/^(m|n|ng|ny)/.test(res)) {
      if (res.startsWith('nge') && res[3] !== 'm' && res[3] !== 'n') {
        res = res.slice(3)
      } else {
        res = 'me' + res
      }
    } else if (res.startsWith('ke')) {
      res = res.slice(2)
    } else if (['gini', 'gitu'].includes(res)) {
      res = 'be' + res
    }

    return res
  }

  /**
   * Perbaiki sufiks kata tidak baku
   * @example
   * lengkapin -> lengkap
   * temenin   -> temen
   */
  fixSuffix(word: string): string {
    let res = word

    if (res.endsWith('in')) {
      return res.slice(0, -2)
    }

    return res
  }

  /**
   * Ubah kata tidak baku menjadi kata baku
   * @example
   * asep   -> asap
   * pengep -> pengap
   */
  standardify(word: string): string {
    let res = word

    if (res.endsWith('p') && res.at(-2) === 'e') {
      res = res.slice(0, -2) + 'a' + res.slice(-1)
    }

    return res
  }

  /**
   * Perbaiki kata tidak baku menjadi kata baku (naif)
   * @example
   * sebel  -> sebal
   * nyesel -> nyesal
   */
  ensureStandardRoot(word: string): string {
    let res = word

    if (!/a|i|u|e|o/.test(res.slice(-1)) && res.at(-2) === 'e') {
      const standard = res.slice(0, -2) + 'a' + res.slice(-1)
      if (this.words.has(standard)) res = standard
    }

    return res
  }

  /**
   * Stemming (hapus imbuhan dari kata) untuk mendapatkan kata dasar
   * @param word Kata yang akan di-stem
   * @param [fuzzy=false] Gunakan Levenshtein distance untuk mendapatkan kata terdekat?
   */
  stem(word: string, fuzzy = false): string {
    word = word.toLowerCase()
    let res = word

    // layer 1: filtering awal, mencari sinonim, memo, kamus, atau terlalu pendek
    if (this.synonyms.has(word)) return this.synonyms.get(word) as string
    if (this.memo.has(word)) return this.memo.get(word) as string
    if (this.words.has(word)) return word
    if (word.length <= 3) return word

    // layer 2: lakukan stemming
    let stem = this.csstemmer.stem(res)
    if (this.words.has(stem)) return this.setMemo(word, stem)

    // layer 3: cek kata tidak standar terafiksasi dan bakukan jika mungkin
    let maybeNonstandard = this.checkAffixed(res)

    if (maybeNonstandard) {
      res = this.fixSuffix(res)
      if (this.words.has(res)) return this.setMemo(word, res)

      res = this.fixPrefix(res)
      if (this.words.has(res)) return this.setMemo(word, res)
    }

    // layer 4: lakukan stemming standar karena sudah dibakukan
    res = this.standardify(res)
    res = this.csstemmer.stem(res)

    // layer 5: pastikan akar kata baku
    res = this.ensureStandardRoot(res)

    // layer 6: fuzzy search jika masih tidak cocok
    if (!this.words.has(res) && !this.synonyms.has(res) && maybeNonstandard && fuzzy) {
      let score = Infinity

      for (const word of this.words) {
        let dist = distance(res, word)

        if (dist < score) {
          score = dist
          res = word
        }
      }
    }

    // cek jika kata ada di kamus atau sinonim
    res = this.words.has(res)
      ? res : this.synonyms.has(res)
        ? this.synonyms.get(res) as string : word

    return this.setMemo(word, res)
  }
}
