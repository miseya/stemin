import { bench } from 'vitest'
import { Stemmer } from 'sastrawijs'
import MPStemmer from '../src/mp-stemmer'
import CSStemmer from '../src/cs-stemmer'
import { benchmarkDataset } from './imports'

const dataset = benchmarkDataset.flatMap((words) => words.toLowerCase().split(/ |-/g))

bench('sastrawijs', () => {
  const stemmer = new Stemmer()
  dataset.forEach((word) => stemmer.stem(word))
})

bench('cs-stemmer', () => {
  const stemmer = new CSStemmer()
  dataset.forEach((word) => stemmer.stem(word))
})

bench('mp-stemmer', () => {
  const stemmer = new MPStemmer()
  dataset.forEach((word) => stemmer.stem(word))
})

bench('mp-stemmer w/ fuzzy', () => {
  const stemmer = new MPStemmer()
  dataset.forEach((word) => stemmer.stem(word, true))
})
