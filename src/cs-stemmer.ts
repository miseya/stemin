import formalSet from './dict/formal-set'

export default class CSStemmer {
  words: Set<string>

  constructor(words: Set<string> = formalSet) {
    this.words = words
  }

  isVowel(c: string): boolean {
    return 'aiueo'.includes(c)
  }

  isConsonant(c: string): boolean {
    return !this.isVowel(c)
  }

  isInDict(word: string): boolean {
    return this.words.has(word)
  }

  removeInflectionalSuffixes(word: string): string {
    let res = word

    if (this.isInDict(res) || res.length <= 5) {
      return res
    }

    if (['kah', 'lah', 'tah', 'pun', 'nya'].includes(res.slice(-3))) {
      res = this.removeInflectionalSuffixes(res.slice(0, -3))
    }

    if (['ku', 'mu'].includes(res.slice(-2))) {
      res = res.slice(0, -2)
    }

    return res
  }

  removeDerivationalSuffix(word: string): string {
    let res = word

    if (this.isInDict(res) || res.length <= 5) {
      return res
    }

    if (res.endsWith('i')) {
      res = word.slice(0, -1)
    } else if (res.endsWith('kan')) {
      res = word.slice(0, -3)
    } else if (res.endsWith('an')) {
      res = word.slice(0, -2)
    }

    return res
  }

  removePrefixes(word: string, sliceLength: number = 0): string {
    let res = word.slice(sliceLength)

    if (this.isInDict(res) || res.length <= 5) {
      return res
    }

    if (['di', 'ke', 'se', 'ku'].includes(res.slice(0, 2))) {
      res = this.removePrefixes(res, 2)
      return res
    }

    if (res.startsWith('be')) {
      // rule 1: berV -> ber-V | be-rV
      if (res[2] === 'r' && this.isVowel(res[3])) {
        const case1 = res.slice(3)
        const case2 = res.slice(2)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        }
      }
      // rule 2: berCAP -> ber-CAP, C != 'r', P != 'er'
      else if (res[2] === 'r' && res[3] !== 'r' && this.isConsonant(res[3]) && res.slice(5, 7) !== 'er') {
        res = this.removePrefixes(res, 3)
      }
      // rule 3: berCAerV -> ber-CAerV, C != 'r' (bercerita, bergerigi)
      else if (res[2] === 'r' && res[3] !== 'r' && this.isConsonant(res[3])) {
        res = this.removePrefixes(res, 3)
      }
      // rule 4: belajar -> bel-ajar
      else if (res.startsWith('belajar')) {
        res = this.removePrefixes(res, 3)
      }
      // rule 5: beC1erC -> be-C1erC, C1 != {'r'|'l'} (beterbangan)
      else if (!['r', 'l'].includes(res[2]) && this.isConsonant(res[2]) && res.slice(3, 5) === 'er' && this.isConsonant(res[5])) {
        res = this.removePrefixes(res, 2)
      }
    }

