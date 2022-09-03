import React from 'react'
import styles from '../../Audiogame.module.css'

function AudioIcon() {
  return (
    <svg
      className={styles.playIcon}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="19"
        fill="white"
        stroke="black"
        // stroke-width="2"
      />
      <path
        d="M7 16.2372V23.7628H12.7778L20 30.0342V9.96579L12.7778 16.2372H7ZM26.5 20C26.5 17.7799 25.0267 15.8734 22.8889 14.9453V25.0422C25.0267 24.1266 26.5 22.2201 26.5 20ZM22.8889 9V11.5838C27.0633 12.6625 30.1111 16.0239 30.1111 20C30.1111 23.9761 27.0633 27.3375 22.8889 28.4162V31C28.6811 29.8586 33 25.3683 33 20C33 14.6317 28.6811 10.1414 22.8889 9Z"
        fill="black"
      />
    </svg>
  )
}

export default AudioIcon
