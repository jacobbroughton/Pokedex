import { usePokemonDataUpdate } from "../contexts/PokemonDataContexta"

export async function callApi(url: string) {
  
  let response = await fetch(url)
  let data = await response.json()
  const pokemonList = data.results

  let detailedPokemonArr = []

  for(let i = 0; i < pokemonList.length; i++) {
    let detailedPokemonResponse = await fetch(pokemonList[i].url)
    let detailedPokemonData = await detailedPokemonResponse.json()
    detailedPokemonArr.push(detailedPokemonData)
  }
  
  return {
    ...data,
    results: detailedPokemonArr
  }
}