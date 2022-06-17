import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import { addComment } from '../reducers/blogsReducer'

const Comments = ({ id, comments }) => {
  const [newComment, setNewComment] = useState('')

  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment(id, { comment: newComment }))
    setNewComment('')
  }

  return (
    <Box>
      <Typography
        sx={{
          mt: '16px',
          mb: '8px',
          fontWeight: 'bold',
        }}
        component="h4"
        variant="body1"
      >
        Comments
      </Typography>
      <Box
        sx={{
          width: {
            xs: '100%',
            md: '50%',
          },
        }}
        component="form"
        onSubmit={handleComment}
      >
        <TextField
          sx={{
            width: '100%',
          }}
          hiddenLabel
          multiline
          rows={2}
          variant="filled"
          name="inputComment"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <Button
          sx={{
            display: 'block',
            ml: 'auto',
            mr: '0',
            mt: '4px',
          }}
          color="success"
          variant="contained"
          type="submit"
        >
          Sent
        </Button>
      </Box>
      {comments.length === 0 ? (
        <Typography component="i" variant="body2">
          Be the first to comment!!
        </Typography>
      ) : (
        <List>
          {comments.map((comment, index) => (
            <ListItem key={id + index} sx={{ alignItems: 'flex-start' }}>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText sx={{ mt: '0' }}>{comment}</ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

export default Comments
