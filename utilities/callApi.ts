// import { usePokemonDataUpdate } from "../contexts/PokemonDataContext"

export async function callApi(url: string) {
  console.log(url)
  let response = await fetch(url)
  let data = await response.json()
  console.log(data)
  let pokemonList: [];
  if(data.results) {
    pokemonList = data.results
  } else if (data.pokemon) {
    pokemonList = data.pokemon
  } else if (data['pokemon_species']) {
    pokemonList = data['pokemon_species']
  }
  

  let detailedPokemonArr = []

  for(let i = 0; i < pokemonList.length; i++) {
    let detailedPokemonResponse = await fetch(data.results && pokemonList[i].url || data.pokemon && pokemonList[i].pokemon.url || data['pokemon_species'] && `https://pokeapi.co/api/v2/pokemon/${data['pokemon_species'].name}`)
    let detailedPokemonData = await detailedPokemonResponse.json()
    detailedPokemonArr.push(detailedPokemonData)
  }
  
  return {
    ...data,
    results: detailedPokemonArr
  }
}