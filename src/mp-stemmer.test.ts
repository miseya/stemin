import { describe, expect, test } from 'vitest'
import MPStemmer from './mp-stemmer'

const stemmer = new MPStemmer()

describe('nonstandard stemming', () => {
  test.each([
    ["nerjang", "terjang"],
    ["nuduh", "tuduh"],
    ["nerima", "terima"],
    ["negur", "tegur"],
    ["mukul", "pukul"],
    ["mimpin", "pimpin"],
    ["nyoba", "coba"],
    ["nyiram", "siram"],
    ["nyuruh", "suruh"],
    ["nyimpen", "simpan"],
    ["nyebrang", "seberang"],
    ["nganggep", "anggap"],
    ["ngamuk", "amuk"],
    ["ngambil", "ambil"],
    ["ngebuka", "buka"],
    ["ngebantu", "bantu"],
    ["ngelepas", "lepas"],
    ["kebayang", "bayang"],
    ["keinjek", "injak"],
    ["kekabul", "kabul"],
    ["kepergok", "pergok"],
    ["ketipu", "tipu"],
    ["keulang", "ulang"],
    ["kewujud", "wujud"],
    ["critain", "cerita"],
    ["betulin", "betul"],
    ["manjain", "manja"],
    ["gangguin", "ganggu"],
    ["gantian", "ganti"],
    ["ikutan", "ikut"],
    ["musuhan", "musuh"],
    ["sabunan", "sabun"],
    ["temenan", "teman"],
    ["tukeran", "tukar"],
    ["nanyain", "tanya"],
    ["nunjukin", "tunjuk"],
    ["mentingin", "penting"],
    ["megangin", "pegang"],
    ["nyelametin", "selamat"],
    ["nyempetin", "sempat"],
    ["ngorbanin", "korban"],
    ["ngadepin", "hadap"],
    ["ngebuktiin", "bukti"],
    ["ngewarnain", "warna"],
    ["kedengeran", "dengar"],
    ["ketemuan", "temu"],
    ["beneran", "benar"],
    ["ginian", "begini"],
    ["kawinan", "kawin"],
    ["mainan", "main"],
    ["parkiran", "parkir"],
    ["duluan", "dulu"],
    ["gendutan", "gendut"],
    ["karatan", "karat"],
    ["palingan", "paling"],
    ["sabaran", "sabar"],
    ["kebagusan", "bagus"],
    ["sanaan", "sana"],
    ["cepetan", "cepat"],
    ["sepagian", "pagi"]
  ])(
      '%s -> %s',
      (word, expected) => {
        expect(stemmer.stem(word)).toBe(expected)
      }
    )
})
