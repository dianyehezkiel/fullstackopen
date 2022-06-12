import { connect } from "react-redux"

const Notification = (props) => {
  const notification = props.notification

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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)