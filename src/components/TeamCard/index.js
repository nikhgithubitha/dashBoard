import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {details} = props
  const {id, name, teamImageUrl} = details

  return (
    <Link to={`/team-matches/${id}`} className="item-link">
      <div className="container">
        <img className="item-image" src={teamImageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </Link>
  )
}

export default TeamCard
