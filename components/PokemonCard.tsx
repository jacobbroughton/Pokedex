import Link from 'next/link'
import React, { FC, useState } from 'react'
import { formatLowerCaseString  } from "../utilities/formatLowerCaseString"
import styles from "../styles/components/PokemonCard.module.scss"
import { PokemonCardProps } from "../types"


const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {

  const [imageLoading, setImageLoading] = useState(true)

  return (
    <Link passHref href={`/pokemon/${pokemon.id}`}>
      <div className={styles['pokemon-card']}>
        <div className={styles['pokemon-info']}>
          <div className={styles['name-and-id']}>
            <p className={styles['pokemon-name']}> { formatLowerCaseString(pokemon.name.english) }</p>
            <p className={styles['pokemon-id']}># {pokemon.id}</p>
          </div>

          <div className={styles['pokemon-types']}>
            {pokemon.type.map((typeItem, index) => 
              <p 
                className={`${styles[`pokemon-type`]} ${styles[`${typeItem.toLowerCase()}`]}`}
                key={index}
              >{typeItem}</p>
            )}
          </div>
        </div>

        { pokemon.hires ? 
          <img 
            onLoad={() => setImageLoading(false)} 
            src={pokemon.hires} 
            alt={pokemon.name.english}
            className={styles[`pokemon-image`]}/>
          :
          <span className={styles["unknown-pokemon-image-placeholder"]}>?</span>
        }
      </div>
    </Link>

  )
}

export default PokemonCard
