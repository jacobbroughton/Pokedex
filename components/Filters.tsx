import React, { FC, useState, useEffect } from "react";
import { useFilters, useSetFilters } from "../contexts/FiltersContext";
import { formatLowerCaseString } from "../utilities/formatLowerCaseString";
import { useSetMenus } from "../contexts/MenusContext";
import styles from "../styles/components/Filters.module.scss";

interface FiltersTypes {
  visible: boolean;
}

const Filters: FC<FiltersTypes> = ({ visible }) => {
  const filters = useFilters();
  const setFilters = useSetFilters()!;
  const setMenusOpen = useSetMenus()!;

  const {
    type,
    generation: { name, idStart, idEnd },
    weight,
    height,
  } = filters;

  type SliderActiveProps = {
    active: boolean;
    value: string | null;
  };

  const [weightSliderActive, setWeightSliderActive] =
    useState<SliderActiveProps>({
      active: false,
      value: null,
    });

  const [heightSliderActive, setHeightSliderActive] =
    useState<SliderActiveProps>({
      active: false,
      value: null,
    });

  let types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy"
  ];

  let generations = [
    {
      name: "I",
      slug: "generation-i",
      firstPokemonId: 1,
      lastPokemonId: 151,
    },
    {
      name: "II",
      slug: "generation-ii",
      firstPokemonId: 152,
      lastPokemonId: 251,
    },
    {
      name: "III",
      slug: "generation-iii",
      firstPokemonId: 252,
      lastPokemonId: 386,
    },
    {
      name: "IV",
      slug: "generation-iv",
      firstPokemonId: 387,
      lastPokemonId: 493,
    },
    {
      name: "V",
      slug: "generation-v",
      firstPokemonId: 494,
      lastPokemonId: 649,
    },
    {
      name: "VI",
      slug: "generation-vi",
      firstPokemonId: 650,
      lastPokemonId: 720,
    },
    {
      name: "VII",
      slug: "generation-vii",
      firstPokemonId: 722,
      lastPokemonId: 809,
    },
    {
      name: "VIII",
      slug: "generation-viii",
      firstPokemonId: 810,
      lastPokemonId: 898,
    },
  ];

  function handleWeightSliderChange(e: React.PointerEvent) {
    const unParsedWeight = (e.target as HTMLInputElement).value;
    setFilters({
      ...filters,
      weight: parseInt(unParsedWeight),
    });
  }

  function handleHeightSliderChange(e: React.PointerEvent) {
    const unParsedHeight = (e.target as HTMLInputElement).value;
    setFilters({
      ...filters,
      height: parseFloat(unParsedHeight),
    });
  }

  useEffect(() => {
    setMenusOpen({
      sortMenuOpen: false,
      filterMenuOpen: false,
    });
  }, [filters]);

  return (
    <div
      className={`
      ${styles.aside}
      ${visible ? styles.visible : ""}
    `}
    >
      {/* ${visible ? styles.visible : styles.hidden} */}
      <div className={styles["filters-heading"]}>
        <h3>Filters</h3>
        <button
          className={styles["all-filters-reset-button"]}
          disabled={!type}
          onClick={() =>
            setFilters({
              type: null,
              generation: {
                name: null,
                idStart: null,
                idEnd: null,
              },
              weight: 1000,
              height: 20,
            })
          }
        >
          Reset All
        </button>
      </div>
      {/* <hr/> */}
      <div className={styles["filter-section"]}>
        <div className={styles["filter-section-header"]}>
          <h4>By Type</h4>
          <button
            className={styles["filter-reset-button"]}
            disabled={!type}
            onClick={() =>
              setFilters({
                ...filters,
                type: null,
              })
            }
          >
            Reset
          </button>
        </div>
        <div className={styles["type-filters"]}>
          {types.map((type, index) => (
            <button
              key={index}
              onClick={() =>
                setFilters({
                  ...filters,
                  type,
                })
              }
              className={`
                ${styles[`${type.toLowerCase()}`]}
                ${type === filters.type ? "selected" : ""}
              `}
            >
              {formatLowerCaseString(type)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles["filter-section"]}>
        <div className={styles["filter-section-header"]}>
          <h4>By Generation</h4>
          <button
            className={styles["filter-reset-button"]}
            disabled={!idStart && !idEnd}
            onClick={() =>
              setFilters({
                ...filters,
                generation: {
                  name: null,
                  idStart: null,
                  idEnd: null,
                },
              })
            }
          >
            Reset
          </button>
        </div>
        <div className={styles["generation-filters"]}>
          {generations.map((gen, index) => (
            <button
              key={index}
              className={gen.name === name ? `${styles.selected}` : ""}
              onClick={() =>
                setFilters({
                  ...filters,
                  generation: {
                    name: gen.name,
                    idStart: gen.firstPokemonId,
                    idEnd: gen.lastPokemonId,
                  },
                })
              }
            >
              {gen.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles["filter-section"]}>
        <div className={styles["filter-section-header"]}>
          <h4>By Weight</h4>
          <button
            className={styles["filter-reset-button"]}
            disabled={weight === 1000}
            onClick={() =>
              setFilters({
                ...filters,
                weight: 1000,
              })
            }
          >
            Reset
          </button>
        </div>
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
                value: e.target.value,
              });
            }}
            onPointerUpCapture={(e) => {
              handleWeightSliderChange(e);
              setWeightSliderActive({
                active: false,
                value: null,
              });
            }}
          />
          <button
            className={weight === 1000 ? `${styles.selected}` : ""}
            onClick={() => {
              setFilters({
                ...filters,
                weight: 1000,
              });
              setWeightSliderActive({
                active: false,
                value: null,
              });
            }}
            onMouseMove={() => {
              weight === 1000
                ? null
                : setWeightSliderActive({
                    active: true,
                    value: "1000",
                  });
            }}
            onMouseLeave={() =>
              setWeightSliderActive({
                active: false,
                value: null,
              })
            }
          >
            Max
          </button>
        </div>
        <div className={styles["range-results"]}>
          <p>{weight}kg</p>
          {weightSliderActive.active && (
            <span>→ {weightSliderActive.value}kg</span>
          )}
        </div>
      </div>

      <div className={styles["filter-section"]}>
        <div className={styles["filter-section-header"]}>
          <h4>By Height</h4>
          <button
            className={styles["filter-reset-button"]}
            disabled={height === 20}
            onClick={() =>
              setFilters({
                ...filters,
                height: 20,
              })
            }
          >
            Reset
          </button>
        </div>
        <div className={styles["input-and-max-button"]}>
          <input
            type="range"
            list="tickmarks"
            min="0"
            max="5"
            step="0.5"
            defaultValue="5"
            onChange={(e) =>
              setHeightSliderActive({
                active: true,
                value: e.target.value,
              })
            }
            onPointerUpCapture={(e) => {
              handleHeightSliderChange(e);
              setHeightSliderActive({
                active: false,
                value: null,
              });
            }}
          />
          <button
            className={height === 20 ? `${styles.selected}` : ""}
            onClick={() => {
              setFilters({
                ...filters,
                height: 20,
              });
              setHeightSliderActive({
                active: false,
                value: null,
              });
            }}
            onMouseMove={() => {
              height === 20
                ? null
                : setHeightSliderActive({
                    active: true,
                    value: "20",
                  });
            }}
            onMouseLeave={() =>
              setHeightSliderActive({
                active: false,
                value: null,
              })
            }
          >
            Max
          </button>
        </div>

        <div className={`${styles["range-results"]}`}>
          <p>{height}m</p>
          {heightSliderActive.active && (
            <span>→ {heightSliderActive.value}m</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
