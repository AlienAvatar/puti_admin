import { Box, Chip, useMediaQuery } from '@mui/material';

export const ListActionToolbar = ({ children }) => (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>{children}</Box>
);
