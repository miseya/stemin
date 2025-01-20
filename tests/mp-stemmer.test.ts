import { describe, expect, test } from 'vitest'
import MPStemmer from '../src/mp-stemmer'
import { informalWords } from './imports'

const stemmer = new MPStemmer()

describe('nonstandard stemming with fuzzy', () => {
  test.each(informalWords)(
    '%s -> %s',
    (word, expected) => {
      expect(stemmer.stem(word, true)).toBe(expected)
    }
  )
})
