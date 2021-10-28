import React from 'react'
import PokemonCard from "../../components/PokemonCard"
import { useFormattedName } from "../../utilities/useFormattedName"
import styles from "../../styles/SinglePokemonPage.module.scss"

const SinglePokemonPage = ({ pokemon, pokemon2 }) => {

  
  return (
    <div className={styles['single-pokemon-page']}>
      <main className={styles.main}>
        {/* <h1>{useFormattedName(pokemon.name)}</h1>
        <img src={pokemon.sprites['front_default']}/>
        <div className={styles['pokemon-types']}>
            {pokemon.types.map(typeItem => 
              <p className={`${styles[`pokemon-type`]} ${styles[`${typeItem.type.name}`]}`}>{typeItem.type.name}</p>
            )}
          </div> */}
        <PokemonCard pokemon={pokemon}/>
        <div className={styles.stats}>
          <h3>Base Stats</h3>

          <div className={styles.sprites}>
            <img src={pokemon.sprites['front_default']}/>
            <img src={pokemon.sprites['back_default']}/>
            <img src={pokemon.sprites['front_shiny']}/>
            <img src={pokemon.sprites['back_shiny']}/>
          </div>

          <div className={styles['stat-items']}>
            {pokemon.stats.map((statItem: object, index: number) => 
              <div className={styles['stat-item']} key={index}>
                <span className={styles['stat-name']}>{useFormattedName(statItem.stat.name)}</span>
                <span className={styles['stat-value']}>{statItem['base_stat']}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  const { name } = context.query

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const pokemon = await response.json()

  return {
    props: {
      pokemon
    }
  }
  
}

export default SinglePokemonPage
