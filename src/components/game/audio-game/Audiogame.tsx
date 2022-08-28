/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/button-has-typ */
/* eslint-disable max-len */
// /* eslint-disable react/jsx-inden */
import React, { useEffect, useRef, useState } from 'react'
import Endpoints from '../../../endpoints/endpoints'
import { IWord } from '../../../types/models'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import { audioGameSlice } from '../../redux/reducers/audioGameSlice'
import styles from './Audiogame.module.css'
import AnswerList from './game-components/AnswerList'
import AudioIcon from './game-components/AudioIcon'
import NextCardBtn from './game-components/NextCardBtn'
// import NextCardBtn from './game-components/NextCardBtn'

function Audiogame() {
  const dispatch = useAppDispatch()
  // const { changeStyle } = useAppSelector((state) => state.audioGameSlice)
  const [wordIndex, setwordIndex] = useState(0)
  const [progress, setProgress] = useState(1)
  const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  const voiceBtn = useRef<HTMLAudioElement>(null)

  // const { currentWord } = useAppSelector((state) => state.audioGameSlice)
  // currentWord = data[0] as IWord
  const currtWord = data[wordIndex]
  dispatch(audioGameSlice.actions.setCurrentWord(currtWord))
  //
  let customAnswers: IWord[] = []
  // const fakeAnswers: IWord[] = data.filter((el) => el.id !== currtWord.id)

  function randomIndx(arr: IWord[]) {
    const rand = Math.floor(Math.random() * arr.length)
    return rand
  }
  function randomiser(arr: IWord[]) {
    customAnswers = arr
    customAnswers = [...arr, currtWord]

    while (customAnswers.length < 5) {
      const rIndex = randomIndx(data)
      const word = customAnswers.find((el) => el.id === data[rIndex].id)
      if (!word) {
        customAnswers.push(data[rIndex])
      }
    }
    return customAnswers.sort(() => 0.5 - Math.random())
  }

  customAnswers = randomiser(customAnswers)

  function changeProgress() {
    if (progress === 20) return
    setProgress(progress + 1)
  }

  const handleConfirmBtn = () => {
    changeProgress()
    if (wordIndex >= 19) return
    setwordIndex(wordIndex + 1)
    dispatch(audioGameSlice.actions.setStyles(false))
  }

  function handleVoice() {
    voiceBtn.current?.play()
  }

  return (
    <div className={['container', styles.wrapper].join(' ')}>
      <div className={styles.counter}>{`${progress} / 20`}</div>
      <div className={styles.gameContent}>
        <div className={styles.answerContent}>
          <div className={styles.imgWrapper}>
            {/* {changeStyle && ( */}
            <img
              // className={changeStyle ? styles.answerImg : `${styles.answerImg} ${styles.hideImg}`}
              src={`${Endpoints.ROOT}/${data[wordIndex].image}`}
              alt="ansver-img"
            />
            {/* )} */}
          </div>
          <div className={styles.answerWordContainer}>
            <button
              type="button"
              // className={changeStyle ? styles.playBtn : `${styles.playBtn} ${styles.hidePlayBtn}`}
              onClick={handleVoice}
            >
              <AudioIcon />
            </button>
            <audio
              src={`${Endpoints.ROOT}/${data[wordIndex].audio}`}
              autoPlay
              ref={voiceBtn}
              onClick={handleVoice}
            >
              audio
            </audio>
            {/* <span className={changeStyle ? styles.answerWord : `${styles.answerWord} ${styles.hiddenAnswer}`}>
              {`${data[wordIndex].word}`}
            </span> */}
          </div>
        </div>
        <AnswerList currtWord={data[wordIndex]} customAnswers={customAnswers} />
        {/* <AnswerList /> */}
        <div>
          <input
            type="button"
            // value={!changeStyle 'Не знаю' : '->'}
            // className={changeStyle ? styles.answerBtn : `${styles.answerBtn} ${styles.changeBtn}`}
            onClick={handleConfirmBtn}
          />
        </div>
        {/* <NextCardBtn /> */}
      </div>
    </div>
  )
}

export default Audiogame
