import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdEmail} from 'react-icons/md'

const SimilarJob = props => {
  const {simItem} = props
  const {
    company_logo_url,
    employment_type,
    job_description,
    location,
    rating,
    title,
  } = simItem

  return (
    <li className="lisItem1">
      <div className="im_box">
        <img src={company_logo_url} className="comp1" />
        <div>
          <p className="titleJob"> {title} </p>
          <div className="st-ra">
            <FaStar className="star" />
            <p className="rating"> {rating} </p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="desc"> Description </h1>
        <p className="jobDesc"> {job_description} </p>
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
      </ul>
    </li>
  )
}

export default SimilarJob
