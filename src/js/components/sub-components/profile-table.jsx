import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Typography } from '@mui/material';

const ProfileTable = ({ email, username, first_name, last_name, info }) => {
    return (
        <TableContainer>
          <Table>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Email:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{email}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Username:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{username}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">First Name:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{first_name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Last Name:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{last_name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Info:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{info}</Typography>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
    )
}

export default ProfileTable;