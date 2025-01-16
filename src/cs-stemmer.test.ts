import { describe, expect, test } from 'vitest'
import CSStemmer from './cs-stemmer'

const stemmer = new CSStemmer()

describe('rule 1: berV -> ber-V | be-rV', () => {
  test.each([
    ['berapi', 'api'],
    ['berambut', 'rambut'],
  ])('%s -> %s', (word, expected) => {
      expect(stemmer.stem(word)).toBe(expected)
    })
})
