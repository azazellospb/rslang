import { IUnlearnedWord, IWord } from '../../../types/models'
import { audioGameSlice, ILearnedWord } from '../../redux/reducers/audioGameSlice'
// import { gameScore } from '../../redux/reducers/sprintGameSlice'
import { AppDispatchState } from '../../redux/store'
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
const createLearnedWordAndPutItToArr =
  (currentWord: IWord | null | undefined | IUnlearnedWord, examination: boolean) => (dispatch: AppDispatchState) => {
    const examsWord: ILearnedWord = {
      ...currentWord,
      learned: examination,
    }
    // examination && dispatch(gameScore())
    dispatch(audioGameSlice.actions.learnedWord(examsWord))
  }

export default createLearnedWordAndPutItToArr
