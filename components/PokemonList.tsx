import React, { FC , useEffect} from 'react'
import { GetStaticProps } from 'next'

import Link from "next/link"
import { usePaginationContext } from "../contexts/PaginationProvider"
import { useRouter } from "next/router"
import styles from "../styles/components/PokemonList.module.scss"
import PokemonCard from './PokemonCard'
import Loading from './Loading'
import PokedexData from "../pokedex.json"


import { usePokemonData } from "../contexts/PokemonDataContext"



// interface PokemonProps {
//   name: string,
//   url: string
// }

// interface PokemonListProps {
//   data: {
//     count?: Number,
//     results?: Array<PokemonProps>,
//     detailedResults?: Array<[]>,
//     previous?: String | null,
//     next?: String | null
//   }
// }

const PokemonList: FC<PokemonListProps> = () => {

  const { 
    isLoading
    // , pokemonData 
  } = usePokemonData()

  // const { count, results, previous, next } = pokemonData

  const router = useRouter()

  let { limit, offset } = router.query
  let sumForPrevious = parseInt(offset) - parseInt(limit)
  let sumForNext = parseInt(offset) + parseInt(limit)

  // if(isLoading) return (
  //  <Loading/>
  // )

  useEffect(() => {
    if(!limit && !offset) {
      router.push('?limit=20&offset=0')
    }

    console.log(PokedexData)
  }, [])

  return (
    <div className={styles['pokemon-list']}>
      {/* {<h3>Showing {count ? `results ${offset} - ${sumForNext > count ? count : sumForNext} out of ${count} total results` : `${results.length} results`}</h3>} */}
      {/* {
        results?.map((pokemon: object, index: number) => 
          <PokemonCard pokemon={pokemon} key={index}/>
        )
      } */}
      {
        PokedexData?.map((pokemon: object, index: number) => 
          <PokemonCard pokemon={pokemon} key={index}/>
          // <img className={styles['thumbnail-img']} key={index} src={pokemon.hires}/>
        )
      }
      <div className={styles['previous-and-next-buttons']}>
        {/* {previous && 
          <Link href={`/?limit=${limit ? limit : 20}&offset=${offset ? sumForPrevious : 0}`}>
            <a className={styles['previous-button']}>Previous</a>
          </Link>
        } */}
        {/* {next && 
          <Link href={`/?limit=${limit ? limit: 20}&offset=${offset ? sumForNext : 20}`}>
            <a className={styles['next-button']}>Next</a>
          </Link>
        } */}
      </div>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const response = await fetch(`http://localhost:3000/api/pokemon`)
  const pokemon = await response.json()

  return {
    props: {
      pokemon
    }
  }
}

export default PokemonList
