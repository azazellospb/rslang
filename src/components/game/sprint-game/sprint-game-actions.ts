/* eslint-disable import/no-cycle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable import/no-cycle */
import {
  ICustomWord, IParams, IUnlearnedWord, IWord,
} from '../../../types/models'
import { IFetchParam, IStudiedWord } from '../../../types/sprint-game-models'
import { aggregateWords, getWordsDataForSprintGame, postPutWordsToServerFromGame } from '../../redux/fetching'
import { fetchBeforePageUnlearned, fetchOtherSectionUnlearned } from '../../redux/reducers/aggregatedSlice'
import { audioGameSlice } from '../../redux/reducers/audioGameSlice'
import { gameSlice } from '../../redux/reducers/gameSlice'
import {
  currentWord, fetchWordForSprintGameSuccess, forComparisonWord, gameScore, showMessageIfAllWordStudiedOnPage, studiedWord, timerWork, turnCounter,
} from '../../redux/reducers/sprintGameSlice'
import { AppDispatchState } from '../../redux/store'

// eslint-disable-next-line import/prefer-default-export
export const getRandomWord = (gameData: IWord[], counter:number) => (dispatch: AppDispatchState) => {
  const randomObjIndex = Math.floor(Math.random() * gameData.length)
  const secondRandomObjIndex = counter % 2 === 0 ? randomObjIndex : Math.floor(Math.random() * gameData.length)
  const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
  dispatch(currentWord(gameData[randomObjIndex]))
  dispatch(forComparisonWord(gameData[secondRandomObjIndex]))
  userInfo && dispatch(aggregateWords())
}
export const createStudiedWordAndPutItToArr = (currentWord: IWord | null | undefined, examination: boolean) => (dispatch: AppDispatchState) => {
  const examsWord: IStudiedWord = {
    ...currentWord,
    learned: examination,
  }
  examination && dispatch(gameScore(10))
  dispatch(studiedWord(examsWord))
}

