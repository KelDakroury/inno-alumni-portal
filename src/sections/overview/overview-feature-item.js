import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Typography
} from '@mui/material';

/**
 * Component for rendering an overview feature item.
 * @param {Object} props - Component props.
 * @param {Object} props.feature - Feature object containing title, description, and img properties.
 * @param {Object} props.sx - Styles object.
 * @returns {JSX.Element} - JSX for overview feature item.
 */
export const OverviewFeatureItem = (props) => {
  const { feature = {}, sx } = props;

  return (
    <Card sx={{ ...sx, width: 345 }}>
      <Box sx={{ padding: 4, display: 'flex' }}>
        <div>
          <Typography
            gutterBottom
            variant="h5"
            color="#40BA21"
          >
            {feature.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ width: 165 }}
          >
            {feature.description}
          </Typography>
        </div>
        <img style={{ paddingLeft: 15 }}
          alt={`${feature.title} image`}
          src={feature.img} />
      </Box>
    </Card >
  );
};

OverviewFeatureItem.propTypes = {
  feature: PropTypes.object,
  sx: PropTypes.object,
};
