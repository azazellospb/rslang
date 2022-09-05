import { IUnlearnedWord, IWord } from '../../../types/models'
import { audioGameSlice, ILearnedWord } from '../../redux/reducers/audioGameSlice'
import { gameSlice } from '../../redux/reducers/gameSlice'
import { AppDispatchState } from '../../redux/store'
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
const createLearnedWordAndPutItToArr =
  (currentWord: IWord | null | undefined | IUnlearnedWord, examination: boolean) => (
    dispatch: AppDispatchState,
  ) => {
    const examsWord: ILearnedWord = {
      ...currentWord,
      learned: examination,
    }
    dispatch(audioGameSlice.actions.learnedWord(examsWord))
  }

export default createLearnedWordAndPutItToArr

export const refreshAudiogameParams = () => (dispatch: AppDispatchState) => {
  dispatch(gameSlice.actions.fetchGameOver(false))
  dispatch(audioGameSlice.actions.fetchCounterProgress(1))
  dispatch(audioGameSlice.actions.fetchCounterWord(0))
  dispatch(audioGameSlice.actions.learnedWord({}))
  dispatch(audioGameSlice.actions.fetchTotalNumOfWords(20))
  dispatch(audioGameSlice.actions.fetchRightWords(0))
  dispatch(audioGameSlice.actions.setStyles(false))
}
