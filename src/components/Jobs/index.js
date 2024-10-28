import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookie from 'js-cookie'
import ProfileDetails from '../ProfileDetails/index'
import Header from '../Header/index'
import WebPage from '../WebPage/index'
import Employment from '../Employment/index'
import Salary from '../Salary/index'

const staEle = {
  Success: 'SUCCESS',
  Progress: 'INPROGRESS',
  Failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {webDetails: [], status: 'INITIAL', search: '', emp: [], sal: ''}

  webFunc = async () => {
    this.setState({status: staEle.Progress})

    const {search, emp, sal} = this.state
    const mod_emp = emp.join(',')
    const jwtTkn = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtTkn}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${mod_emp}&minimum_package=${sal}&search=${search}`

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      this.setState({status: staEle.Success, webDetails: data.jobs})
    } else {
      this.setState({status: staEle.Failure})
    }
  }

  empFunc = emId => {
    const {emp} = this.state
    const res = [...emp, emId]
    this.setState({emp: res}, this.webFunc)
  }

  salFunc = salId => {
    this.setState({sal: salId}, this.webFunc)
  }

  LoaderFunc = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noJobs = () => (
    <div className="mCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobs"
      />
    </div>
  )

  componentDidMount() {
    this.webFunc()
  }

  successFunc = () => {
    const {webDetails} = this.state

    return (
      <ul className="unLis">
        {webDetails.length !== 0
          ? webDetails.map(i => <WebPage item={i} key={i.id} />)
          : this.noJobs()}
      </ul>
    )
  }

  callAgain = () => {
    this.webFunc()
  }

  failureFunc = () => (
    <div className="failCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failIm"
      />
      <h1 className="failHead"> Oops! Something Went Wrong </h1>
      <p className="failPara">
        {' '}
        We cannot seem to find the page you are looking for.{' '}
      </p>
      <button className="retryButt1" onClick={this.callAgain}>
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  switchFun = () => {
    const {status} = this.state

    switch (status) {
      case staEle.Success:
        return this.successFunc()
      case staEle.Failure:
        return this.failureFunc()
      case staEle.Progress:
        return this.LoaderFunc()
      default:
        return null
    }
  }

  inputChange = event => {
    this.setState({search: event.target.value})
  }

  recallFunc = () => {
    this.webFunc()
  }

  render() {
    const {search} = this.state

    return (
      <div>
        <Header />
        <div className="big_con">
          <div>
            <ProfileDetails />
            <hr className="hr" />
            <div>
              <h1 className="emHead"> Type of Employment </h1>
              <ul className="un_lis">
                {employmentTypesList.map(i => (
                  <Employment
                    employeeItem={i}
                    key={i.employmentTypeId}
                    empFunc={this.empFunc}
                  />
                ))}
              </ul>
            </div>
            <hr className="hr1" />
            <div>
              <h1 className="emHead"> Salary Range </h1>
              <ul className="un_lis">
                {salaryRangesList.map(i => (
                  <Salary
                    salItem={i}
                    key={i.salaryRangeId}
                    salFunc={this.salFunc}
                  />
                ))}
              </ul>
            </div>
          </div>

          <div className="exCon">
            <div className="inp_con">
              <input
                type="search"
                placeholder="Search"
                id="search"
                className="inp"
                value={search}
                onChange={this.inputChange}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="Icon"
                onClick={this.recallFunc}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.switchFun()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
