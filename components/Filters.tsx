import React, { useEffect } from 'react'
import { useFilters } from "../contexts/FiltersContext"
import styles from "../styles/components/Filters.module.scss"

const Filters = () => {

  const { filters, setFilters } = useFilters()
  console.log(filters)
  console.log(setFilters)

  useEffect(() => {
    console.log(setFilters)
  }, [])

  return (
    <aside className={styles.aside}>
      <h3>Filters</h3>
      {filters.types.length > 0 && 
       <div className={styles['filters-section']}>
        <h4>By type</h4>        
        <div className={styles['type-filters']}>
          {filters.types.map((type, index) => 
            <button key={index} className={styles[`${type.toLowerCase()}`]}>{type}</button>
          )}
        </div>
       </div>

      }

      {filters.generations.length > 0 && 
      <div className={styles['filters-section']}>
        <h4>By generation</h4>        
        <div className={styles['generation-filters']}>
          {filters.generations.map((generation, index) => 
            <button key={index}>{generation.name}</button>
          )}
        </div>
      </div>

      }
    </aside>
  )
}

export default Filters