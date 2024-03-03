import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { SuggestDonationInterest } from 'src/sections/donations/suggest-donation-interest';
import { PaymentQRCode } from 'src/sections/donations/payment-qrcode';
import { BankDetails } from 'src/sections/donations/bank-details';
import { WhyDonateInnopolis } from 'src/sections/donations/why-donate-innopolis';

/**
 * Page component for the "Make Donations" page of the IU Alumni Portal.
 * Allows users to make donations and provides information on donation methods.
 */
const Page = () => (
  <>
    <Head>
      <title>
        Make Donations | IU Alumni Portal
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
          {/* Donation title */}
          <div>
            <Typography variant="h4">
              Make Donations
            </Typography>
          </div>
          {/* Donation information grid */}
          <div>
            <Grid container spacing={3}>
              {/* Why Donate Innopolis section */}
              <Grid xs={12}>
                <WhyDonateInnopolis />
              </Grid>
              {/* Bank details section */}
              <Grid xs={12} md={6} lg={8}>
                <BankDetails />
              </Grid>
              {/* Payment QR Code and Donation Interest sections */}
              <Grid xs={12} md={6} lg={4}>
                <PaymentQRCode />
                <SuggestDonationInterest />
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
