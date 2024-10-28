import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

const Header = props => {
  const logOutFunc = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="headerCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="im"
      />
      <ul className="ul">
        <Link to="/" className="lin">
          <li className="li">Home</li>
        </Link>
        <Link to="/jobs" className="lin">
          <li className="li">Jobs</li>
        </Link>
      </ul>
      <button className="lgButt" onClick={logOutFunc}>
        {' '}
        Logout{' '}
      </button>
    </nav>
  )
}

export default withRouter(Header)
