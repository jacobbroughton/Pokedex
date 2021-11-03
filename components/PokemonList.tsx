import React, { FC , useEffect} from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from "next/link"
import { usePaginationContext } from "../contexts/PaginationProvider"
import { useRouter } from "next/router"
import styles from "../styles/components/PokemonList.module.scss"
import PokemonCard from './PokemonCard'
import Loading from './Loading'
import PokedexData from "../pokedex.json"
import { usePagination } from "../contexts/PaginationProvider"


import { usePokemonData, usePokemonDataUpdate } from "../contexts/PokemonDataContext"


const PokemonList: FC = () => {

  const [paginationValues, setPaginationValues] = usePagination()
  const { isLoading, pokemonData } = usePokemonData()
  const { previous, next, count, pokemonList } = pokemonData
  const { limit, offset } = paginationValues

  const getPokemon = usePokemonDataUpdate()

  const router = useRouter()
  // let { limit, offset } = router.query
  // let sumForPrevious = parseInt(offset) - parseInt(limit)
  // let sumForNext = parseInt(offset) + parseInt(limit)

  useEffect(() => {
    if(router.query) {
      router.push('?limit=20&offset=0&sort=asc')
    }
  }, [paginationValues]) 

  
  if(isLoading) return (
   <Loading/>
  )

  return (
    <div className={styles['pokemon-list']}>
      {count !== 0 && <p>Showing results {(pokemonList.indexOf(pokemonList[0]) + 1)+ parseInt(offset)} - {(pokemonList.indexOf(pokemonList[pokemonList.length - 1]) + 1) + parseInt(offset)} out of {count} total results</p>}
      { count === 0 ?
        <div className={styles['no-results-found']}>
          <p>No results, try a different set of filters</p>

        </div>
        :
        <>
          { pokemonList?.map((pokemon: object, index: number) => 
            <PokemonCard pokemon={pokemon} key={index}/>
            // <img className={styles['thumbnail-img']} key={index} src={pokemon.hires}/>
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
