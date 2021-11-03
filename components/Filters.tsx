import React, { useEffect, useState } from 'react'
import { useFilters } from "../contexts/FiltersContext"
import { usePokemonDataUpdate } from "../contexts/PokemonDataContext"
import { useFormattedName } from "../utilities/useFormattedName"
import { Range } from 'react-range';
import FilterRange from "./FilterRange"
import styles from "../styles/components/Filters.module.scss"

const Filters = () => {

  const getPokemon = usePokemonDataUpdate()
  const [filters, setFilters] = useFilters()

  const { type, generation: { name, idStart, idEnd }, weight, height} = filters

  type SliderActiveProps = {
    active: boolean,
    value: string | null
  }

  const [weightSliderActive, setWeightSliderActive] = useState<SliderActiveProps>({
    active: false,
    value: null
  })
  
  const [heightSliderActive, setHeightSliderActive] = useState<SliderActiveProps>({
    active: false,
    value: null
  })

  let types = [
    { 
      name: "normal"
    },
    { 
      name: "fighting"
    },
    { 
      name: "flying"
    },
    { 
      name: "poison"
    },
    { 
      name: "ground"
    },
    { 
      name: "rock"
    },
    { 
      name: "bug"
    },
    { 
      name: "ghost"
    },
    { 
      name: "steel"
    },
    { 
      name: "fire"
    },
    { 
      name: "water"
    },
    { 
      name: "grass"
    },
    { 
      name: "electric"
    },
    { 
      name: "psychic"
    },
    { 
      name: "ice"
    },
    { 
      name: "dragon"
    },
    { 
      name: "dark"
    },
    { 
      name: "fairy"
    }
  ]

  let generations = [
    {
      name: "I",
      slug: "generation-i",
      firstPokemonId: 1,
      lastPokemonId: 151
    },
    {
      name: "II",
      slug: "generation-ii",
      firstPokemonId: 152,
      lastPokemonId: 251
    },
    {
      name: "III",
      slug: "generation-iii",      
      firstPokemonId: 252,
      lastPokemonId: 386

    },
    {
      name: "IV",
      slug: "generation-iv",
      firstPokemonId: 387,
      lastPokemonId: 493
    },
    {
      name: "V",
      slug: "generation-v",
      firstPokemonId: 494,
      lastPokemonId: 649
    },
    {
      name: "VI",
      slug: "generation-vi",
      firstPokemonId: 650,
      lastPokemonId: 720
    },
    {
      name: "VII",
      slug: "generation-vii",
      firstPokemonId: 722,
      lastPokemonId: 809
    },
    {
      name: "VIII",
      slug: "generation-viii",
      firstPokemonId: 810,
      lastPokemonId: 898
    }
  ]

  let heights = ["0.5", "1", "1.5", '2', "2.5", '3', "3.5", "4", "4.5", '5']

  function handleWeightSliderChange(e) {
    setFilters({
      ...filters,
      weight: parseInt(e.target.value)
      // weight: {
      //   weightStart: e[0],
      //   weightEnd: e[1]
      // }
    })
  }

  function handleHeightSliderChange(e) {
    console.log(e.target.value)
    setFilters({
      ...filters,
      height: parseFloat(e.target.value)
      // height: {
      //   heightStart: e[0],
      //   heightEnd: e[1]
      // }
    })
  }

  return (
    <div className={styles.aside}>
      <div className={styles['filters-heading']}>
        <h3>Filters</h3>
        <button
            className={styles['all-filters-reset-button']}
            disabled={!type}
            onClick={() => setFilters({
              type: null,
              generation: {
                idStart: null,
                idEnd: null
              },
              weight: 1000,
              height: 1000
              // weight: {
              //   weightStart: 0,
              //   weightEnd: 1000
              // },
              // height: {
              //   heightStart: 0,
              //   heightEnd: 20
              // }
            })}
          >Reset All</button>
      </div>
      {/* <hr/> */}
       <div className={styles['filter-section']}>
        <div className={styles['filter-section-header']}>
          <h4>By Type</h4>
          <button
            className={styles['filter-reset-button']}
            disabled={!type}
            onClick={() => setFilters({
              ...filters,
              type: null
            })}
          >Reset</button>
        </div>        
        <div className={styles['type-filters']}>
          {types.map((type, index) => 
            <button 
              key={index}
              onClick={() => setFilters({
                ...filters,
                type: type.name
              })}
              className={styles[`${type.name.toLowerCase()}`]}
            >{useFormattedName(type.name)}</button>
          )}
        </div>
       </div>

      <div className={styles['filter-section']}>
        <div className={styles['filter-section-header']}>
          <h4>By Generation</h4>
          <button
            className={styles['filter-reset-button']}
            disabled={!idStart && !idEnd}
            onClick={() => setFilters({
              ...filters,
              generation: {
                idStart: null,
                idEnd: null
              }
            })}
          >Reset</button>
        </div>
        <div className={styles['generation-filters']}>
          {generations.map((gen, index) => 
            <button 
              key={index} 
              className={`
                ${styles['filter-reset-button']}
                ${gen.name === name ? 'selected' : ''}
              `}
              onClick={() => setFilters({
                ...filters,
                generation: {
                  idStart: gen.firstPokemonId,
                  idEnd: gen.lastPokemonId
                }
              })}
            >{gen.name}</button>
          )}
        </div>
      </div>

      <div className={styles['filter-section']}>
          <div className={styles['filter-section-header']}>
            <h4>By Weight</h4>
            <button
              className={styles['filter-reset-button']}
              // disabled={weightStart === 0 && weightEnd === 1000}
              disabled={weight === 1000}
              onClick={() => setFilters({
                ...filters,
                // weight: {
                //   weightStart: 0,
                //   weightEnd: 1000
                // }
                weight: 1000
              })}
            >Reset</button>
          </div>
          {/* <FilterRange 
            startValue={weightStart} 
            endValue={weightEnd} 
            min={0} 
            max={1000} 
            step={5}
            onChangeFunc={handleWeightSliderChange}
          /> */}
          <div className={styles["input-and-max-button"]}>
            <input
              type="range"
              min="0"
              max="150"
              step="5"
              defaultValue="150"
              onChange={(e) => {
                setWeightSliderActive({
                  active: true,
                  value: e.target.value
                })
              }}
              onPointerUpCapture={(e) => {
                handleWeightSliderChange(e)
                setWeightSliderActive({
                  active: false,
                  value: null
                })
              }}
            />
            <button 
              className={weight === 1000 ? `${styles.selected}` : ''} 
              onClick={() => {
                setFilters({
                  ...filters,
                  // height: {
                  //   heightStart: 0,
                  //   heightEnd: 20
                  // }
                  weight: 1000
                })
                setWeightSliderActive({
                  active: false,
                  value: null
                })
            }}
              onMouseMove={() => {
                weight === 1000 ?
                null 
                :
                setWeightSliderActive({
                  active: true,
                  value: '1000'
                })
              }}
              onMouseLeave={() => setWeightSliderActive({
                active: false,
                value: null
              })}
            >Max</button>
          </div>
          <div className={styles['range-results']}>
            {/* <p>{weightStart}kg - {weightEnd}kg</p> */}
            <p>{weight}kg</p>
            {weightSliderActive.active && <span>→ {weightSliderActive.value}kg</span>}
          </div>
        </div>

        <div className={styles['filter-section']}>
          <div className={styles['filter-section-header']}>
            <h4>By Height</h4>
            <button
              className={styles['filter-reset-button']}
              // disabled={heightStart === 0 && heightEnd === 20}
              disabled={height === 20}
              onClick={() => setFilters({
                ...filters,
                // height: {
                //   heightStart: 0,
                //   heightEnd: 20
                // }
                height: 20
              })}
            >Reset</button>
          </div>
          {/* <FilterRange 
            startValue={heightStart} 
            endValue={heightEnd} 
            min={0} 
            max={20} 
            step={0.5}
            onChangeFunc={handleHeightSliderChange}
          /> */}
          <div className={styles["input-and-max-button"]}>
            <input 
              type="range"
              list="tickmarks"
              min="0"
              max="5"
              step="0.5"
              defaultValue="5"
              // onChange={(e) => handleHeightSliderChange(e)}
              onChange={(e) => setHeightSliderActive({
                active: true,
                value: e.target.value
              })}
              // onPointerUp={() => setHeightSliderActive({
              //   active: false,
              //   value: null
              // })}
              onPointerUpCapture={(e) => {
                handleHeightSliderChange(e)
                setHeightSliderActive({
                  active: false,
                  value: null
                })
              }}

            />
            <datalist id="tickmarks">
              {heights.map(heightTick => <option value={heightTick}>{heightTick}</option>)}
            </datalist>
            <button 
              className={height === 20 ? `${styles.selected}` : ''} 
              onClick={() => {
                setFilters({
                  ...filters,
                  // height: {
                  //   heightStart: 0,
                  //   heightEnd: 20
                  // }
                  height: 20
                })
                setHeightSliderActive({
                  active: false,
                  value: null
                })
              }}
              onMouseMove={() => {
                height === 20 ?
                null 
                :
                setHeightSliderActive({
                  active: true,
                  value: '20'
                })
              }}
              onMouseLeave={() => setHeightSliderActive({
                active: false,
                value: null
              })}
            >Max</button>
          </div>

          <div className={`${styles['range-results']}`}>
            <p>{height}m</p>
            {heightSliderActive.active && <span>→ {heightSliderActive.value}m</span>}
            {/* <p>{heightStart}m - {heightEnd}m</p> */}
          </div>
        </div>
    </div>
  )
}

export default Filters