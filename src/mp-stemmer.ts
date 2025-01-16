import formalSet from './dict/formal-set'
import informalMap from './dict/informal-map'
import CSStemmer from './cs-stemmer'

export default class MPStemmer {
  words: Set<string>
  synonyms: Map<string, string>
  memo: Map<string, string>
  csstemmer: CSStemmer

  constructor(words: Set<string> = formalSet, synonyms: Map<string, string> = informalMap) {
    this.words = words
    this.synonyms = synonyms
    this.memo = new Map()
    this.csstemmer = new CSStemmer(this.words)
  }

  isInDict(word: string): boolean {
    return this.words.has(word)
  }

  setMemo(word: string, stem: string): string {
    this.memo.set(word, stem)
    return stem
  }

  checkAffixed(word: string): boolean {
    return /^(m|n|ng|ny|ke)|(i|in|an)$/.test(word)
  }

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
    } else if (/gini|gitu/.test(res)) {
      res = 'be' + res
    }

    return res
  }

  fixSuffix(word: string): string {
    let res = word

    if (res.endsWith('in')) {
      return res.slice(0, -2)
    }

    return res
  }

  standardify(word: string): string {
    let res = word

    if (res.endsWith('p') && res.at(-2) === 'e') {
      res = res.slice(0, -2) + 'a' + res.slice(-2)
    }

    return res
  }

  ensureStandardRoot(word: string): string {
    let res = word

    if (!/a|i|u|e|o/.test(res.slice(-1)) && res.at(-2) === 'e') {
      const standard = res.slice(0, -2) + 'a' + res.slice(-2)
      if (this.isInDict(standard)) res = standard
    }

    return res
  }

  stem(word: string): string {
    word = word.toLowerCase()
    let res = word

    // layer 1: filtering awal, mencari sinonim, memo, kamus, atau terlalu pendek
    if (this.synonyms.has(word)) return this.synonyms.get(word) as string
    if (this.memo.has(word)) return this.memo.get(word) as string
    if (this.words.has(word)) return word
    if (word.length <= 3) return word

    // layer 2: lakukan stemming
    let stem = this.csstemmer.stem(res)

    if (this.isInDict(stem)) return this.setMemo(word, stem)

    // layer 3: cek kata tidak standar terafiksasi dan bakukan jika mungkin
    let maybeNonstandard = this.checkAffixed(res)

    if (maybeNonstandard) {
      res = this.fixSuffix(res)
      if (this.isInDict(stem)) return this.setMemo(word, stem)

      res = this.fixPrefix(res)
      if (this.isInDict(stem)) return this.setMemo(word, stem)
    }

    // layer 4: lakukan stemming standar karena sudah dibakukan
    res = this.standardify(res)
    res = this.csstemmer.stem(res)

    // layer 5: pastikan akar kata baku
    res = this.ensureStandardRoot(res)

    // layer 6: fuzzy search jika masih tidak cocok
    if (maybeNonstandard) {
      // TODO
    }

    this.setMemo(word, res)

    return this.words.has(res) ? res : word
  }
}
