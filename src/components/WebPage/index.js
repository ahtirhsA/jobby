import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdEmail} from 'react-icons/md'
import {Link} from 'react-router-dom'

const WebPage = props => {
  const {item} = props
  const {
    company_logo_url,
    employment_type,
    job_description,
    location,
    package_per_annum,
    rating,
    title,
    id,
  } = item

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="lisItem">
        <div className="im_box">
          <img src={company_logo_url} className="comp" />
          <div>
            <p className="titleJob"> {title} </p>
            <div className="st-ra">
              <FaStar className="star" />
              <p className="rating"> {rating} </p>
            </div>
          </div>
        </div>
        <ul className="ulis">
          <div className="im_box">
            <li className="l">
              <div className="lc_con">
                <MdLocationOn className="location" />
                <p className="locPara"> {location} </p>
              </div>
            </li>

            <li className="l">
              <div className="lc_con">
                <MdEmail className="location" />
                <p className="locPara"> {employment_type} </p>
              </div>
            </li>
          </div>

          <li className="package"> {package_per_annum} </li>
        </ul>
        <hr className="hoz" />
        <div>
          <h1 className="desc"> Description </h1>
          <p className="jobDesc"> {job_description} </p>
        </div>
      </li>
    </Link>
  )
}

export default WebPage
