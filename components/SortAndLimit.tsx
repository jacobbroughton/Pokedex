import React, { useEffect, FC, useState } from 'react'
import { usePagination, useSetPagination } from "../contexts/PaginationContext"
import { useSort, useSetSort } from "../contexts/SortContext"
import { useLoading } from "../contexts/LoadingContext"
import { usePokemonData } from '../contexts/PokemonDataContext'
import { useSetMenus } from "../contexts/MenusContext";
import styles from "../styles/components/SortAndLimit.module.scss"

interface SortAndLimitTypes {
  visible: boolean
}

const SortAndLimit: FC<SortAndLimitTypes> = ({ visible }) => {

  const paginationValues = usePagination()
  const setPaginationValues = useSetPagination()!
  const setMenusOpen = useSetMenus()!

  const sortOrder = useSort()
  const setSortOrder = useSetSort()!
  const pokemonData = usePokemonData()
  const { count } = pokemonData
  const { limit, offset } = paginationValues

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

  const [prevLimit, setPrevLimit] = useState(limit)


  // ---------
  // --------------
  // --------------------------
  // Limit turnin to zero is because of this
  useEffect(() => {
    // console.log({"Count not equal to 0" : count !== 0})
    // console.log({"limit more than count": (limit as number) >= count})
    // console.log({"buttons include limit value": paginationButtonValues.includes(limit as string)})

    if((count !== 0 && (limit as number) >= count) || !paginationButtonValues.includes(limit as string)) {
      setPrevLimit(limit)
      setPaginationValues({
        ...paginationValues,
        limit: count
      })
    }

    if(offset > count) {
      setPaginationValues({
        limit: prevLimit,
        offset: paginationButtonValues.filter(buttonValue => parseInt(buttonValue) < count)[0]
      })
    }
  }, [count])

  function handleSortClick(buttonValue: { name: string, slug: string }) {
    setSortOrder(buttonValue)
    setMenusOpen({
      sortMenuOpen: false,
      filterMenuOpen: false,
    })
  }

  function handlePaginationValueClick(buttonValue: string | null) {
    setPaginationValues({
      ...paginationValues,
      limit: buttonValue ? buttonValue : count
    })
    setMenusOpen({
      sortMenuOpen: false,
      filterMenuOpen: false,
    })
  }


  return (
    <aside className={`
      ${styles['sort-and-limit']}
      ${visible ? styles.visible : ''}
    `}>
      {/* ${visible ? styles.visible : styles.hidden} */}
      <div className={styles['sort-and-limit-section']}>
        <h4>Sort By</h4>
        <div className={styles.buttons}>
          {sortButtonValues.map((buttonValue: { name: string, slug: string }, index: number) =>
            <button 
              className={`
                ${styles.button} 
                ${sortOrder?.name === buttonValue.name ? `${styles.selected}` : ''
              }`} 
              onClick={() => handleSortClick(buttonValue)}
              key={index}
            >{buttonValue.name}</button>
          )}  
        </div>
      </div>

      <div className={styles['sort-and-limit-section']}>
        <h4>Limit Results</h4>
        <div className={`${styles.buttons} ${styles['limit-buttons']}` }>
          <>
            {paginationButtonValues.map((buttonValue: string, index: number) =>
              parseInt(buttonValue) <= count && 
              <button 
                className={`
                  ${styles.button} 
                  ${paginationValues.limit === buttonValue ? `${styles.selected}` : ''}
                `} 
                onClick={() => handlePaginationValueClick(buttonValue)}
                key={index}
              >{buttonValue}</button>)
            }      
            <button 
              className={`
                ${styles.button} 
                ${styles['limit-all-button']} 
                ${paginationValues.limit === count ? `${styles.selected}` : ''}
              `} 
              onClick={() => handlePaginationValueClick(null)}
            >All</button>
          </>
        </div>
      </div>
    </aside>
  )
}

export default SortAndLimit
