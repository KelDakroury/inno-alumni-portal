import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { InformationSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { RequestElectiveTable } from 'src/sections/request-elective/request-elective-table';
import { getAllElectiveCourses, getBookedElectiveCourses } from 'src/api';
import { ElectiveRequestTable } from 'src/sections/request-elective/history-elective-request-table';

/**
 * Page component for requesting elective courses in the IU Alumni Portal.
 * Users can view available elective courses, request enrollment, and view their request history.
 */
const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [electives, setElectives] = useState([]);
  const [bookedElectives, setBookedElectives] = useState([]);

  // Function to apply pagination to the list of elective courses
  const useCustomers = (electives, page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(electives, page, rowsPerPage);
      },
      [page, rowsPerPage, electives]
    );
  };
  const electiveForPage = useCustomers(electives, page, rowsPerPage);

  // Function to handle page change
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  // Function to handle rows per page change
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  // Effect to fetch elective courses and booked elective history on component mount
  useEffect(() => {
    const loadElectives = async () => {
      const electiveResponse = await getAllElectiveCourses();
      setElectives(electiveResponse);
      const bookedCourses = await getBookedElectiveCourses();
      setBookedElectives(bookedCourses);
    };
    loadElectives();
  }, []);

  return (
    <>
      <Head>
        <title>
          Request Electives | IU Alumni Portal
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            {/* Request Electives title */}
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Request Electives
                </Typography>
              </Stack>
            </Stack>
            {/* Request Elective Table */}
            <RequestElectiveTable
              updateElectives={setElectives}
              updateBookedElectives={setBookedElectives}
              count={electives.length}
              items={electiveForPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
          {/* Elective Request History Table */}
          <Grid
            container
            gap={3}
            direction="row"
            justifyContent="space-between"
          >
            <Grid
              xs={12}
              md={12}
              style={{ marginTop: 50 }}
            >
              <ElectiveRequestTable
                title="History"
                subheader="View your elective request history"
                orders={bookedElectives}
                updateElectives={setElectives}
                updateBookedElectives={setBookedElectives}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

/**
 * Define the layout for the Page component.
 * @param {ReactNode} page - The child page content.
 * @returns {ReactNode} - The page wrapped with the DashboardLayout.
 */
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
