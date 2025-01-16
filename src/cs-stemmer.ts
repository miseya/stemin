import wordsDict from './dictionary/words'

export default class CSStemmer {
  words: Set<string>

  constructor(words: Set<string> = wordsDict) {
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

  removePrefixes(word: string, nRemovedSuffixes: number, lastRemoved: string): string {
    let res = word

    if (this.isInDict(res) || res.length <= 5) {
      return res
    }

    if (['di', 'ke', 'se', 'ku'].includes(res.slice(0, 2)) && res.slice(0, 2) !== lastRemoved && nRemovedSuffixes < 3) {
      res = this.removePrefixes(res.slice(2), nRemovedSuffixes + 1, res.slice(0, 2))
    }

    else if (res.startsWith('be')) {
      // rule 1: berV -> ber-V | be-rV
      if (res[2] === 'r' && this.isVowel(res[3])) {
        const case1 = res.slice(3) // ber-V
        const case2 = res.slice(2) // be-rV

        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 2))
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 2))
        }
      }
      // rule 2: berCAP -> ber-CAP, C != 'r', P != 'er'
      else if (res[2] === 'r' && res[3] !== 'r' && this.isConsonant(res[3]) && res.slice(5, 7) !== 'er') {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 2))
      }
      // rule 3: berCAerV -> ber-CAerV, C != 'r' (bercerita, bergerigi)
      else if (res[2] === 'r' && res[3] !== 'r' && this.isConsonant(res[3])) {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 2))
      }
      // rule 4: belajar -> bel-ajar
      else if (res.startsWith('belajar')) {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 2))
      }
      // rule 5: beC1erC -> be-C1erC, C1 != {'r'|'l'} (beterbangan)
      else if (!['r', 'l'].includes(res[2]) && this.isConsonant(res[2]) && this.isConsonant(res[5])) {
        res = this.removePrefixes(res.slice(2), nRemovedSuffixes + 1, res.slice(0, 2))
      }
    }

    else if (res.startsWith('te')) {
      // rule 6: terV -> ter-V | te-rV (terangkat | terundung)
      if (res[2] === 'r' && this.isVowel(res[3])) {
        const case1 = res.slice(3)
        const case2 = res.slice(2)
        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 2))
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 2))
        }
      }
      // rule 7: terCP -> ter-CP, C != 'r' & P != 'er'
      else if (res.startsWith('ter') && res[3] !== 'r' && res.slice(4, 6) !== 'er') {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 3))
      }
      // rule 8: terCer -> ter-Cer, C != 'r'
      else if (res.startsWith('ter') && res[3] !== 'r' && res.slice(4, 6) === 'er') {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 3))
      }
      // rule 9: teC1erC2 -> te-C1erC2, C != 'r'
      else if (res[2] !== 'r' && res.slice(3, 5) === 'er' && this.isConsonant(res[5])) {
        res = this.removePrefixes(res.slice(2), nRemovedSuffixes + 1, res.slice(0, 2))
      }
    }

    else if (res.startsWith('me')) {
      // rule 10: me{l|r|w|y}V -> me-{l|r|w|y}V
      if (['mel', 'mer', 'mew', 'mey'].includes(res.slice(0, 3)) && this.isVowel(res[3])) {
        res = this.removePrefixes(res.slice(2), nRemovedSuffixes + 1, res.slice(0, 2))
      }
      // rule 11: mem{b|f|v} -> mem-{b|f|v}
      else if (['memb', 'memf', 'memv'].includes(res.slice(0, 4))) {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 4))
      }
      // rule 12: mempe -> mem-pe
      else if (res.startsWith('mempe')) {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 5))
      }
      // rule 13: mem{rV|V} -> me-m{rV|V} | me-p{rV|V} (memrakarsa, memamerkan)
      else if ((res.startsWith('memr') && this.isVowel(res[4])) || (res.startsWith('mem') && this.isVowel(res[3]))) {
        const case1 = 'm' + res.slice(3)
        const case2 = 'p' + res.slice(3)
        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 4))
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 4))
        }
      }
      // rule 14: men{c|d|j|s|t|z} -> men-{c|d|j|s|t|z}
      // https://github.com/sastrawi/sastrawi/blob/09db1/src/Sastrawi/Morphology/Disambiguator/DisambiguatorPrefixRule14.php
      else if (['menc', 'mend', 'menj', 'mens', 'ment', 'menz'].includes(res.slice(0, 4))) {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 4))
      }
      // rule 15: menV -> me-nV | me-tV
      else if (res.startsWith('men') && this.isVowel(res[3])) {
        const case1 = 'n' + res.slice(3)
        const case2 = 't' + res.slice(3)
        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 3))
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 3))
        }
      }
      // rule 16: meng{g|h|q|k} -> meng-{g|h|q|k}
      else if (['mengg', 'mengh', 'mengq', 'mengk'].includes(res.slice(0, 5))) {
        res = this.removePrefixes(res.slice(4), nRemovedSuffixes + 1, res.slice(0, 4))
      }
      // rule 17: mengV -> meng-V | meng-kV | meng-ngV | mengV-, V = 'e'
      else if (res.startsWith('meng') && this.isVowel(res[4])) {
        if (res[4] === 'e') {
          res = this.removePrefixes(res.slice(5), nRemovedSuffixes + 1, res.slice(0, 5))
        } else {
          const case1 = res.slice(4)
          const case2 = 'k' + res.slice(4)
          const case3 = 'h' + res.slice(4)

          if (this.isInDict(case1)) {
            res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 4))
          } else if (this.isInDict(case2)) {
            res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 4))
          } else if (this.isInDict(case3)) {
            res = this.removePrefixes(case3, nRemovedSuffixes + 1, res.slice(0, 4))
          }
        }
      }
      // rule 18: menyV -> meny-sV | me-nyV
      else if (res.startsWith('meny') && this.isVowel(res[4])) {
        if (res[4] === 'a') {
          const case1 = res.slice(2)
          const case2 = 's' + res.slice(4)

          if (this.isInDict(case1)) {
            res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 2))
          } else if (this.isInDict(case2)) {
            res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 4))
          }
        } else {
          const case1 = res.slice(4)
          const case2 = 'k' + res.slice(4)
          const case3 = 'h' + res.slice(4)

          if (this.isInDict(case1)) {
            res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 4))
          } else if (this.isInDict(case2)) {
            res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 4))
          } else if (this.isInDict(case3)) {
            res = this.removePrefixes(case3, nRemovedSuffixes + 1, res.slice(0, 4))
          }
        }
      }
      // rule 19: mempV -> mem-pV, V != 'e' (mempunyai)
      else if (res.startsWith('memp') && this.isVowel(res[4]) && res[4] !== 'e') {
        res = 'p' + res.slice(4)
        res = this.removePrefixes(res, nRemovedSuffixes + 1, res.slice(0, 4))
      }
    }

    else if (res.startsWith('pe')) {
      // rule 20: pe{w|y}V -> pe-{w|y}V
      if (['pew', 'pey'].includes(res.slice(0, 3)) && this.isVowel(res[3])) {
        res = res.slice(2)
        res = this.removePrefixes(res, nRemovedSuffixes + 1, res.slice(0, 2))
      }
      // rule 21: perV -> per-V | pe-rV
      else if (res.startsWith('per') && this.isVowel(res[3])) {
        const case1 = res.slice(3)
        const case2 = res.slice(2)
        if (this.isInDict(case2)) {
          res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 2))
        } else if (this.isInDict(case1)) {
          res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 3))
        }
      }
      // rule 22: perCAP -> per-CAP, C != 'r', P != 'er'
      else if (res.startsWith('per') && res[3] !== 'r' && this.isConsonant(res[3]) && res.slice(5, 7) !== 'er') {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 3))
      }
      // rule 23: perCAerV -> per-CAerV, C != 'r' (perceraian)
      else if (res.startsWith('per') && res[3] !== 'r' && this.isConsonant(res[3])) {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 3))
      }
      // rule 24: pem{b|f|v} -> pem-{b|f|v}
      else if (['pemb', 'pemf', 'pemv'].includes(res.slice(0, 4))) {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 4))
      }
      // rule 25: pem{rV|V} -> pe-m{rV|V} | pe-p{rV|V} (pemrakarsa, pemamerkan)
      else if ((res.startsWith('pemr') && this.isVowel(res[4])) || (res.startsWith('pem') && this.isVowel(res[3]))) {
        const case1 = 'm' + res.slice(3)
        const case2 = 'p' + res.slice(3)
        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 4))
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 4))
        }
      }
      // rule 26: pen{c|d|j|z} -> pen-{c|d|j|z}
      else if (['penc', 'pend', 'penj', 'penz'].includes(res.slice(0, 4))) {
        res = this.removePrefixes(res.slice(3), nRemovedSuffixes + 1, res.slice(0, 4))
      }
      // rule 27: penV -> pe-nV | pe-tV
      else if (res.startsWith('pen') && this.isVowel(res[3])) {
        const case1 = 'n' + res.slice(3)
        const case2 = 't' + res.slice(3)
        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 3))
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 3))
        }
      }
      // rule 28: peng{g|h|q} -> peng-{g|h|q|k}
      else if (['pengg', 'pengh', 'pengq', 'pengk'].includes(res.slice(0, 5))) {
        res = this.removePrefixes(res.slice(4), nRemovedSuffixes + 1, res.slice(0, 4))
      }
      // rule 29: pengV -> peng-V | peng-kV
      else if (res.startsWith('peng') && this.isVowel(res[4])) {
        const case1 = res.slice(4)
        const case2 = 'k' + res.slice(4)
        const case3 = 'h' + res.slice(4)
        if (this.isInDict(case1)) {
          res = this.removePrefixes(case1, nRemovedSuffixes + 1, res.slice(0, 4))
        } else if (this.isInDict(case2)) {
          res = this.removePrefixes(case2, nRemovedSuffixes + 1, res.slice(0, 4))
        } else if (this.isInDict(case3)) {
          res = this.removePrefixes(case3, nRemovedSuffixes + 1, res.slice(0, 4))
        }
      }
      // rule 30: penyV -> peny-sV | pe-nyV
      else if (res.startsWith('peny') && this.isVowel(res[4])) {
        res = 's' + res.slice(4)
        res = this.removePrefixes(res, nRemovedSuffixes + 1, res.slice(0, 2))
      }
      // rule 31: penlV -> pe-lV, 'pelajar' ? 'ajar'
      else if (res.startsWith('pel') && this.isVowel(res[3])) {
        if (res === 'pelajar') {
          res = 'ajar'
        } else {
          res = this.removePrefixes(res.slice(2), nRemovedSuffixes + 1, res.slice(0, 2))
        }
      }
      // rule 32: peCP -> pe-CP, C != {r|w|y|l|m|n}, P != 'er'
      else if (!['r', 'w', 'y', 'l', 'm', 'n'].includes(res[3]) && res.slice(4, 6) !== 'er') {
        res = this.removePrefixes(res.slice(2), nRemovedSuffixes + 1, res.slice(0, 2))
      }
      // rule 33: pe-C1erC2 -> per-C1erC2, C != {r|w|y|l|m|n}
      else if (!['r', 'w', 'y', 'l', 'm', 'n'].includes(res[3])) {
        res = 'r' + res.slice(2)
        res = this.removePrefixes(res.slice(2), nRemovedSuffixes + 1, res.slice(0, 2))
      }
    }

    return res
  }

  stem(word: string, fallback = false): string {
    let res = word.toLowerCase()

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
      res = this.removePrefixes(res, 0, '')
      res = this.removeInflectionalSuffixes(res)
      res = this.removeDerivationalSuffix(res)

      if (this.isInDict(res)) return res
    }

    let noInflection = this.removeInflectionalSuffixes(word.toLowerCase())
    let noDerivation = this.removeDerivationalSuffix(noInflection)
    let noPrefix = this.removePrefixes(noDerivation, 0, '')

    if (this.isInDict(noPrefix)) return noPrefix

    // jika tidak ada di kamus, coba ulang dengan urutan berbeda
    res = this.removePrefixes(noInflection, 0, '')
    res = this.removeDerivationalSuffix(res)

    return fallback ? word : res
  }
}
