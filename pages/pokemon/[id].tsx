import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
// import PokemonCard from "../../components/PokemonCard"
// import { useFormattedName } from "../../utilities/useFormattedName"
import styles from "../../styles/SinglePokemonPage.module.scss"

const SinglePokemonPage: NextPage = ({ pokemon }) => {

  const { base: stats, description, evolution, hires, id, name, profile, species, sprite, type: types } = pokemon

  useEffect(() => {
    console.log(pokemon)
  }, [pokemon])

  type EvolutionsProps = Array<{
    id: number
  }>

  const [evolutions, setEvolutions] = useState<EvolutionsProps>()

  // useEffect(() => {
  //   if(pokemon.evolution)
  //   pokemon.evolution.prev

  // }, [])

  return (
    <div className={styles['single-pokemon-page']}>
      <main className={styles.main}>
        <div className={styles['intro-card']}>
          <div className={styles['intro-card-text']}>
            <h1>{name.english}</h1>
            <span className={styles.species}>({species})</span>
            <div className={styles['pokemon-types']}>
              {pokemon.type.map((typeItem, index) => 
                <p 
                  className={`${styles[`pokemon-type`]} ${styles[`${typeItem.toLowerCase()}`]}`}
                  key={index}
                >{typeItem}</p>
              )}
            </div>
          </div>

          <img className={styles.sprite} src={sprite}/>
        </div>

        <p className={styles.description}>{description}</p>

        <img className={styles['main-image']} src={hires}/>

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

  console.log(context)

  const { id } = context.params

  const response = await fetch(`http://localhost:3000/api/pokemon/${id}`)
  const pokemon = await response.json()

  return {
    props: {
      pokemon
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const response = await fetch(`/api/pokemon`)
  const response = await fetch('http://localhost:3000/api/pokemon')
  const pokemon = await response.json()

  console.log(pokemon)

  const paths = pokemon.pokemonList.map(pokemon => ({
    params: { id: toString(pokemon.id) }
  }))

  return {
    paths,
    fallback: "blocking"
  }
}

export default SinglePokemonPage
