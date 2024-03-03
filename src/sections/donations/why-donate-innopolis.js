import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Card,
    Typography
} from '@mui/material';
import { getAdminDonationText } from '../../api';

/**
 * Component for displaying reasons for donating to Innopolis University.
 * @returns {JSX.Element} - Returns JSX for displaying reasons for donating.
 */
export const WhyDonateInnopolis = () => {
    const [donationText, setDonationText] = useState("Loading...")

    /**
     * Function to fetch admin donation text.
     */
    const handleGetAdminDonationText = async () => {
        const { message } = await getAdminDonationText()
        setDonationText(message)
    }

    useEffect(() => {
        handleGetAdminDonationText();
    }, [])

    return (
        <div>
            <Card sx={{ mb: 1 }}>
                <Box sx={{ p: 5 }}>
                    <div>
                        <Typography
                            variant="h5"
                            component="h2"
                        >
                            Why and for what do we need donations?
                        </Typography>
                        <div dangerouslySetInnerHTML={{ __html: donationText }}>
                        </div>
                    </div>
                </Box>
            </Card>
        </div>
    );
};
