import { bench } from 'vitest'
import { Stemmer } from 'sastrawijs'
import MPStemmer from '../src/mp-stemmer'
import { benchmarkDataset } from './imports'

const dataset = benchmarkDataset.flatMap((words) => words.toLowerCase().split(/ |-/g))

bench('sastrawijs', () => {
  const stemmer = new Stemmer()
  dataset.forEach((word) => stemmer.stem(word))
})

bench('mpstemmer', () => {
  const stemmer = new MPStemmer()
  dataset.forEach((word) => stemmer.stem(word))
})
