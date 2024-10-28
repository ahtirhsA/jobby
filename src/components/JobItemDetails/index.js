import './index.css'
import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import SuccessPage from '../SuccessPage/index'
import Header from '../Header/index'
import SimilarJob from '../SimilarJob/index'

const st = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {jobItem: {}, currently: 'INITIAL'}

  ItemDetails = async () => {
    this.setState({currently: st.progress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const tokn = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokn}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      this.setState({currently: st.success, jobItem: data})
    } else {
      this.setState({currently: st.failure})
    }
  }

  loaderFunction = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  success = () => {
    const {jobItem} = this.state
    const {job_details, similar_jobs} = jobItem

    return (
      <div className="container">
        <SuccessPage jobDetails={job_details} key={job_details.id} />
        <h1 className="Simhead"> Similar Jobs </h1>
        <un className="unorderedList">
          {similar_jobs.map(i => (
            <SimilarJob simItem={i} key={i.id} />
          ))}
        </un>
      </div>
    )
  }

  clAgain = () => {
    this.ItemDetails()
  }

  failure = () => (
    <div className="failCon1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failIm1"
      />
      <h1 className="failHead"> Oops! Something Went Wrong </h1>
      <p className="failPara">
        {' '}
        We cannot seem to find the page you are looking for.{' '}
      </p>
      <button className="retryButt2" onClick={this.clAgain}>
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  switchFunction = () => {
    const {currently} = this.state

    switch (currently) {
      case st.success:
        return this.success()
      case st.failure:
        return this.failure()
      case st.progress:
        return this.loaderFunction()
      default:
        return null
    }
  }

  componentDidMount() {
    this.ItemDetails()
  }

  render() {
    return (
      <div>
        <Header />
        {this.switchFunction()}
      </div>
    )
  }
}

export default JobItemDetails
