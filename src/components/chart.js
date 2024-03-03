/**
 * @file chart.js is a file for creating a styled component named Chart using styled from '@mui/material/styles'.
 */

import dynamic from 'next/dynamic'; // Importing dynamic from 'next/dynamic' to dynamically import components
import { styled } from '@mui/material/styles'; // Importing styled from '@mui/material/styles' for styling components

/**
 * Dynamically imports the ApexChart component from 'react-apexcharts'.
 * The ssr option is set to false to prevent server-side rendering,
 * and the loading option is set to render nothing while the component is loading.
 */
const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // Setting ssr option to false to prevent server-side rendering
  loading: () => null // Setting loading option to a function returning null to render nothing while the component is loading
});

/**
 * Creates a styled component named Chart using styled from '@mui/material/styles'.
 * The Chart component is styled using the styled API from Material-UI.
 */
export const Chart = styled(ApexChart)``;
