import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'

const status = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'INPROGRESS',
}

class ProfileDetails extends Component {
  state = {profile: {}, sts: 'INITIAL'}

  profileDetails = async () => {
    this.setState({sts: status.progress})
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)

    if (response.ok) {
      const data = await response.json()
      this.setState({profile: data.profile_details, sts: status.success})
    } else {
      this.setState({sts: status.failure})
    }
  }

  componentDidMount() {
    this.profileDetails()
  }

  loaderFunc = () => (
    <div data-testid="loader" className="load">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  onSuccess = () => {
    const {profile} = this.state
    const {name, profile_image_url, short_bio} = profile
    return (
      <div className="pfbg">
        <img src={profile_image_url} className="pfIm" />
        <h1 className="pfName"> {name} </h1>
        <p className="pfPara"> {short_bio} </p>
      </div>
    )
  }

  againCall = () => {
    this.profileDetails()
  }

  onFailure = () => (
    <div className="con">
      <button className="retryButt" onClick={this.againCall}>
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  switchFunc = () => {
    const {sts} = this.state
    switch (sts) {
      case status.success:
        return this.onSuccess()
      case status.progress:
        return this.loaderFunc()
      case status.failure:
        return this.onFailure()
      default:
        return null
    }
  }

  render() {
    return this.switchFunc()
  }
}

export default ProfileDetails

/*
profileFunc = async () => {
    const response = await fetch("https://apis.ccbp.in/profile")
     
    if (response.ok) {
      const data = await response.json()
      console.log(data)

  }

  loaderFunc = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
      </div>
    )
  }
  
  */
