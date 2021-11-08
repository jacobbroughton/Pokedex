import React from 'react'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
// import Image from "next/image"
// import PokemonCard from "../../components/PokemonCard"
// import { useFormattedName } from "../../utilities/useFormattedName"
import { PokemonCardProps, PokemonProps } from "../../types"
import { determineEnv } from "../../utilities/determineEnv"
import PokedexData from "../../pokedex.json"

import styles from "../../styles/SinglePokemonPage.module.scss"

const SinglePokemonPage: NextPage<PokemonCardProps> = ({ pokemon }) => {

  console.log(pokemon)

  const { base: stats, description, evolution, hires, id, name, profile, species, sprite, type: types } = pokemon

  // type EvolutionsProps = Array<{
  //   id: number
  // }>

  // const [evolutions, setEvolutions] = useState<EvolutionsProps>()

  return (
    <div className={styles['single-pokemon-page']}>
      <main className={styles.main}>
        <div className={styles['intro-card']}>
          <div className={styles['intro-card-text']}>
            <h1>{name.english}</h1>
            <span className={styles.species}>({species})</span>
            <div className={styles['pokemon-types']}>
              {types.map((typeItem: string, index: number) => 
                <p 
                  className={`${styles[`pokemon-type`]} ${styles[`${typeItem.toLowerCase()}`]}`}
                  key={index}
                >{typeItem}</p>
              )}
            </div>
          </div>

          <img className={styles.sprite} alt={`${name.english}'s sprite`} src={sprite}/>
        </div>

        <p className={styles.description}>{description}</p>

        <img className={styles['main-image']} src={hires} alt={name.english}/>

        <div className={styles['height-and-weight']}>
          <div className={styles.item}>
            <p className={styles['item-value']}>{profile.height}</p>
            <p className={styles['item-name']}>Height</p>
          </div>
          <div className={styles.item}>
            <p className={styles['item-value']}>{profile.weight}</p>
            <p className={styles['item-name']}>Weight</p>
          </div>
        </div>
        { stats && 
        <div className={styles.stats}>
          <h4>Base Stats</h4>
          <p><span>HP </span>{stats.HP}</p>
          <p><span>Defense </span>{stats.Defense}</p>
          <p><span>Sp. Attack </span>{stats['Sp. Attack']}</p>
          <p><span>Sp. Defense </span>{stats['Sp. Defense']}</p>
          <p><span>Speed </span>{stats.Speed}</p>
        </div>
        }
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const { id } = context.params!
  // const baseUrl = determineEnv()

  // const response = await fetch(`${baseUrl}/api/pokemon/${id}`)
  // const pokemon = await response.json()

  const pokemon = PokedexData.filter(indexedPokemon => indexedPokemon.id === parseInt(id as string))[0]

  // if(pokemon) {
    return {
      props: {
        pokemon
      }
    }
  // }

}

export const getStaticPaths: GetStaticPaths = async () => {
  // const baseUrl = determineEnv()
  // const response = await fetch(`${baseUrl}/api/pokemon`)
  // const pokemonList = await response.json()

  // console.log(pokemonList)

  const paths = PokedexData.map(pokemon => ({
    params: { id: pokemon.id.toString() }
  }))

  return {
    paths,
    fallback: false
  }
}

export default SinglePokemonPage
