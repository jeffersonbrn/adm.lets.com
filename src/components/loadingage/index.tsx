import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './index.css'

export default function Spinner() {
    return (
        <div className="spinnerDiv" >
            <Box >
                <CircularProgress />
            </Box>
        </div>
    )
}