import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  Modal,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useState } from 'react';
import { deleteElectiveRequest } from '../../api';

/**
 * Map of status values to their corresponding colors.
 * @type {Object}
 */
const statusMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error'
};

/**
 * ElectiveRequestTable component.
 * @param {Object} props - The props for the ElectiveRequestTable component.
 * @param {Array<Object>} props.orders - The array of elective course requests.
 * @param {string} props.title - The title of the ElectiveRequestTable.
 * @param {string} props.subheader - The subheader of the ElectiveRequestTable.
 * @param {Function} props.updateElectives - Function to update elective courses.
 * @param {Function} props.updateBookedElectives - Function to update booked elective courses.
 */
export const ElectiveRequestTable = (props) => {
  const { orders = [], title, subheader, updateElectives, updateBookedElectives } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedRequest, setSelectedRequest] = useState({
    "id": "cljvtv4d00000mzyzwtvijk8d",
    "feedback": "",
    "status": "",
    "course_id": "",
    "created_at": "",
    "elective_course": {
      "description": "",
      "course_name": "",
      "instructor_name": "Evgenii Serochudinov",
      "mode": "OFFLINE"
    }
  });

  /**
   * Handles opening the modal dialog box.
   */
  const handleOpen = () => setOpen(true);

  /**
   * Handles closing the modal dialog box.
   */
  const handleClose = () => setOpen(false);

  /**
   * Handles deleting an elective course request.
   * @param {string} courseRequestId - The ID of the course request to delete.
   */
  const handleRequest = async (courseRequestId) => {
    const requestResponse = await deleteElectiveRequest({ courseRequestId })
    updateElectives((prev) => [...prev, requestResponse.elective_course])
    const newItems = orders.filter(item => item.id !== courseRequestId);
    updateBookedElectives(newItems)
    handleClose()
  }

  return (
    <Card>
      {/* Modal for displaying details of a selected request */}
      <Modal keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: 400, bgcolor: 'background.paper', border: '3px solid #000', borderRadius: 2, boxShadow: 24, p: 4 }}>
          {/* Details of the selected request */}
          <Typography variant="h6" component="h2">Course Name:</Typography>
          <Typography>{selectedRequest.elective_course.course_name}</Typography>

          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>Description:</Typography>
          <Typography>{selectedRequest.elective_course.description}</Typography>

          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>Delivery Mode:</Typography>
          <Typography>{selectedRequest.elective_course.mode}</Typography>

          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>Instructor:</Typography>
          <Typography>{selectedRequest.elective_course.instructor_name}</Typography>

          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>Status:</Typography>
          <Typography>{selectedRequest.status}</Typography>

          {/* Feedback section */}
          {selectedRequest.feedback && (
            <>
              <Typography variant="h6" component="h2" sx={{ mt: 2 }}>Feedback:</Typography>
              <Typography>{selectedRequest.feedback}</Typography>
            </>
          )}

          {/* Buttons for actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button sx={{ mt: 4 }} onClick={handleClose}>Close</Button>
            <Button onClick={() => handleRequest(selectedRequest.id)} sx={{ mt: 4, backgroundColor: '#F47B7B', '&:hover': { backgroundColor: "#F15555" } }} variant="contained">Delete Request</Button>
          </div>
        </Box>
      </Modal>

      {/* Header section */}
      <CardHeader subheader={subheader || "View your history"} title={title || "History"} style={{ paddingLeft: 40 }} />
      <Divider />

      {/* Table section */}
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ paddingLeft: 40 }}>Id</TableCell>
                <TableCell>Requested Elective</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Iterate over elective course requests */}
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell style={{ paddingLeft: 40 }}>{order.id.slice(-6).toUpperCase()}</TableCell>
                  <TableCell>{order?.elective_course?.course_name}</TableCell>
                  <TableCell>{order.created_at.split('T')[0]}</TableCell>
                  <TableCell>
                    {/* Display status with severity pill */}
                    <SeverityPill color={statusMap[order.status]}>{order.status}</SeverityPill>
                  </TableCell>
                  <TableCell>
                    {/* Button to view request details */}
                    <Button onClick={() => { setSelectedRequest(order); handleOpen(); }} startIcon={<SvgIcon fontSize="small"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ height: 16, width: 16 }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></SvgIcon>}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

// Prop types
ElectiveRequestTable.propTypes = {
  orders: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
  updateElectives: PropTypes.func,
  updateBookedElectives: PropTypes.func,
};
