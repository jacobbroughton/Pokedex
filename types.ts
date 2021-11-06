export type PokemonProps = {
  base: {
    Attack: number,
    Defense: number,
    HP: number,
    ['Sp. Attack']: number,
    ['Sp. Defense']: number,
    Speed: number,
  },
  description: string
  evolution: object
  hires: string,
  id: number
  image: object | null
  name: {
    chinese: string,
    english: string
    french: string
    japanese: string
  },
  profile: {
    ability: Array<[]>,
    egg: string[]
    gender: string
    height: string
    weight: string
  },
  species: string,
  sprite: string,
  thumbnail: string,
  type: string[]
}

export type PokemonCardProps = {
  pokemon : {
    base: {
      Attack: number,
      Defense: number,
      HP: number,
      ['Sp. Attack']: number,
      ['Sp. Defense']: number,
      Speed: number,
    },
    description: string
    evolution: object
    hires: string,
    id: number
    image: object | null
    name: {
      chinese: string,
      english: string
      french: string
      japanese: string
    },
    profile: {
      ability: Array<[]>,
      egg: string[]
      gender: string
      height: string
      weight: string
    },
    species: string,
    sprite: string,
    thumbnail: string,
    type: string[]
  }
}