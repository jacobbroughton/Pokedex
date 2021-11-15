import React, { useState, useRef, useEffect } from 'react'
import { useSetSearch, useSearch } from '../contexts/SearchContext'
import styles from "../styles/components/SearchInput.module.scss"

const SearchInput = () => {

  const searchValue = useSearch()!

  const setSearchValue = useSetSearch()!
  const searchRef = useRef<HTMLInputElement>(null)

  const [scopedSearchValue, setScopedSearchValue] = useState(searchValue)

  function handleSearchInput(e: React.FormEvent) {
    e.preventDefault()
    setSearchValue(scopedSearchValue)
  }

  useEffect(() => {
    if(searchRef.current) searchRef.current.focus()
  }, [])

  return (
    <form className={styles.form} onSubmit={(e) => handleSearchInput(e)}>
      {searchValue && 
        <div className={styles['search-result-and-reset']}>
          <p className={styles['search-result-p']}><span>Searched:&nbsp; </span>&apos;{searchValue}&apos;</p>
          <button onClick={() => setSearchValue("")}>Reset</button>
        </div>
      }
      <input 
        className={`
          ${styles.input}
          ${searchValue ? `${styles['search-active']}` : ''}
        `} 
        placeholder={`Search for a Pokemon`}
        onChange={(e) => setScopedSearchValue(e.target.value)}
        ref={searchRef}
      />
    </form>
    
  )
}

export default SearchInput
