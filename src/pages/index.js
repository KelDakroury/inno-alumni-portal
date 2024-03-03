import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewFeatureItem } from 'src/sections/overview/overview-feature-item';
import Link from 'next/link';

// Data for dashboard components
const dashboardComponents = [
  {
    title: 'Network',
    description: 'Find the people you studied with',
    img: "/assets/overview/hand.png",
    link: "/#"
  },
  {
    title: 'Courses',
    description: 'Find and take additional studies specifically for graduates',
    img: "/assets/overview/hat.png",
    link: "/manage_electives"
  },
  {
    title: 'Pass',
    description: 'Get a pass to the university and come visit',
    img: "/assets/overview/lock.png",
    link: "/manage_pass"
  },
  {
    title: 'Donations',
    description: 'Support your alma mater',
    img: "/assets/overview/coins.png",
    link: "/make_donations"
  }
];

/**
 * Page component for the Overview page of the IU Alumni Portal.
 * Renders a list of dashboard components.
 */
const Page = () => (
  <>
    <Head>
      <title>
        Overview | IU Alumni Portal
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        py: 8
      }}
    >
      <Container maxWidth="md">
        <Box
          component="main"
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
            py: 8
          }}
        >
          {/* Map through dashboard components and render OverviewFeatureItem */}
          {dashboardComponents.map((feature, index) => (
            <Link href={feature.link} key={index}>
              <a style={{ textDecoration: "none" }}>
                <OverviewFeatureItem
                  feature={feature}
                  sx={{ height: '100%' }}
                />
              </a>
            </Link>
          ))}
        </Box>
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
