import Link from 'next/link'
import React, { useState } from 'react'
import { usePokemonData } from "../contexts/PokemonDataContext"
import { useFormattedName } from "../utilities/useFormattedName"
import styles from "../styles/components/PokemonCard.module.scss"

const PokemonCard = ({ pokemon }) => {

  console.log(pokemon)

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
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className={styles['pokemon-card']}>
        <div className={styles['pokemon-info']}>
          <div className={styles['name-and-id']}>
            <p className={styles['pokemon-name']}> { useFormattedName(pokemon.name.english) }</p>
            <p className={styles['pokemon-id']}># {pokemon.id}</p>
          </div>

          <div className={styles['pokemon-types']}>
            {pokemon.type.map(typeItem => 
              <p className={`${styles[`pokemon-type`]} ${styles[`${typeItem.toLowerCase()}`]}`}>{typeItem}</p>
            )}
          </div>
        </div>

       { imageLoading && <div className={styles['image-placeholder']}></div>}


        { pokemon.hires ? 
          <img 
            onLoad={() => setImageLoading(false)} 
            src={pokemon.hires} 
            className={styles[`pokemon-image`]}/>
          :
          <span className={styles["unknown-pokemon-image-placeholder"]}>?</span>
        }
      </div>
    </Link>

  )
}

export default PokemonCard
