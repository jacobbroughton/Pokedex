import { createContext, useContext, useState, useEffect } from "react"
import { useFilters } from "./FiltersContext"
import { callApi } from "../utilities/callApi"

const PokemonDataContext = createContext({Array, Boolean})
const PokemonDataUpdateContext = createContext(Function)

interface PokemonDataProviderProps {
  children: JSX.Element
}

export function usePokemonData() {
  return useContext(PokemonDataContext)
}

export function usePokemonDataUpdate() {
  return useContext(PokemonDataUpdateContext)
}

export function PokemonDataProvider({ children }: PokemonDataProviderProps) {

  const [filters] = useFilters()

  const { type, generation } = filters

  const [pokemonData, setPokemonData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getPokemon(url: string) {
    setIsLoading(true)
    setPokemonData(await callApi(url))
    setIsLoading(false)
  }

  useEffect(() => {
    getPokemon(`http://localhost:3000/api/pokemon${type ? `?type=${type}` : ''}${(generation?.idStart && generation?.idEnd) ? `${type ? '&' : '?'}from=${generation.idStart}&to=${generation.idEnd}` : ''}`)
  }, [type, generation])

  return (
    <PokemonDataContext.Provider value={{pokemonData, isLoading}}>
      <PokemonDataUpdateContext.Provider value={getPokemon}>
        {children}
      </PokemonDataUpdateContext.Provider>
    </PokemonDataContext.Provider>
  )
}