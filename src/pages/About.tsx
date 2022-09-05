/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import MemberCard from '../components/members-card/Memberscards'
import '../components/members-card/mebersCard.css'

export interface IMemberObj {
  title: string,
  role: string,
  imgUrl: string,
  gitUrl: string,
  rssUrl: string,
  country: string
  about: string
}
export default function About() {
  const members: IMemberObj[] = [
    {
      title: 'Антон Иванов',
      role: 'Team lead',
      imgUrl: 'https://i.postimg.cc/HsTcHTb5/anton.jpg',
      gitUrl: 'https://github.com/azazellospb',
      rssUrl: 'https://app.rs.school/cv/a37d8652-dd8b-4347-bcf2-efc7fa397e9b',
      country: 'Россия',
      about: 'Общее руководство командой, разработал страницы учебника и статистики.',
    }, {
      title: 'Максим Дуднев',
      role: 'Software engineer',
      imgUrl: 'https://i.postimg.cc/26JsGjmt/maxim.jpg',
      gitUrl: 'https://github.com/maks-1987',
      rssUrl: 'https://maks-1987.github.io/rsschool-cv/',
      country: 'Украина',
      about: 'Разработал игру аудиовызов, настроил аутентификацию.',

    }, {
      title: 'Денис Матвеев',
      role: 'Software engineer',
      imgUrl: 'https://i.postimg.cc/k5mLYY0n/denisPNG.png',
      gitUrl: 'https://github.com/matvey84',
      rssUrl: 'https://app.rs.school/cv/089a2f21-f636-4cff-8e97-4166a9b32019',
      country: 'Беларусь',
      about: 'Настроил react и redux, разработал игру спринт.',
    }]
  return (
    <section className="about-page">
      <div className="about-page-container">
        <h2 className="about-page-title">Наша команда</h2>
        <div className="member-card-list">
          {members.map((item, index) => (
            <MemberCard
              key={index}
              imgUrl={item.imgUrl}
              gitUrl={item.gitUrl}
              rssUrl={item.rssUrl}
              country={item.country}
              about={item.about}
              title={item.title}
              role={item.role}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
