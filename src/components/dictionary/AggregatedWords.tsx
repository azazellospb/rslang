// /* eslint-disable no-template-curly-in-string */
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { getAggregatedWords } from '../redux/reducers/aggregatedSlice'
// import WordCard from './WordCard'
// import styles from './WordsBunch.module.css'

// export default function AggregatedWords() {
//   const { group = 0, page = 0 } = useParams()
//   // eslint-disable-next-line no-console

//   const pageData = useSelector(getAggregatedWords)
//     .filter((x) => (x.page === +page) && (x.group === +group))

//   return (
//     <div className={styles.wordBlock}>
//       {pageData.map((item) => (
//         // eslint-disable-next-line react/jsx-props-no-spreading
//         <WordCard {...item} />
//       ))}
//     </div>
//   )
// }
