/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { refreshGameParams } from '../components/game/sprint-game/sprint-game-actions'
import { getUnlearnedWordsForGamesAfterCurrentPage, getWordsDataForSprintGame } from '../components/redux/fetching'
import { useAppDispatch, useAppSelector } from '../components/redux/hooks/redux'
import styles from './reloadButton.module.css'

function ReloadStatButton() {
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  const offer = useAppSelector((state) => state.sprintGameSlice.offer)
  const currentWord = useAppSelector((state) => state.sprintGameSlice.currentWord)
  const dispatch = useAppDispatch()
  const refreshHandel = () => {
    dispatch(refreshGameParams())
    localStorage.getItem('userInfo') || isFromDictionary
      ? offer ? dispatch(getUnlearnedWordsForGamesAfterCurrentPage(currentGroupPage!))
        : dispatch(getUnlearnedWordsForGamesAfterCurrentPage(
          {
            textbookSection: String(currentGroupPage?.textbookSection),
            page: 0,
          },
        ))
      : dispatch(getWordsDataForSprintGame(
        {
          textbookSection: String(currentWord?.group),
          page: Math.floor(Math.random() * 30),
        },
      ))
  }
  return (
    <button
      type="button"
      className={styles.reloadButton}
      onClick={refreshHandel}
    >
      <svg
        className={styles.reload}
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0 0 1215.000000 1280.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>
        <g
          transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
          fill="#0058C9"
          stroke="none"
        >
          <path d="M3808 12794 c-10 -3 -18 -10 -18 -16 0 -47 497 -1012 1170 -2273 64
-121 242 -458 395 -750 673 -1284 1022 -1923 1064 -1950 6 -3 35 31 66 75 31
44 58 80 60 80 2 0 38 -60 79 -132 90 -158 137 -231 151 -232 24 -2 203 271
706 1075 204 327 372 595 374 597 7 7 134 -64 215 -119 281 -193 604 -504 823
-791 359 -472 603 -1027 702 -1593 44 -254 50 -335 49 -670 0 -324 -7 -415
-50 -655 -152 -854 -617 -1652 -1291 -2215 -380 -318 -842 -568 -1309 -710
-854 -260 -1758 -210 -2583 142 -310 132 -495 265 -817 587 -320 321 -543 632
-730 1021 -236 490 -355 982 -371 1535 -24 828 237 1635 759 2340 l21 29 -44
57 c-151 196 -455 508 -640 656 -141 113 -298 220 -439 300 -69 40 -156 93
-195 118 -104 69 -278 165 -402 220 -135 60 -344 133 -353 123 -31 -36 -196
-275 -268 -388 -731 -1149 -1041 -2456 -896 -3790 114 -1057 517 -2070 1159
-2915 478 -628 1029 -1117 1730 -1536 94 -55 222 -133 285 -171 1173 -717
2625 -992 4015 -762 2152 357 3943 1894 4631 3976 141 428 224 838 276 1358
19 199 16 799 -5 1005 -57 536 -143 933 -302 1390 -266 766 -721 1509 -1277
2086 -433 449 -802 741 -1354 1070 -106 63 -195 119 -197 122 -2 4 67 120 155
257 307 484 566 901 596 962 l31 61 -22 5 c-12 3 -87 11 -167 16 -80 6 -169
13 -198 17 l-52 5 42 79 c29 53 40 82 33 89 -26 26 -942 73 -2370 121 -170 6
-476 17 -680 25 -429 17 -758 29 -1330 50 -445 16 -1199 28 -1227 19z"
          />
        </g>
      </svg>
    </button>
  )
}
export default ReloadStatButton
