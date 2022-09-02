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

export interface ICustomWord {
  id?: string | undefined
  difficulty?: string | undefined
  wordId?: string
  optional?: {
    toLearn?: number,
    rightCounter?: number,
    wrongCounter?: number,
    learned?: boolean,
    dates?: {
      [key: string]: boolean
    }
  }
}

export interface IAggregatedWords {
  paginatedResults: IUnlearnedWord[],
  totalCount: [count: number],

}

export interface IUserWord extends Omit<IWord, 'id'> {
  _id: string
  userWord: UserWordSet
}

export interface IUnlearnedWord {
  id?: string
  _id: string
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
  userWord?: {
    difficulty?: string,
    optional?: {
      toLearn?: number,
      rightCounter?: number,
      wrongCounter?: number,
      learned?: boolean,
      dates?: {
        [key: string]: boolean
      }
    }
  }
}

interface UserWordSet {
  difficulty: string
  optional: { rightCounter?: number, learned?: boolean }
}

export interface IParams extends ICustomWord {
  method?: string,
  body?: ICustomWord,
}

export interface IStats extends UserStat {
  method: string,
}

export interface UserStat {
  id?: string
  learnedWords: number
  optional: {
    audioGame?: {
      [key: string]: DataStats
    },
    sprintGame?:{
      [key: string]: DataStats
    }
  }
}
interface DataStats {
  answerSet: number,
  newWords: number,
  rightAnswers: number,
  totalWords: number,
}
