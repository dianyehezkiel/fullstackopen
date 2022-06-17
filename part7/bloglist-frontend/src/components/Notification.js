import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notif = useSelector(({ notification }) => notification)

  if (notif.message === null) {
    return null
  }

  return (
    <Alert sx={{ my: '8px' }} severity={notif.type}>
      {notif.message}
    </Alert>
  )
}

export default Notification
