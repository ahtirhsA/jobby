import './index.css'
import {Component} from 'react'
import Header from '../Header/index'

class Home extends Component {
  jobPage = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="homeBg">
          <div>
            <h1 className="head">
              Find The Job That <br /> Fits Your Life{' '}
            </h1>
            <p className="p">
              Millions of people are searching for jobs, salary <br />{' '}
              information, company reviews. Find the job that fits your <br />{' '}
              abilities and potential.
            </p>
            <button className="findJob" onClick={this.jobPage}>
              {' '}
              Find Jobs{' '}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
