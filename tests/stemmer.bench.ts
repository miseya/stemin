import { bench } from 'vitest'
import { Stemmer } from 'sastrawijs'
import MPStemmer from '../src/mp-stemmer'
import CSStemmer from '../src/cs-stemmer'
import { benchmarkDataset } from './imports'

const dataset = benchmarkDataset.flatMap((words) => words.toLowerCase().split(/ |-/g))

bench('sastrawijs', () => {
  const stemmer = new Stemmer()
  for (const word of dataset) stemmer.stem(word)
})

bench('cs-stemmer', () => {
  const stemmer = new CSStemmer()
  for (const word of dataset) stemmer.stem(word)
})

bench('mp-stemmer', () => {
  const stemmer = new MPStemmer()
  for (const word of dataset) stemmer.stem(word)
})

bench('mp-stemmer w/ fuzzy', () => {
  const stemmer = new MPStemmer()
  for (const word of dataset) stemmer.stem(word, true)
})
