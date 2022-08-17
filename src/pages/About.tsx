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
      role: 'Тимлид, руководитель проекта',
      imgUrl: 'https://avatarko.ru/img/avatar/33/TMNT_Leonardo_32374.jpg',
      gitUrl: 'https://github.com/azazellospb',
      rssUrl: 'https://app.rs.school/cv/a37d8652-dd8b-4347-bcf2-efc7fa397e9b',
      country: 'Россия',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus culpa fugit totam cupiditate facere repudiandae voluptatum, temporibus libero harum excepturi dolorem autem, nulla voluptates inventore, sequi error quod eius unde!',
    }, {
      title: 'Максим Дуднев',
      role: 'Страший научный сотрудник, заместитель руководителя проекта',
      imgUrl: 'https://avatarko.ru/img/avatar/33/TMNT_Raphael_32558.jpg',
      gitUrl: 'https://github.com/maks-1987',
      rssUrl: 'https://maks-1987.github.io/rsschool-cv/',
      country: 'Украина',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus culpa fugit totam cupiditate facere repudiandae voluptatum, temporibus libero harum excepturi dolorem autem, nulla voluptates inventore, sequi error quod eius unde!',

    }, {
      title: 'Денис Матвеев',
      role: 'Младший научный сотрудник',
      imgUrl: 'https://avatarko.ru/img/avatar/32/TMNT_Michelangelo_31937.jpg',
      gitUrl: 'https://github.com/matvey84',
      rssUrl: 'https://app.rs.school/cv/089a2f21-f636-4cff-8e97-4166a9b32019',
      country: 'Беларусь',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus culpa fugit totam cupiditate facere repudiandae voluptatum, temporibus libero harum excepturi dolorem autem, nulla voluptates inventore, sequi error quod eius unde!',
    }]
  return (
    <section className="about-page">
      <div className="about-page-container">
        <h2 className="about-page-title">О команде!</h2>
        {members.map((item, index) => (
          //TODO: НАДО РАЗОБРАТЬСЯ КАК ПЕРЕДАВАТЬ ПРОПСЫ ИЗ МАССИВА - ПОЛНОСТЬЮ, НЕ ПО ПОЛЯМ!
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
    </section>
  )
}
