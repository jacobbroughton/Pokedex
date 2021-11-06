import React, { FC } from 'react'
import styles from "../styles/components/PokemonList.module.scss"
import PokemonCard from './PokemonCard'
import Loading from './Loading'
import { usePagination } from "../contexts/PaginationProvider"
import { PokemonProps } from "../types"

import { usePokemonData, usePokemonDataUpdate } from "../contexts/PokemonDataContext"

const PokemonList: FC = () => {

  const [paginationValues, setPaginationValues] = usePagination()
  const { pokemonData, isLoading } = usePokemonData()
  const { previous, next, count, pokemonList } = pokemonData
  const { limit, offset } = paginationValues
  
  if(isLoading) return (
   <Loading/>
  )

  return (
    <div className={styles['pokemon-list']}>
      {count !== 0 && <p>Showing results {(pokemonList.indexOf(pokemonList[0]) + 1) + parseInt(offset)} - {(pokemonList.indexOf(pokemonList[pokemonList.length - 1]) + 1) + parseInt(offset)} out of {count} total results</p>}
      { count === 0 ?
        <div className={styles['no-results-found']}>
          <p>No results, try a different set of filters</p>
        </div>
        :
        <>
          {console.log(pokemonList[0])}
          { pokemonList?.map((pokemon: PokemonProps, index: number) => 
            <PokemonCard pokemon={pokemon} key={index}/>
          )}   
          <div className={styles['previous-and-next-buttons']}>
            {previous && 
              <button 
                onClick={() => setPaginationValues({
                  limit: limit,
                  offset: (parseInt(offset) - parseInt(limit)) > 0 ? `${parseInt(offset) - parseInt(limit)}` : '0'
                })}
                className={styles['previous-button']}
                >Previous</button>
            }
            {next && 
              <button 
                onClick={() => setPaginationValues({
                  limit: limit,
                  offset: `${parseInt(offset) + parseInt(limit)}`
                })}
                className={styles['next-button']}
              >Next</button>
              }
          </div>
        </>
      }
    </div>
  )
}



export default PokemonList
