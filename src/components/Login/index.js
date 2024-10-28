import './index.css'
import {Component} from 'react'
import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    cls1: 'inp0',
    cls2: 'inp0',
    errMsg: false,
    msg: '',
  }

  UsernameFunc = event => {
    this.setState({username: event.target.value, cls1: 'spl_inp'})
  }

  PasswordFunc = event => {
    this.setState({password: event.target.value, cls2: 'spl_inp'})
  }

  storageFunc = token => {
    Cookie.set('jwt_token', token, {expires: 20})
    const {history} = this.props
    history.replace('/')
  }

  submitFunc = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.storageFunc(data.jwt_token)
    } else {
      const {errMsg} = this.state
      this.setState({errMsg: !errMsg, msg: data.error_msg})
    }
  }

  render() {
    const tk = Cookie.get('jwt_token')
    if (tk !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, cls1, cls2, errMsg, msg} = this.state
    const res = errMsg ? `*${msg}` : ''
    return (
      <div className="bg0">
        <div className="sub_bg0">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="web_logo0"
          />
          <form onSubmit={this.submitFunc}>
            <div className="form_con0">
              <label className="label0" htmlFor="Username">
                {' '}
                USERNAME{' '}
              </label>
              <input
                placeholder="Username"
                id="Username"
                className={`${cls1} form-control`}
                type="text"
                value={username}
                onChange={this.UsernameFunc}
              />
            </div>

            <div className="form_con0">
              <label className="label0" htmlFor="Password">
                {' '}
                PASSWORD{' '}
              </label>
              <input
                placeholder="Password"
                id="Password"
                className={`${cls2} form-control`}
                type="password"
                value={password}
                onChange={this.PasswordFunc}
              />
            </div>

            <button type="submit" className="butt0">
              {' '}
              Login{' '}
            </button>
            <p className="errPara"> {res} </p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

/*
<div className="form_con0">
              <label className="label0" htmlFor="Password">
                {' '}
                PASSWORD{' '}
              </label>
              <input
                placeholder="Password"
                id="Password"
                className={`${cls2} form-control`}
                type="password"
                value={password}
                onChange={this.PasswordFunc}
              />
            </div>

*/
