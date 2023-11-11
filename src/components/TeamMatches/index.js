import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getFormattedData = each => ({
    umpires: each.umpires,
    result: each.result,
    manOfTheMatch: each.man_of_the_match,
    id: each.id,
    date: each.date,
    venue: each.venue,
    competingTeam: each.competing_team,
    competingTeamLogo: each.competing_team_logo,
    firstInnings: each.first_innings,
    secondInnings: each.second_innings,
    matchStatus: each.match_status,
  })

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/:${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(each =>
        this.getFormattedData(each),
      ),
    }

    this.setState({blogData: formattedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {blogData} = this.state
    const {recentMatches} = blogData

    return (
      <ul>
        {recentMatches.map(each => (
          <MatchCard key={each.id} matchDetails={each} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {blogData} = this.state
    const {teamBannerUrl, latestMatch} = blogData
    return (
      <div>
        <img src={teamBannerUrl} alt="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
