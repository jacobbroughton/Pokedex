import React from 'react'
// import { usePokemonData } from "../contexts/PokemonDataContext"
import styles from "../styles/components/Loading.module.scss"

const Loading = () => {

  return (
    <div className={styles.loading}>
      <div className={styles.one}></div>
      <div className={styles.two}></div>
      <div className={styles.three}></div>
    </div>
  )
}

export default Loading