export const createObjectForPostOrPutItToUserAggregatedWords = (currentWord: IWord | null | undefined, examination: boolean, aggregatedWordArr: ICustomWord[]) => (dispatch: AppDispatchState) => {
  const isAggregated = aggregatedWordArr.some((item) => item.wordId === currentWord?.id)
  const isWord = aggregatedWordArr.find((item) => item.wordId === currentWord?.id)
  const isHard = (isWord?.difficulty === 'hard')
  let toLearn = (isWord?.optional?.toLearn || 0)
  const date = new Date()
  const month = (date.getMonth() + 1).toString().length !== 1 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1).toString()}`
  const dateKey = `d${date.getDate().toString()}${month}${date.getFullYear().toString()}`
  // для серии в статистике
  if (!localStorage.getItem('rightOrwrong')) {
    localStorage.setItem('rightOrwrong', examination.toString())
  } else {
    localStorage.setItem('rightOrwrong', `${localStorage.getItem('rightOrwrong')},${examination.toString()}`)
  }
  // для общего числа слов в игре в статистике
  if (!localStorage.getItem('totalWords')) {
    localStorage.setItem('totalWords', '1')
  } else {
    const totalWordsData = localStorage.getItem('totalWords')!
    localStorage.setItem('totalWords', (Number(totalWordsData) + 1).toString())
  }
  // разбить на массивы true map(v => v || 'false').join(',').split('false').map(v => v.split(","))
  // длина серии arr[arr.reduce((p, c, i, a) => a[p].length > c.length ? p : i, 0)].length - 1
  
  // для числа правильных слов за игру в статистике
  if (examination) {
    if (!localStorage.getItem('rightAnswers')) {
      localStorage.setItem('rightAnswers', '1')
    } else {
      const rightAnswersData = localStorage.getItem('rightAnswers')!
      localStorage.setItem('rightAnswers', (Number(rightAnswersData) + 1).toString())
    }
  }
  if (isAggregated) {
    const params: IParams = {
      method: 'PUT',
      // eslint-disable-next-line no-nested-ternary
      difficulty: !isHard ? isWord?.difficulty : examination ? ((toLearn === 2) ? 'easy' : isWord?.difficulty) : isWord?.difficulty,
      wordId: currentWord?.id,
      optional: {
        // eslint-disable-next-line no-nested-ternary
        toLearn: !isHard ? 0 : examination ? (!((toLearn + 1) === 3) ? toLearn += 1 : toLearn = 0) : ((toLearn - 1 > 0) ? toLearn -= 1 : toLearn = 0),
        learned: ((toLearn === 2) && isHard) || (examination && !isHard),
        rightCounter: examination ? Number(isWord?.optional?.rightCounter) + 1 : Number(isWord?.optional?.rightCounter) || 0,
        wrongCounter: !examination ? Number(isWord?.optional?.wrongCounter) + 1 : Number(isWord?.optional?.wrongCounter) || 0,
        dates: {},
      },
    }
    // eslint-disable-next-line no-nested-ternary, no-unneeded-ternary
    if (examination && (!isHard ? true : (isHard && toLearn === 2) ? true : false)) params.optional!.dates![dateKey] = true
    dispatch(postPutWordsToServerFromGame(params))
  } else {
    const newWordsData = localStorage.getItem('newWords') || 0
    localStorage.setItem('newWords', Number(+newWordsData + 1).toString())
    const params: IParams = {
      method: 'POST',
      difficulty: 'easy',
      wordId: currentWord?.id,
      optional: {
        toLearn: 0,
        learned: examination,
        rightCounter: examination ? 1 : 0,
        wrongCounter: !examination ? 1 : 0,
        dates: {},
      },
    }
    if (examination) params.optional!.dates![dateKey] = true
    dispatch(postPutWordsToServerFromGame(params))
  }
}

export const choiceCategory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (dispatch: AppDispatchState) => {
  const paramForFetch: IFetchParam = {
    textbookSection: (e.target as HTMLButtonElement).id,
    page: Math.floor(Math.random() * 30),
  }
  dispatch(getWordsDataForSprintGame(paramForFetch))
}
export const filteredUnlearnedWordsLessThanCurrentPage = (data: IUnlearnedWord[], page: number) => (dispatch: AppDispatchState) => {
  const filteredWord = data.filter((item) => item.page <= page)
    .map((item) => ({
      // eslint-disable-next-line no-underscore-dangle
      id: item._id,
      group: item.group,
      page: item.page,
      word: item.word,
      image: item.image,
      audio: item.audio,
      audioMeaning: item.audioMeaning,
      audioExample: item.audioExample,
      textMeaning: item.textMeaning,
      textExample: item.textExample,
      transcription: item.transcription,
      textExampleTranslate: item.textExampleTranslate,
      textMeaningTranslate: item.textMeaningTranslate,
      wordTranslate: item.wordTranslate,
    }))
    .sort((a, b) => (a.page < b.page ? 1 : -1))
  dispatch(fetchWordForSprintGameSuccess(filteredWord))
  filteredWord.length === 0 ? dispatch(showMessageIfAllWordStudiedOnPage(true)) : dispatch(showMessageIfAllWordStudiedOnPage(false))
}
export const filteredUnlearnedWordsMoreThanCurrentPage = (data: IUnlearnedWord[], page: number) => (dispatch: AppDispatchState) => {
  const filteredWord = data.filter((item) => item.page >= page)
    .map((item) => ({
      // eslint-disable-next-line no-underscore-dangle
      id: item._id,
      group: item.group,
      page: item.page,
      word: item.word,
      image: item.image,
      audio: item.audio,
      audioMeaning: item.audioMeaning,
      audioExample: item.audioExample,
      textMeaning: item.textMeaning,
      textExample: item.textExample,
      transcription: item.transcription,
      textExampleTranslate: item.textExampleTranslate,
      textMeaningTranslate: item.textMeaningTranslate,
      wordTranslate: item.wordTranslate,
    }))
    .sort((a, b) => (a.page < b.page ? 1 : -1))
  console.log('action')
  console.log(filteredWord)
  dispatch(fetchWordForSprintGameSuccess(filteredWord))
  filteredWord.length === 0 ? dispatch(showMessageIfAllWordStudiedOnPage(true)) : dispatch(showMessageIfAllWordStudiedOnPage(false))
}
export const refreshGameParams = () => (dispatch: AppDispatchState) => {
  dispatch(timerWork(60))
  dispatch(turnCounter())
  dispatch(studiedWord({}))
  dispatch(gameScore(0))

  dispatch(gameSlice.actions.fetchGameOver(false))
  dispatch(audioGameSlice.actions.fetchCounterProgress(1))
  dispatch(audioGameSlice.actions.fetchCounterWord(0))
  dispatch(audioGameSlice.actions.learnedWord({}))
  dispatch(audioGameSlice.actions.fetchTotalNumOfWords(20))
  dispatch(audioGameSlice.actions.fetchRightWords(0))
  dispatch(audioGameSlice.actions.setStyles(false))
}
