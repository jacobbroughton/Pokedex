import { FC, useEffect } from "react";
import { useFilters, useSetFilters } from "../contexts/FiltersContext";
import { usePagination } from "../contexts/PaginationContext";
import { useSort } from "../contexts/SortContext";
import { useSetMenus, useMenus } from "../contexts/MenusContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import FilterIcon from "./FilterIcon"
import Link from "next/link";
import styles from "../styles/components/Navbar.module.scss";

// use React.ReactNode interface if the component has no props
const ThemeToggle = dynamic<React.ReactNode>(
  () => import("./ThemeToggle").then(({ ThemeToggle }) => ThemeToggle),
  {
    ssr: false,
  }
);

// ***
// Use Solrock for the sun icon and Lunatone for the moon

export const Navbar: FC = () => {
  const setFilters = useSetFilters()!;
  const paginationValues = usePagination();
  const sortOrder = useSort();
  const setMenusOpen = useSetMenus()!;
  const menusOpen = useMenus();
  const router = useRouter();

  const { limit, offset } = paginationValues;

  return (
    <nav className={styles.nav}>
      <div className={styles.main}>
        <Link
          href={`/?limit=${limit ? limit : 20}&offset=${
            offset ? offset : 0
          }&sort=${sortOrder ? sortOrder.slug : "asc"}`}
        >
          <a
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
            <img src="/images/pokedex-logo.png" alt="Pokedex" />
          </a>
        </Link>

        <div className={styles["nav-buttons"]}>
          {router.pathname === "/" && (
            <>
              <button
                onClick={() =>
                  setMenusOpen({
                    sortMenuOpen: !menusOpen.sortMenuOpen,
                    filterMenuOpen: false,
                  })
                }
                className={styles["sort-button"]}
              >
                A-Z
              </button>
              <button
                onClick={() =>
                  setMenusOpen({
                    sortMenuOpen: false,
                    filterMenuOpen: !menusOpen.filterMenuOpen,
                  })
                }
                className={styles["filters-button"]}
              >
                <FilterIcon/>
              </button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
