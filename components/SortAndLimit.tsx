import React, { useEffect } from 'react'
import { usePagination } from "../contexts/PaginationProvider"
import { useSort } from "../contexts/SortContext"
import { usePokemonData } from '../contexts/PokemonDataContext'
import styles from "../styles/components/SortAndLimit.module.scss"

const SortAndLimit = () => {

  const [paginationValues, setPaginationValues] = usePagination()
  const [sortOrder, setSortOrder] = useSort()
  const { pokemonData } = usePokemonData()
  const { count } = pokemonData

  const paginationButtonValues = ['20','40','60','80','100','150','200','250','300']
  const sortButtonValues = [
    {
    name: 'A - Z',
    slug: 'a-z'
    }, 
    {
      name: 'Z - A',
      slug: 'z-a'
    }, 
    {
      name: 'Asc by ID',
      slug: 'asc'
    }, 
    {
      name: 'Desc by ID',
      slug: 'desc'
    }
  ]

  

  useEffect(() => {
    if(paginationValues.limit >= count || !paginationButtonValues.includes(paginationValues.limit)) {
      setPaginationValues({
        ...paginationValues,
        limit: count
      })
    }

  }, [count])

  return (
    <aside className={styles['sort-and-limit']}>

      <div className={styles['sort-and-limit-section']}>
        <h4>Sort By</h4>
        <div className={styles.buttons}>
          {sortButtonValues.map(buttonValue =>
            <button 
              className={`${styles.button} ${sortOrder.name === buttonValue.name ? `${styles.selected}` : ''}`} 
              onClick={() => setSortOrder(buttonValue)}
            >{buttonValue.name}</button>
          )}  
        </div>


      </div>

      <div className={styles['sort-and-limit-section']}>
        <h4>Limit Results</h4>
        <div className={`${styles.buttons} ${styles['limit-buttons']}` }>
          <>
            {paginationButtonValues.map(buttonValue =>
              parseInt(buttonValue) <= count && 
              <button 
                className={`${styles.button} ${paginationValues.limit === buttonValue ? `${styles.selected}` : ''}`} 
                onClick={() => setPaginationValues({
                  ...paginationValues,
                  limit: buttonValue
                })}
              >{buttonValue}</button>)
            }      
            <button 
              className={`
                ${styles.button} 
                ${styles['limit-all-button']} 
                ${paginationValues.limit === count ? `${styles.selected}` : ''}
              `} 
              onClick={() => setPaginationValues({
                ...paginationValues,
                limit: count
              })}
            >All</button>
          </>
        </div>
      </div>
    </aside>
  )
}

export default SortAndLimit
