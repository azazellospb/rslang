import React from 'react'
import GitLogo from './GitLogo'
import RSLogo from './RSLogo'

export interface IPropObj {
  title: string,
  role: string,
  imgUrl: string,
  gitUrl: string,
  rssUrl: string
  country: string,
  about: string,
}

function MemberCard(obj: IPropObj) {
  const {
    title, role, imgUrl, gitUrl, rssUrl, country, about,
  } = obj
  return (
    <section className="card">
      <div className="member-card-image-container">
        <img className="member-image" src={imgUrl} alt="Leonardo" />
      </div>
      <div className="about-member-container">
        <h2 className="member-info member-name">
          {' '}
          {title}
          {', '}
          {country}
          {' '}
        </h2>
        <h3 className="member-info member-role">{role}</h3>
        <span className="member-info member-info">{about}</span>
      </div>
      <div className="logo-block">
        <GitLogo href={gitUrl} />
        <RSLogo href={rssUrl} />
      </div>
    </section>
  )
}
export default MemberCard
