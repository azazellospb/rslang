export interface IProp {
  id: string,
  num: number
}
export interface IFetchParam {
  textbookSection: string,
  page:number
}
export interface IDescription {
  title: string,
  description: string,
}

// интерфэйс для провереных слов, были в игре

export interface IStudiedWord {
  id?: string | undefined;
  group?: number | undefined;
  page?: number | undefined;
  word?: string | undefined;
  image?: string | undefined;
  audio?: string | undefined;
  audioMeaning?: string | undefined;
  audioExample?: string | undefined;
  textMeaning?: string | undefined;
  textExample?: string | undefined;
  transcription?: string | undefined;
  textExampleTranslate?: string | undefined;
  textMeaningTranslate?: string | undefined;
  wordTranslate?: string | undefined;
  learned?: boolean
}
