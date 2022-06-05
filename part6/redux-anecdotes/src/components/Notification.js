import { useSelector } from "react-redux"

const Notification = ({ message }) => {
  const notification = useSelector(({ notification }) => notification)

  const display = notification ? '' : 'none'

  const style = {
    display,
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification