import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
 
const TransactionCardSkeleton = () => (
  <Box sx={{ width: '100%', m: 2 }}>
    <Skeleton width="60%" height={30} />
    <Skeleton animation="wave" width="80%" height={30} />
    <Skeleton animation={false} width="70%" height={30} />
  </Box>
);
 
export default TransactionCardSkeleton;
 