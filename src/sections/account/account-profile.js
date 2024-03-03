import {
  // Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import Avatar from "boring-avatars"; // Importing the Avatar component from 'boring-avatars' library
import { useAuth } from 'src/hooks/use-auth'; // Importing the useAuth hook from 'src/hooks/use-auth'

/**
 * AccountProfile component displays the user's profile information.
 * It includes the user's name, company, city, and telegram handle if available.
 * 
 * @returns {JSX.Element} JSX representation of the AccountProfile component.
 */
export const AccountProfile = () => {
  // Retrieving user data from the useAuth hook
  const { user } = useAuth();

  return (
    // Card component to contain the profile information
    <Card>
      {/* CardContent component to contain the profile details */}
      <CardContent>
        {/* Box component to structure the layout */}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            py: 2
          }}
        >
          {/* Avatar component to display the user's avatar */}
          <span style={{ marginBottom: 12 }}>
            <Avatar
              variant='beam' // Setting the variant of the Avatar component
              size={80} // Setting the size of the Avatar component
              name={user.name} // Setting the name of the Avatar component
            />
          </span>
          {/* Typography component to display the user's name */}
          <Typography
            gutterBottom // Adding bottom gutter to the Typography component
            variant="h5" // Setting the variant of the Typography component
          >
            {user.name} {/* Displaying the user's name */}
          </Typography>
          {/* Conditional rendering of user's company and city */}
          {user.company && user.city && (
            <Typography
              color="text.secondary" // Setting the color of the Typography component
              variant="body2" // Setting the variant of the Typography component
            >
              {user.company}, {user.city} {/* Displaying user's company and city */}
            </Typography>
          )}
          {/* Conditional rendering of user's telegram handle */}
          {user.telegramHandle && (
            <Typography
              color="text.secondary" // Setting the color of the Typography component
              variant="body2" // Setting the variant of the Typography component
            >
              @{user.telegramHandle} {/* Displaying user's telegram handle */}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
