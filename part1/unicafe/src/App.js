import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good !== 0 | props.neutral !== 0 | props.bad !== 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.total} />
          <StatisticLine text='average' value={props.average} />
          <StatisticLine text='positive' value={props.positive} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = `${(good / total) * 100} %`

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleClickGood} />
      <Button text='neutral' handleClick={handleClickNeutral} />
      <Button text='bad' handleClick={handleClickBad} />
      <Statistics good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive} />
    </div>
  )
}

export default App