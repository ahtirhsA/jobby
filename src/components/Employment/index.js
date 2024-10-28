import './index.css'

const Employment = props => {
  const {employeeItem, empFunc} = props
  const {label, employmentTypeId} = employeeItem
  const employ = () => {
    empFunc(employmentTypeId)
  }

  return (
    <li className="liss">
      <div className="labelCon">
        <input
          type="checkbox"
          id={employmentTypeId}
          className="checkBox"
          onChange={employ}
        />
        <label className="label" htmlFor={employmentTypeId}>
          {' '}
          {label}{' '}
        </label>
      </div>
    </li>
  )
}

export default Employment
