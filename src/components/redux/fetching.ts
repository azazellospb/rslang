/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { AppDispatchState } from './store'
import { fetchUserWords, fetchWordSuccess } from './reducers/wordSlice'
import {
  IAggregatedWords,
  ICustomWord,
  IParams,
  IWord,
  IStats,
  UserStat,
  IUnlearnedWord,
} from '../../types/models'
import { IFetchParam } from '../../types/sprint-game-models'
import {
  fetchWordForSprintGameError,
  fetchWordForSprintGameLoader,
  fetchWordForSprintGameSuccess,
} from './reducers/sprintGameSlice'
import {
  fetchAggregatedWords,
  fetchBeforePageUnlearned,
  fetchDictPage,
  fetchHardWords,
  fetchOtherSectionUnlearned,
} from './reducers/aggregatedSlice'
import mergeDeep from '../../tools/mergeDeep'

const getWordsData = (
  page = 0,
  group = 0,
  data: IWord[] = [],
  id = '',
) => async (dispatch: AppDispatchState) => {
  try {
    // TODO: сделать лоадер
    if (!id.length) {
      if (data.filter((x) => (x.page === page) && (x.group === group)).length === 0) {
        const response: Response = await fetch(`http://localhost:8088/words?group=${group}&page=${page}`)
        const dataBE: IWord[] = await response.json()
        dispatch(fetchWordSuccess([...data, ...dataBE]))
      }
    } else {
      const response: Response = await fetch(`http://localhost:8088/words/${id}`)
      const word: IWord = await response.json()
      dispatch(fetchUserWords(word))
    }
  } catch (e) {
    console.log(e)
    // TODO: ОБОАБОТАТЬ ОШИБКУ
  }
}
export default getWordsData

export const getDictPageWords = (
  page = 0,
  group = 0,
) => async (dispatch: AppDispatchState) => {
  try {
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    const response: Response = await fetch(
      `http://localhost:8088/users/${userId}/aggregatedWords?filter={"$and":[{ "group": ${group}}, {"page": ${page}}]}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const responseData: IAggregatedWords[] = await response.json()
    const pageWords = responseData[0].paginatedResults
    dispatch(fetchDictPage(pageWords))
  } catch (e) {
    console.log(e)
  }
}

export const getWordsDataForSprintGame = (paramForFetch: IFetchParam) => async (dispatch: AppDispatchState) => {
  const { textbookSection, page } = paramForFetch
  const url = 'http://localhost:8088/words'
  try {
    dispatch(fetchWordForSprintGameLoader())
    const response: Response = await fetch(`${url}/?group=${textbookSection}&page=${page}`)
    const data: IWord[] = await response.json()
    console.log(data)
    dispatch(fetchWordForSprintGameSuccess(data))
  } catch (e: string | unknown) {
    dispatch(fetchWordForSprintGameError('Something went wrong...'))
  }
}
export const postPutWordsToServerFromGame = (params: IParams) => async (dispatch: AppDispatchState) => {
  // const url = 'http://localhost:8088/users/'
  const userInfo = localStorage.getItem('userInfo') as string
  const { token, userId } = JSON.parse(userInfo)
  const obj = {
    difficulty: params.difficulty,
    optional: params.optional,
  }
  try {
    await fetch(
      `http://localhost:8088/users/${userId}/words/${params.wordId}`,
      {
        method: params.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      },
    )
  } catch (e: string | unknown) {
    dispatch(fetchWordForSprintGameError('Something went wrong...'))
  }
}

