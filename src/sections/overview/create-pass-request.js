import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TextField, CardContent, Grid,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useCallback, useState } from 'react';

const statusMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error'
};

/**
 * Component for creating a pass request.
 * @param {Object} props - Component props.
 * @param {Array} props.orders - Orders array.
 * @param {Object} props.sx - Styles object.
 * @param {string} props.title - Title string.
 * @returns {JSX.Element} - Returns JSX for creating a pass request.
 */
export const CreatePassRequest = (props) => {
  const { orders = [], sx, title } = props;
  const [values, setValues] = useState({
    firstName: 'Daniel',
    lastName: 'Atonge',
    email: 'd.atonge@innopolis.university',
    phone: '',
    state: 'Innopolis',
    country: 'Russian Federation'
  });

  /**
   * Function to handle input change.
   * @param {Event} event - Change event.
   */
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  /**
   * Function to handle form submission.
   * @param {Event} event - Form submission event.
   */
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

CreatePassRequest.propTypes = {
  orders: PropTypes.array,
  sx: PropTypes.object,
  title: PropTypes.string,
};
