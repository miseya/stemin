import { describe, expect, test } from 'vitest'
import CSStemmer from '../src/cs-stemmer'
import { rules } from './imports'

const stemmer = new CSStemmer()

Object.entries(rules).forEach(([ rule, rules ]) => {
  describe(rule, () => {
    test.each(rules)(
      '%s -> %s',
      (word, expected) => expect(stemmer.stem(word)).toBe(expected)
    )
  })
})