export const aggregateWords = () => async (dispatch: AppDispatchState) => {
  try {
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    const response = await fetch(
      `http://localhost:8088/users/${userId}/words`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data: ICustomWord[] = await response.json()

    dispatch(fetchAggregatedWords(data))
  } catch (e) {
    console.log(e)
  }
}

export const aggregateHardWords = () => async (dispatch: AppDispatchState) => {
  try {
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    const response = await fetch(
      `http://localhost:8088/users/${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data: IAggregatedWords[] = await response.json()

    dispatch(fetchHardWords(data))
  } catch (e) {
    console.log(e)
  }
}

export const toggleDifficulty = (
  isAggregated: boolean,
  word: IUnlearnedWord,
) => async (dispatch: AppDispatchState) => {
  try {
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    let method = 'PUT'
    const body = { ...word.userWord }
    Object.defineProperty(body, 'difficulty', {
      writable: true,
      configurable: true,
    })
    if (body.difficulty === 'easy') {
      body.difficulty = 'hard'
    } else {
      body.difficulty = 'easy'
    }
    if (!isAggregated) method = 'POST'
    await fetch(
      `http://localhost:8088/users/${userId}/words/${word._id}`,
      {
        method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    )
    dispatch(getDictPageWords(word.page, word.group))
    dispatch(aggregateHardWords())
  } catch (e) {
    console.log(e)
  }
}
export const toggleLearnState = (
  isAggregated: boolean,
  word: IUnlearnedWord,
) => async (dispatch: AppDispatchState) => {
  try {
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    let method = 'PUT'
    const {
      difficulty,
    } = word.userWord!
    const {
      learned,
      toLearn,
      rightCounter,
      wrongCounter,
      dates,
    } = word.userWord!.optional!
    const body = {
      difficulty,
      optional: {
        learned,
        toLearn,
        rightCounter,
        wrongCounter,
        dates,
      },
    }
    if (difficulty === 'hard' && !body.optional?.learned) {
      body.difficulty = 'easy'
      dispatch(aggregateHardWords())
    }
    body.optional!.learned = !body.optional?.learned
    if (!isAggregated) method = 'POST'
    await fetch(
      `http://localhost:8088/users/${userId}/words/${word._id}`,
      {
        method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    )
    dispatch(getDictPageWords(word.page, word.group))
  } catch (e) {
    console.log(e)
  }
}

export const getUnlearnedWords = (
  page = 0,
  group = 0,
) => async (dispatch: AppDispatchState) => {
  try {
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    const response: Response = await fetch(
      `http://localhost:8088/users/${userId}/aggregatedWords?filter={"$and":[{ "group": ${group}}, {"$or":[{"userWord.optional.learned":null}, {"userWord.optional.learned":false}]}]}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const responseData: IAggregatedWords[] = await response.json()
    const unlearnedWords: IUnlearnedWord[] = responseData[0].paginatedResults
    let afterPageWords = []
    const beforePageWords: IUnlearnedWord[] = unlearnedWords // отсортировано от большей к меньшей странице
      .filter((word:IUnlearnedWord) => word.page <= page)
      .sort((a, b) => (a.page < b.page ? 1 : -1))
    dispatch(fetchBeforePageUnlearned(beforePageWords))
    if (beforePageWords.length === 0) {
      afterPageWords = unlearnedWords.filter((word:IUnlearnedWord) => word.page <= page)
      dispatch(fetchOtherSectionUnlearned(afterPageWords))
    }
  } catch (e) {
    console.log(e)
  }
}

export const setSprintGameStats = (params: IStats, data: string, gameType: string) => async () => {
  const userInfo = localStorage.getItem('userInfo') as string
  const { token, userId } = JSON.parse(userInfo)
  console.log(userId)
  const obj = {
    learnedWords: params.learnedWords,
    optional: params.optional,
  }
  localStorage.removeItem('newWords')
  localStorage.removeItem('rightOrwrong')
  localStorage.removeItem('rightAnswers')
  localStorage.removeItem('totalWords')
  const responseStat = fetch(
    `http://localhost:8088/users/${userId}/statistics`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(async (response) => {
    if (response.ok) {
      return response.json()
    } if (response.status === 404) {
      const emptyData = await fetch(
        `http://localhost:8088/users/${userId}/statistics`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            learnedWords: 0,
            optional: {
              sprintGame: {
                d0: {
                  answerSet: null,
                  newWords: null,
                  rightAnswers: null,
                  totalWords: null,
                },
              },
              audioGame: {
                d0: {
                  answerSet: null,
                  newWords: null,
                  rightAnswers: null,
                  totalWords: null,
                },
              },
            },
          }),
        },
      )
      return emptyData.json()
    } return Promise.reject(new Error(`some other error: ${response.status}`))
  }).catch((error) => console.log('error is', error))
  const serverData: UserStat = await responseStat
  delete serverData.id
  // eslint-disable-next-line no-prototype-builtins
  if (gameType === 'sprintGame' && Object.keys(serverData.optional.sprintGame!).indexOf(data) > -1) {
    const {
      newWords,
      rightAnswers,
      totalWords,
      answerSet,
    } = serverData.optional.sprintGame![data]

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (obj.optional.sprintGame?.[data].newWords) obj.optional.sprintGame[data].newWords += newWords
    if (obj.optional.sprintGame?.[data].rightAnswers) obj.optional.sprintGame[data].rightAnswers += rightAnswers
    if (obj.optional.sprintGame?.[data].totalWords) obj.optional.sprintGame[data].totalWords += totalWords
    if (obj.optional.sprintGame?.[data].answerSet && answerSet > obj.optional.sprintGame?.[data].answerSet) obj.optional.sprintGame[data].answerSet = answerSet
    const body = mergeDeep(serverData, obj)
    await fetch(
      `http://localhost:8088/users/${userId}/statistics`,
      {
        method: params.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    ).catch((error) => console.log('error is', error))
  } else {
    const body = mergeDeep(serverData, obj)
    await fetch(
      `http://localhost:8088/users/${userId}/statistics`,
      {
        method: params.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    ).catch((error) => console.log('error is', error))
  }
  // eslint-disable-next-line no-prototype-builtins
  if (gameType === 'audioGame' && Object.keys(serverData.optional.audioGame!).indexOf(data) > -1) {
    const {
      newWords,
      rightAnswers,
      totalWords,
      answerSet,
    } = serverData.optional.audioGame![data]

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (obj.optional.audioGame?.[data].newWords) obj.optional.audioGame[data].newWords += newWords
    if (obj.optional.audioGame?.[data].rightAnswers) obj.optional.audioGame[data].rightAnswers += rightAnswers
    if (obj.optional.audioGame?.[data].totalWords) obj.optional.audioGame[data].totalWords += totalWords
    if (obj.optional.audioGame?.[data].answerSet && answerSet > obj.optional.audioGame?.[data].answerSet) obj.optional.audioGame[data].answerSet = answerSet
    const body = mergeDeep(serverData, obj)
    await fetch(
      `http://localhost:8088/users/${userId}/statistics`,
      {
        method: params.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    ).catch((error) => console.log('error is', error))
  } else {
    const body = mergeDeep(serverData, obj)
    await fetch(
      `http://localhost:8088/users/${userId}/statistics`,
      {
        method: params.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    ).catch((error) => console.log('error is', error))
  }
}
