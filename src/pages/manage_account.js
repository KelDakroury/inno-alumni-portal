import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { SettingsPassword } from 'src/sections/account/settings-password';

/**
 * Page component for managing the personal account settings in the IU Alumni Portal.
 * Allows users to view and update their profile details and change their password.
 */
const Page = () => (
  <>
    <Head>
      <title>
        Manage Personal Account | IU Alumni Portal
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* Title */}
          <div>
            <Typography variant="h4">
              Manage Personal Account
            </Typography>
          </div>
          {/* Account details grid */}
          <div>
            <Grid container spacing={3}>
              {/* Account Profile Details */}
              <Grid xs={12} md={12}>
                <AccountProfileDetails />
              </Grid>
              {/* Account Profile */}
              <Grid xs={12} md={6}>
                <AccountProfile />
              </Grid>
              {/* Settings Password */}
              <Grid xs={12} md={6}>
                <SettingsPassword />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

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