    else if (res.startsWith('te')) {
      // rule 6: terV -> ter-V | te-rV (terangkat | terundung)
      if (res[2] === 'r' && this.isVowel(res[3])) {
        const case1 = res.slice(3)
        const case2 = res.slice(2)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        }
      }
      // rule 7: terCP -> ter-CP, C != 'r' & P != 'er'
      else if (res[2] === 'r' && this.isConsonant(res[3]) && res[3] !== 'r' && res.slice(4, 6) !== 'er') {
        res = this.removePrefixes(res, 3)
      }
      // rule 8: terCer -> ter-Cer, C1 != 'r'
      else if (res[2] === 'r' && this.isConsonant(res[3]) && res[3] !== 'r' && res.slice(4, 6) === 'er') {
        res = this.removePrefixes(res, 3)
      }
      // rule 9: teC1erC2 -> te-C1erC2, C1 != 'r'
      else if (res[2] !== 'r' && this.isConsonant(res[2]) && res.slice(3, 5) === 'er' && this.isConsonant(res[5])) {
        res = this.removePrefixes(res, 2)
      }
    }

    else if (res.startsWith('me')) {
      // rule 10: me{l|r|w|y}V -> me-{l|r|w|y}V
      if (['l', 'r', 'w', 'y'].includes(res[2]) && this.isVowel(res[3])) {
        res = this.removePrefixes(res, 2)
      }
      // rule 11: mem{b|f|v} -> mem-{b|f|v}
      else if (['b', 'f', 'v'].includes(res[3])) {
        res = this.removePrefixes(res, 3)
      }
      // rule 12: mempe -> mem-pe
      else if (res.slice(2, 5) === 'mpe') {
        res = this.removePrefixes(res, 3)
      }
      // rule 13: mem{rV|V} -> me-m{rV|V} | me-p{rV|V} (memrakarsa, memamerkan)
      else if (res[2] === 'm' && (this.isVowel(res[3]) || res[3] === 'r' && this.isVowel(res[4]))) {
        const case1 = res.slice(2)
        const case2 = 'p' + res.slice(3)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        }
      }
      // rule 14: men{c|d|j|s|t|z} -> men-{c|d|j|s|t|z}
      // https://github.com/sastrawi/sastrawi/blob/09db1/src/Sastrawi/Morphology/Disambiguator/DisambiguatorPrefixRule14.php
      else if (res[2] === 'n' && ['c', 'd', 'j', 's', 't', 'z'].includes(res[3])) {
        res = this.removePrefixes(res, 3)
      }
      // rule 15: menV -> me-nV | me-tV
      else if (res[2] === 'n' && this.isVowel(res[3])) {
        const case1 = res.slice(2)
        const case2 = 't' + res.slice(3)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        }
      }
      // rule 16: meng{g|h|q|k} -> meng-{g|h|q|k}
      else if (res.slice(2, 4) === 'ng' && ['g', 'h', 'q', 'k'].includes(res[4])) {
        res = this.removePrefixes(res, 4)
      }
      // rule 17: mengV -> meng-V | meng-kV | meng-ngV | mengV-, V = 'e'
      else if (res.slice(2, 4) === 'ng' && this.isVowel(res[4])) {
        const case1 = res.slice(4)
        const case2 = 'ng' + res.slice(4)
        const case3 = 'k' + res.slice(4)
        const case4 = 'h' + res.slice(4)
        const case5 = res.slice(5)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        } else if (this.isInDict(case3)) {
          res = this.removePrefixes(case3)
        } else if (this.isInDict(case4)) {
          res = this.removePrefixes(case4)
        } else if (this.isInDict(case5)) {
          res = this.removePrefixes(case5)
        }
      }
      // rule 18: menyV -> meny-sV | me-nyV
      else if (res.slice(2, 4) === 'ny' && this.isVowel(res[4])) {
        if (res[4] === 'a') {
          const case1 = res.slice(2)
          const case2 = 's' + res.slice(4)

          if (this.isInDict(case1)) {
            res = this.removePrefixes(case1)
          } else if (this.isInDict(case2)) {
            res = this.removePrefixes(case2)
          }
        } else {
          const case1 = 'k' + res.slice(4)
          const case2 = 'h' + res.slice(4)
          const case3 = 's' + res.slice(4)
          const case4 = res.slice(4)

          if (this.isInDict(case1)) {
            res = this.removePrefixes(case1)
          } else if (this.isInDict(case2)) {
            res = this.removePrefixes(case2)
          } else if (this.isInDict(case3)) {
            res = this.removePrefixes(case3)
          } else if (this.isInDict(case4)) {
            res = this.removePrefixes(case4)
          }
        }
      }
      // rule 19: mempV -> mem-pV, V != 'e' (mempunyai)
      else if (res.slice(2, 4) === 'mp' && this.isVowel(res[4]) && res[4] !== 'e') {
        res = this.removePrefixes(res.slice(3))
      }
      // rule 19a??: mempCV -> memp-CV (memproteksi)
      else if (res.slice(2, 4) === 'mp' && this.isConsonant(res[4]) && this.isVowel(res[5])) {
        res = this.removePrefixes(res.slice(3))
      }
    }

    else if (res.startsWith('pe')) {
      // rule 20: pe{w|y}V -> pe-{w|y}V
      if (['w', 'y'].includes(res[3]) && this.isVowel(res[3])) {
        res = this.removePrefixes(res, 2)
      }
      // rule 21: perV -> per-V | pe-rV
      else if (res[2] === 'r' && this.isVowel(res[3])) {
        const case1 = res.slice(2)
        const case2 = res.slice(3)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        }
      }
      // rule 22: perCAP -> per-CAP, C != 'r', P != 'er'
      else if (res[2] === 'r' && res[3] !== 'r' && this.isConsonant(res[3]) && res.slice(5, 7) !== 'er') {
        res = this.removePrefixes(res, 3)
      }
      // rule 23: perCAerV -> per-CAerV, C != 'r' (perceraian)
      else if (res[2] === 'r' && res[3] !== 'r' && this.isConsonant(res[3])) {
        res = this.removePrefixes(res, 3)
      }
      // rule 24: pem{b|f|v} -> pem-{b|f|v}
      else if (res[2] === 'm' && ['b', 'f', 'v'].includes(res[3])) {
        res = this.removePrefixes(res, 3)
      }
      // rule 25: pem{rV|V} -> pe-m{rV|V} | pe-p{rV|V} (pemrakarsa, pemamerkan)
      else if (res[2] === 'm' && (this.isVowel(res[3]) || res[3] === 'r' && this.isVowel(res[4]))) {
        const case1 = 'p' + res.slice(3)
        const case2 = res.slice(2)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        }
      }
      // rule 26: pen{c|d|j|z} -> pen-{c|d|j|z}
      else if (['c', 'd', 'j', 'z'].includes(res[3])) {
        res = this.removePrefixes(res, 3)
      }
      // rule 27: penV -> pe-nV | pe-tV
      else if (res[2] === 'n' && this.isVowel(res[3])) {
        const case1 = 't' + res.slice(3)
        const case2 = res.slice(2)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        }
      }
      // rule 28: peng{g|h|q} -> peng-{g|h|q|k}
      else if (res.slice(2, 4) === 'ng' && ['g', 'h', 'q', 'k'].includes(res[4])) {
        res = this.removePrefixes(res, 4)
      }
      // rule 29: pengV -> peng-V | peng-kV | peng-hV
      else if (res.slice(2, 4) === 'ng' && this.isVowel(res[4])) {
        const case1 = res.slice(4)
        const case2 = 'k' + res.slice(4)
        const case3 = 'h' + res.slice(4)
        const case4 = res.slice(5)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        } else if (this.isInDict(case3)) {
          res = this.removePrefixes(case3)
        } else if (this.isInDict(case4)) {
          res = this.removePrefixes(case4)
        }
      }
      // rule 30: penyV -> peny-sV | pe-nyV
      else if (res.slice(2, 4) === 'ny' && this.isVowel(res[4])) {
        const case1 = 's' + res.slice(4)
        const case2 = res.slice(2)

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1)
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2)
        }
      }
      // rule 31: pelV -> pe-lV, 'pelajar' ? 'ajar'
      else if (res[2] === 'l' && this.isVowel(res[3])) {
        if (res === 'pelajar') {
          res = 'ajar'
        } else {
          res = this.removePrefixes(res, 2)
        }
      }
      // rule 32: peCP -> pe-CP, C != {r|w|y|l|m|n}, P != 'er'
      else if (!['r', 'w', 'y', 'l', 'm', 'n'].includes(res[3]) && res.slice(4, 6) !== 'er') {
        res = this.removePrefixes(res, 2)
      }
      // rule 33: pe-C1erC2 -> per-C1erC2, C != {r|w|y|l|m|n}
      else if (!['r', 'w', 'y', 'l', 'm', 'n'].includes(res[3])) {
        res = this.removePrefixes('r' + res.slice(3))
      }
    }

    return res
  }

  stem(word: string, fallback = false): string {
    word = word.toLowerCase()
    let res = word

    // untuk beberapa kasus, prefix harus dibuang terlebih dahulu
    if (
      (res.startsWith('be') && res.endsWith('lah')) ||
        (res.startsWith('be') && res.endsWith('an')) ||
        (res.startsWith('be') && res.endsWith('i')) ||
        (res.startsWith('me') && res.endsWith('i')) ||
        (res.startsWith('di') && res.endsWith('i')) ||
        (res.startsWith('pe') && res.endsWith('i')) ||
        (res.startsWith('te') && res.endsWith('i'))
    ) {
      res = this.removePrefixes(res)
      res = this.removeInflectionalSuffixes(res)
      res = this.removeDerivationalSuffix(res)

      if (this.isInDict(res)) return res
    }

    let noInflection = this.removeInflectionalSuffixes(word)
    let noDerivation = this.removeDerivationalSuffix(noInflection)
    let lastRes = this.removePrefixes(noDerivation)
    res = noDerivation

    while (lastRes !== res) {
      res = lastRes
      lastRes = this.removePrefixes(res)
    }

    if (this.isInDict(res)) return res

    // jika tidak ada di kamus, coba ulang dengan urutan berbeda
    res = this.removePrefixes(word)
    res = this.removeDerivationalSuffix(res)

    return fallback ? word : res
  }
}
