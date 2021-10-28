import React, { useState, createContext, useContext, Dispatch, SetStateAction } from "react"

const FiltersContext = createContext({
  filters: {
    types: [
      'Normal',
      'Fire',
      'Water',
      'Grass',
      'Electric',
      'Ice',
      'Fighting',
      'Poison',
      'Ground',
      'Flying',
      'Psychic',
      'Bug',
      'Rock',
      'Ghost',
      'Dark',
      'Dragon',
      'Steel',
      'Fairy'
    ],
    generations: [
      {
        name: "I",
        slug: "generation-i",
        url: "https://pokeapi.co/api/v2/generation/1/"
      },
      {
        name: "II",
        slug: "generation-ii",
        url: "https://pokeapi.co/api/v2/generation/2/"
      },
      {
        name: "III",
        slug: "generation-iii",
        url: "https://pokeapi.co/api/v2/generation/3/"
      },
      {
        name: "IV",
        slug: "generation-iv",
        url: "https://pokeapi.co/api/v2/generation/4/"
      },
      {
        name: "V",
        slug: "generation-v",
        url: "https://pokeapi.co/api/v2/generation/5/"
      },
      {
        name: "VI",
        slug: "generation-vi",
        url: "https://pokeapi.co/api/v2/generation/6/"
      },
      {
        name: "VII",
        slug: "generation-vii",
        url: "https://pokeapi.co/api/v2/generation/7/"
      },
      {
        name: "VIII",
        slug: "generation-viii",
        url: "https://pokeapi.co/api/v2/generation/8/"
      }
    ]
  }
  // ,setFilters: Dispatch<SetStateAction<object>>
})

export function useFilters() {
  return useContext(FiltersContext)
}

interface FiltersProviderProps {
  children: JSX.Element
}

export function FiltersProvider({ children }: FiltersProviderProps) {

  const [filters, setFilters] = useState<object>({})

  return (
    <FiltersContext.Provider value={{filters, setFilters}}>
      {children}
    </FiltersContext.Provider>
  )
}