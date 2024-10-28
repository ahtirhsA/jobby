import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdEmail} from 'react-icons/md'
import {BsBoxArrowUpRight} from 'react-icons/bs'

const Skill = props => {
  const {skill} = props
  const {image_url, name} = skill

  return (
    <li className="skCon">
      <img src={image_url} className="skIm" />
      <p className="skPara"> {name} </p>
    </li>
  )
}

const SuccessPage = props => {
  const {jobDetails} = props

  const {
    company_logo_url,
    company_website_url,
    employment_type,
    job_description,
    skills,
    title,
    life_at_company,
    location,
    package_per_annum,
    rating,
  } = jobDetails

  const {image_url, description} = life_at_company

  return (
    <div className="succ">
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
        <div className="hurlCon">
          <h1 className="desc"> Description </h1>
          <div className="im_box">
            <a
              href={company_website_url}
              target="_blank"
              className="visit"
              rel="noreferrer"
            >
              Visit
            </a>
            <BsBoxArrowUpRight className="boxArrow" />
          </div>
        </div>
        <p className="jobDesc"> {job_description} </p>
      </div>
      <h1 className="skill"> Skills </h1>
      <ul className="dupunlis">
        {skills.map(i => (
          <Skill skill={i} key={i.name} />
        ))}
      </ul>
      <h1 className="desc">Life at Company</h1>
      <div className="dCon">
        <p className="jobDesc x"> {description} </p>
        <img src={image_url} className="dim" />
      </div>
    </div>
  )
}

export default SuccessPage
