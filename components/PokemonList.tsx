import React, { FC } from 'react'

interface PokemonProps {
  name: string,
  url: string
}

interface PokemonListProps {
  data: {
    count?: Number,
    results?: Array<PokemonProps>,
    previous?: String | null,
    next?: String | null
  }
}

const PokemonList: FC<PokemonListProps> = ({ data }) => {

  const { count, results } = data

  return (
    <div>
      <h1>Pokemon List</h1>
      {<h3>Showing {results?.length} out of {count} total results</h3>}
      {
        results?.map((pokemon, index: number) => 
          <div key={index}>
            <p>{pokemon.name}</p>
          </div>
        )
      }
    </div>
  )
}

export default PokemonList
