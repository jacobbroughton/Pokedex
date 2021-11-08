import React, { FC } from 'react'
import styles from "../styles/components/PokemonList.module.scss"
import PokemonCard from './PokemonCard'
import Loading from './Loading'
import { usePagination, useSetPagination } from "../contexts/PaginationProvider"
import { PokemonProps } from "../types"

import { usePokemonData } from "../contexts/PokemonDataContext"
import { useLoading } from '../contexts/LoadingContext'

const PokemonList: FC = () => {

  const paginationValues = usePagination()
  const setPaginationValues = useSetPagination()!
  const pokemonData = usePokemonData()
  const isLoading = useLoading()
  const { previous, next, count, pokemonList } = pokemonData
  let { limit, offset } = paginationValues
  let limitNum = parseInt(limit as string)
  let offsetNum = parseInt(offset as string)
  
  if(isLoading) return (
   <Loading/>
  )

  return (
    <div className={styles['pokemon-list']}>
      {count !== 0 && <p>Showing results {(pokemonList.indexOf(pokemonList[0]) + 1) + offsetNum} - {(pokemonList.indexOf(pokemonList[pokemonList.length - 1]) + 1) + offsetNum} out of {count} total results</p>}
      { count === 0 ?
        <div className={styles['no-results-found']}>
          <p>No results, try a different set of filters</p>
        </div>
        :
        <>
          { pokemonList?.map((pokemon: PokemonProps, index: number) => 
            <PokemonCard pokemon={pokemon} key={index}/>
          )}   
          <div className={styles['previous-and-next-buttons']}>
            {previous && 
              <button 
                onClick={() => setPaginationValues({
                  limit: limit,
                  offset: (offsetNum - limitNum) > 0 ? `${offsetNum - limitNum}` : '0'
                })}
                className={styles['previous-button']}
                >Previous</button>
            }
            {next && 
              <button 
                onClick={() => setPaginationValues({
                  limit: limit,
                  offset: `${offsetNum + limitNum}`
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
