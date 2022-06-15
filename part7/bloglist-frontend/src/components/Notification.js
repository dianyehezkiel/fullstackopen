import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(({ notification }) => notification)

  if (notif.message === null) {
    return null
  }

  return <div className={notif.type}>{notif.message}</div>
}

export default Notification
