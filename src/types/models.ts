export interface IWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
}

export interface IUser {
  message: string
  name: string
  refreshToken: string
  token: string
  userId: string
}

export interface IUserLogin {
  name?: string
  email: string
  password: string
}

export interface IAggregatedWords {
  paginatedResults: IUserWord[]
}

export interface IUserWord extends Omit<IWord, 'id'> {
  _id: string
  userWord: UserWordSet
}
interface UserWordSet {
  difficulty: string
  optional: { tries?: number, learned?: boolean }
}
