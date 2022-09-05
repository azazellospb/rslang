import React from 'react'
import GitLogo from './GitLogo'

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
    title, role, imgUrl, about, gitUrl, country,
  } = obj
  return (
    <section className="card">
      <div className="member-card-image-container">
        <img className="member-image" src={imgUrl} alt="Leonardo" />
      </div>
      <div className="about-member-container">
        <h2 className="member-info member-name">
          {title}
        </h2>
        <div>
          {about}
        </div>
        <h3 className="member-info member-role">
          {role}
          {', '}
          {country}
        </h3>
      </div>
      <div className="logo-block">
        <GitLogo href={gitUrl} />
      </div>
    </section>
  )
}
export default MemberCard
