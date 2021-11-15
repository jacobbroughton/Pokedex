import React, { FC } from 'react'
import styles from "../styles/components/Loading.module.scss"

const Loading: FC = () => {

  return (
    <div className={styles.loading}>
      <div className={styles.one}></div>
      <div className={styles.two}></div>
      <div className={styles.three}></div>
    </div>
  )
}

export default Loading