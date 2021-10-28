import Link from 'next/link'
import React, { useState } from 'react'
import { usePokemonData } from "../contexts/PokemonDataContext"
import { useFormattedName } from "../utilities/useFormattedName"
import styles from "../styles/components/PokemonCard.module.scss"

const PokemonCard = ({ pokemon }) => {

  const [imageLoading, setImageLoading] = useState(true)


  // if(loading) return (
  //   <div className={styles['pokemon-card']}>
  //     <div className={styles['pokemon-info']}>
  //       <div className="placeholder name"></div>
  //       <div className="placeholder-types-parent">
  //         <div className="placeholder types"></div>
  //         <div className="placeholder types"></div>
  //       </div>
  //     </div>
  //     <div className='placeholder'></div>
  //   </div>
  // )

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className={styles['pokemon-card']}>
        <div className={styles['pokemon-info']}>
  <p className={styles['pokemon-name']}> { useFormattedName(pokemon.name) }</p>
          <div className={styles['pokemon-types']}>
            {pokemon.types.map(typeItem => 
              <p className={`${styles[`pokemon-type`]} ${styles[`${typeItem.type.name}`]}`}>{typeItem.type.name}</p>
            )}
          </div>
        </div>

       { imageLoading && <div className={styles['image-placeholder']}></div>}


        { pokemon.sprites['front_default'] ? 
          <img 
            onLoad={() => setImageLoading(false)} 
            src={pokemon.sprites['front_default']} 
            className={styles[`pokemon-image`]}/>
          :
          <span className={styles["unknown-pokemon-image-placeholder"]}>?</span>
        }
      </div>
    </Link>

  )
}

export default PokemonCard
