import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {matchesData: [], isLoading: true}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const result = await fetch('https://apis.ccbp.in/ipl')
    const data = result.json()
    const formattedData = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({matchesData: formattedData, isLoading: false})
  }

  render() {
    const {matchesData, isLoading} = this.state
    return (
      <div className="bg">
        <div className="pro">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          matchesData.map(each => <TeamCard key={each.id} details={each} />)
        )}
      </div>
    )
  }
}

export default Home
