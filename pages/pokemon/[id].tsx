import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import PokemonCard from "../../components/PokemonCard"
// import { useFormattedName } from "../../utilities/useFormattedName"
import PokedexData from "../../pokedex.json"
import styles from "../../styles/SinglePokemonPage.module.scss"

const SinglePokemonPage = ({ pokemon }) => {

  console.log(pokemon)

  
  return (
    <div className={styles['single-pokemon-page']}>
      <main className={styles.main}>
        <img src={pokemon.hires}/>
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

  const paths = pokemon.map(pokemon => ({
    params: { id: toString(pokemon.id) }
  }))

  return {
    paths,
    fallback: "blocking"
  }
}

// export async function getServerSideProps (context) {
//   const { name } = context.query

//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
//   const pokemon = await response.json()

//   return {
//     props: {
//       pokemon
//     }
//   }
// }

export default SinglePokemonPage
