import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Stack } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreatePassRequest } from 'src/sections/request-pass/create-pass-request';
import { PassRequestTable } from 'src/sections/request-pass/pass-request-table';
import { createPassRequest, getPassRequestHistory } from 'src/api';
import { PassRequestInfo } from 'src/sections/request-pass/pass-request-info';

/**
 * Page component for managing pass requests in the IU Alumni Portal.
 * Users can create new pass requests, view pass request information, and view pass request history.
 */
const Page = () => {
  const [passRequests, setPassRequests] = useState([]);

  // Effect to fetch pass request history on component mount
  useEffect(() => {
    const loadPassRequest = async () => {
      const passRequests = await getPassRequestHistory();
      setPassRequests(passRequests);
    };
    loadPassRequest();
  }, []);

  // Function to handle creating a new pass request
  const handleMakeRequest = async ({ request }) => {
    const createdRequest = await createPassRequest({ request });
    setPassRequests((prev) => [...prev, createdRequest.data]);
  };

  return (
    <>
      <Head>
        <title>
          Manage Pass Requests | IU Alumni Portal
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            {/* CreatePassRequest and PassRequestInfo components */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
              <CreatePassRequest sendRequest={handleMakeRequest} />
              <PassRequestInfo />
            </div>
            {/* PassRequestTable component for displaying pass request history */}
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
                <PassRequestTable
                  title="History"
                  subheader="View your request pass history"
                  orders={passRequests}
                  updatePassRequests={setPassRequests}
                />
              </Grid>
            </Grid>
          </Stack>
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
