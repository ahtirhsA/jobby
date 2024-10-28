import './index.css'

const Salary = props => {
  const {salItem, salFunc} = props
  const {label, salaryRangeId} = salItem
  const salary = () => {
    salFunc(salaryRangeId)
  }

  return (
    <li className="liss1">
      <div className="labelCon1">
        <input
          type="radio"
          id={salaryRangeId}
          className="checkBox1"
          name="salary"
          onChange={salary}
        />
        <label className="label1" htmlFor={salaryRangeId}>
          {' '}
          {label}{' '}
        </label>
      </div>
    </li>
  )
}

export default Salary
