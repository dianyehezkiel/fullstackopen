import { useSelector } from 'react-redux'
import { Alert, Snackbar } from '@mui/material'

const Notification = () => {
  const notif = useSelector(({ notification }) => notification)

  if (notif.message === null) {
    return null
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
    >
      <Alert variant="filled" sx={{ my: '8px' }} severity={notif.type}>
        {notif.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
