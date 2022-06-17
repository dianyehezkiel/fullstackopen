import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableBody,
  TableCell,
} from '@mui/material'
import { initUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const users = useSelector(({ users }) => users)

  return (
    <Box>
      <Typography component="h3" variant="h6">
        Users
      </Typography>
      <TableContainer
        sx={{
          width: {
            xs: '100%',
            md: '50%',
          },
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow hover key={user.id}>
                <TableCell>
                  <Box
                    sx={{ textDecoration: 'none' }}
                    component={Link}
                    to={`/users/${user.id}`}
                  >
                    <Typography component="p" variant="body2">
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography component="p" variant="body2">
                    {user.blogs.length}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users
