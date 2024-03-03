import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

/**
 * Component representing an information table.
 * @param {Object} props - The props object containing various parameters.
 * @param {number} [props.count=0] - The total count of items.
 * @param {Array} [props.items=[]] - An array containing items to be displayed in the table.
 * @param {Function} props.onDeselectAll - Function to handle deselecting all items.
 * @param {Function} props.onDeselectOne - Function to handle deselecting a single item.
 * @param {Function} [props.onPageChange=()=>{}] - Function to handle page change.
 * @param {Function} props.onRowsPerPageChange - Function to handle change in rows per page.
 * @param {Function} props.onSelectAll - Function to handle selecting all items.
 * @param {Function} props.onSelectOne - Function to handle selecting a single item.
 * @param {number} [props.page=0] - The current page number.
 * @param {number} [props.rowsPerPage=0] - The number of rows per page.
 * @param {Array} [props.selected=[]] - An array containing IDs of selected items.
 * @returns {JSX.Element} - Returns JSX for rendering the information table.
 */
export const InformationTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Signed Up
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.address.city}, {customer.address.state}, {customer.address.country}
                    </TableCell>
                    <TableCell>
                      {customer.phone}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

/**
 * PropTypes for the InformationTable component.
 * @type {Object}
 * @property {number} [count] - The total count of items.
 * @property {Array} [items] - An array containing items to be displayed in the table.
 * @property {Function} onDeselectAll - Function to handle deselecting all items.
 * @property {Function} onDeselectOne - Function to handle deselecting a single item.
 * @property {Function} [onPageChange] - Function to handle page change.
 * @property {Function} onRowsPerPageChange - Function to handle change in rows per page.
 * @property {Function} onSelectAll - Function to handle selecting all items.
 * @property {Function} onSelectOne - Function to handle selecting a single item.
 * @property {number} [page] - The current page number.
 * @property {number} [rowsPerPage] - The number of rows per page.
 * @property {Array} [selected] - An array containing IDs of selected items.
 */
InformationTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
