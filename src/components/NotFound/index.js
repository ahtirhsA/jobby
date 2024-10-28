import './index.css'

const NotFound = () => (
  <div className="not_found_con">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="nIm"
    />
    <h1 className="nfHead"> Page Not Found </h1>
    <p className="nfPara">
      {' '}
      We are sorry, the page you requested could not be found{' '}
    </p>
  </div>
)

export default NotFound
