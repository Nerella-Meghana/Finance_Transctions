

// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@mui/material';
// import {DataGrid, GridColDef} from '@mui/x-data-grid';
// import { ModeEditOutline, Search, Add
// } from '@mui/icons-material';
// import { finappaxios } from "../../../../../axios";
// import DeleteIcon from '@mui/icons-material/Delete';


// const ActionsCell = ({ onEdit, onDelete, id }) => (

  
//     <div>
//     <IconButton
//       onClick={onEdit}
//       sx={{
//         color: 'gray'
//          // Light blue color
//         }
//       }
//     >
//       <ModeEditOutline />
//     </IconButton>
//     <IconButton
//       onClick={onDelete}
//       aria-label="delete" size="small" >
//         <DeleteIcon fontSize="small" />
    
      
//     </IconButton>
//   </div>
// );


// const Popup = ({ message, onClose }) => (
//   <Dialog open onClose={onClose}>
//     <DialogContent>
//       <DialogContentText>{message}</DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose} color="primary">
//         Close
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
//   <Dialog open onClose={onCancel}>
//     <DialogTitle>Confirmation</DialogTitle>
//     <DialogContent>
//       <DialogContentText>{message}</DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onCancel} color="primary">
//         Cancel
//       </Button>
//       <Button onClick={onConfirm} color="secondary">
//         Confirm
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// const Transactions = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [popupMessage, setPopupMessage] = useState('');
//   const [confirmationMessage, setConfirmationMessage] = useState('');
//   const [deleteId, setDeleteId] = useState(null);
//   const [page, setPage] = useState(0); // Current page
//   const [pageSize, setPageSize] = useState(10); // Rows per page

//   const token = localStorage.getItem('token');



//   const columns = [
//     { field: 'description', headerName: 'Description', width: 230 },
//     { field: 'date', headerName: 'Date', width: 200 },
//     { field: 'amount', headerName: 'Amount', width: 130 },
//     { field: 'type', headerName: 'Type', width: 100 },
//     { field: 'status', headerName: 'Status', width: 150 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => (
//         <ActionsCell
//           id={params.row.id}
//           onEdit={() => handleEdit(params.row.id)}
//           onDelete={() => handleDelete(params.row.id)}
//         />
//       )
//     }
//   ];

//   const handleEdit = (editId) => {
//     navigate(`/add-new/${editId}`);
//   };

//   const handleDelete = (deleteId) => {
//     setDeleteId(deleteId);
//     setConfirmationMessage("Are you sure you want to delete this transaction?");
//   };

//   const confirmDelete = () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     };
//     finappaxios.delete(`/api/transactions/${deleteId}`, config)
//       .then(response => {
//         setPopupMessage("Deleted successfully");
//         setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
//       })
//       .catch(error => {
//         setPopupMessage("Error deleting transaction");
//       })
//       .finally(() => {
//         setConfirmationMessage('');
//         setDeleteId(null);
//       });
//   };

//   const fetchTransactions = useCallback(async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//       const response = await finappaxios.get('/api/transactions', config);
//       setTransactions(response.data);
//     } catch (error) {
//       console.error('Error fetching transaction data:', error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleTransactionTypeChange = (event) => {
//     setTransactionTypeFilter(event.target.value);
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//   };

//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = (
//       transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.amount?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.status?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const matchesType = transactionTypeFilter ? transaction.type?.toLowerCase() === transactionTypeFilter.toLowerCase() : true;
//     const matchesStatus = statusFilter ? transaction.status?.toLowerCase() === statusFilter.toLowerCase() : true;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <Box sx={{ paddingRight: 3 }}>
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Typography variant="h5" component="div">
//           Transactions
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={() => navigate('/add-new')}
//         >
//           Add New
//         </Button>
//       </Toolbar>
//       <Box sx={{ mb: 2 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={8} md={4} >
//             <TextField
//               variant="outlined"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 height: '2.0rem', // Adjust height as needed
//                 '& .MuiOutlinedInput-root': {
//                   height: '2.5rem', // Ensures the input field's internal elements adjust height
//                 },
//                 '& .MuiInputBase-input': {
//                   padding: '0.5rem', // Adjusts the internal padding for the input text
//                 },
//                 width: '200px', // Adjust width as needed
//               }}
//             />
//           </Grid>
//           <Grid item xs={8} md={3} >
//             <Select
//               value={transactionTypeFilter}
//               onChange={handleTransactionTypeChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//               sx={{
//                 height: '2.5rem', // Adjust height as needed
//                 '& .MuiOutlinedInput-root': {
//                   height: '2.5rem', // Ensures the input field's internal elements adjust height
//                 },
//                 '& .MuiInputBase-input': {
//                   padding: '0.5rem', // Adjusts the internal padding for the input text
//                 },
//                 width: '180px', // Adjust width as needed
//               }}
//             >
//               <MenuItem value="">Transaction Type</MenuItem>
//               <MenuItem value="Income">Income</MenuItem>
//               <MenuItem value="Expenses">Expenses</MenuItem>
//             </Select>
//           </Grid>
//           <Grid item xs={8} md={3} marginLeft={9}>
//             <Select
//               value={statusFilter}
//               onChange={handleStatusFilterChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//               sx={{
//                 height: '2.5rem', // Adjust height as needed
//                 '& .MuiOutlinedInput-root': {
//                   height: '2.5rem', // Ensures the input field's internal elements adjust height
//                 },
//                 '& .MuiInputBase-input': {
//                   padding: '0.5rem', // Adjusts the internal padding for the input text
//                 },
//                 width: '180px', // Adjust width as needed
//               }}
//             >
//               <MenuItem value="">All Status</MenuItem>
//               <MenuItem value="Accepted">Accepted</MenuItem>
//               <MenuItem value="Pending">Pending</MenuItem>
//               <MenuItem value="Rejected">Rejected</MenuItem>
              
//             </Select>
//           </Grid>
//         </Grid>
//       </Box>
//       <div style={{ height: 300, width: '100%' }}>
//         <DataGrid
//         rows={filteredTransactions.slice(page * pageSize, (page + 1) * pageSize)}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10 , 15]}
//         checkboxSelection
//       />
    

//       </div>
//       {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
//       {confirmationMessage && (
//         <ConfirmationPopup
//           message={confirmationMessage}
//           onConfirm={confirmDelete}
//           onCancel={() => setConfirmationMessage('')}
//         />
//       )}
//     </Box>
//   );
// };

// export default Transactions;




// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { ModeEditOutline, Search, Add } from '@mui/icons-material';
// import { finappaxios } from '../../../../../axios';
// import DeleteIcon from '@mui/icons-material/Delete';
// import './Transactions.css';

// const ActionsCell = ({ onEdit, onDelete, id }) => (
//   <div>
//     <IconButton onClick={onEdit} sx={{ color: 'gray' }}>
//       <ModeEditOutline />
//     </IconButton>
//     <IconButton onClick={onDelete} aria-label="delete" size="small">
//       <DeleteIcon fontSize="small" />
//     </IconButton>
//   </div>
// );

// const Popup = ({ message, onClose }) => (
//   <Dialog open onClose={onClose}>
//     <DialogContent>
//       <DialogContentText>{message}</DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose} color="primary">
//         Close
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
//   <Dialog open onClose={onCancel}>
//     <DialogTitle>Confirmation</DialogTitle>
//     <DialogContent>
//       <DialogContentText>{message}</DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onCancel} color="primary">
//         Cancel
//       </Button>
//       <Button onClick={onConfirm} color="secondary">
//         Confirm
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// const Transactions = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [popupMessage, setPopupMessage] = useState('');
//   const [confirmationMessage, setConfirmationMessage] = useState('');
//   const [deleteId, setDeleteId] = useState(null);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   const token = localStorage.getItem('token');

//   const columns = [
//     { field: 'description', headerName: 'Description', width: 230 },
//     { field: 'date', headerName: 'Date', width: 200 },
//     { field: 'amount', headerName: 'Amount', width: 130 },
//     { field: 'type', headerName: 'Type', width: 100 },
//     { field: 'status', headerName: 'Status', width: 150 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => (
//         <ActionsCell
//           id={params.row.id}
//           onEdit={() => handleEdit(params.row.id)}
//           onDelete={() => handleDelete(params.row.id)}
//         />
//       )
//     }
//   ];

//   const handleEdit = (editId) => {
//     navigate(`/add-new/${editId}`);
//   };

//   const handleDelete = (deleteId) => {
//     setDeleteId(deleteId);
//     setConfirmationMessage("Are you sure you want to delete this transaction?");
//   };

//   const confirmDelete = () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     };
//     finappaxios.delete(`/api/transactions/${deleteId}`, config)
//       .then(response => {
//         setPopupMessage("Deleted successfully");
//         setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
//       })
//       .catch(error => {
//         setPopupMessage("Error deleting transaction");
//       })
//       .finally(() => {
//         setConfirmationMessage('');
//         setDeleteId(null);
//       });
//   };

//   const fetchTransactions = useCallback(async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//       const response = await finappaxios.get('/api/transactions', config);
//       setTransactions(response.data);
//     } catch (error) {
//       console.error('Error fetching transaction data:', error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleTransactionTypeChange = (event) => {
//     setTransactionTypeFilter(event.target.value);
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//   };

//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = (
//       transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.amount?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.status?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const matchesType = transactionTypeFilter ? transaction.type?.toLowerCase() === transactionTypeFilter.toLowerCase() : true;
//     const matchesStatus = statusFilter ? transaction.status?.toLowerCase() === statusFilter.toLowerCase() : true;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <Box sx={{ paddingRight: 3, paddingLeft: 3 }}>
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//         <Typography variant="h5" component="div">
//           Transactions
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={() => navigate('/add-new')}
//           sx={{ marginTop: { xs: 2, md: 0 } }}
//         >
//           Add New
//         </Button>
//       </Toolbar>
//       <Box sx={{ mb: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <TextField
//               variant="outlined"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Select
//               value={transactionTypeFilter}
//               onChange={handleTransactionTypeChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//             >
//               <MenuItem value="">Transaction Type</MenuItem>
//               <MenuItem value="Income">Income</MenuItem>
//               <MenuItem value="Expenses">Expenses</MenuItem>
//             </Select>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Select
//               value={statusFilter}
//               onChange={handleStatusFilterChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//             >
//               <MenuItem value="">All Status</MenuItem>
//               <MenuItem value="Accepted">Accepted</MenuItem>
//               <MenuItem value="Pending">Pending</MenuItem>
//               <MenuItem value="Rejected">Rejected</MenuItem>
//             </Select>
//           </Grid>
//         </Grid>
//       </Box>
//       <div className="datagrid-container">
//         <DataGrid
//           rows={filteredTransactions.slice(page * pageSize, (page + 1) * pageSize)}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 5 },
//             },
//           }}
//           pageSizeOptions={[5, 10, 15]}
//           checkboxSelection
//           autoHeight
//         />
//       </div>
//       {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
//       {confirmationMessage && (
//         <ConfirmationPopup
//           message={confirmationMessage}
//           onConfirm={confirmDelete}
//           onCancel={() => setConfirmationMessage('')}
//         />
//       )}
//     </Box>
//   );
// };

// export default Transactions;





// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Grid,
//   InputAdornment,
//   MenuItem,
//   Select,
//   TextField,
//   Toolbar,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { ModeEditOutline, Search, Add } from '@mui/icons-material';
// import { finappaxios } from '../../../../../axios';
// import DeleteIcon from '@mui/icons-material/Delete';

// const ActionsCell = ({ onEdit, onDelete, id }) => (
//   <div>
//     <IconButton onClick={onEdit} sx={{ color: 'gray' }}>
//       <ModeEditOutline />
//     </IconButton>
//     <IconButton onClick={onDelete} aria-label="delete" size="small">
//       <DeleteIcon fontSize="small" />
//     </IconButton>
//   </div>
// );

// const Popup = ({ message, onClose }) => (
//   <Dialog open onClose={onClose}>
//     <DialogContent>
//       <DialogContentText>{message}</DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose} color="primary">
//         Close
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
//   <Dialog open onClose={onCancel}>
//     <DialogTitle>Confirmation</DialogTitle>
//     <DialogContent>
//       <DialogContentText>{message}</DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onCancel} color="primary">
//         Cancel
//       </Button>
//       <Button onClick={onConfirm} color="secondary">
//         Confirm
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// const Transactions = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [popupMessage, setPopupMessage] = useState('');
//   const [confirmationMessage, setConfirmationMessage] = useState('');
//   const [deleteId, setDeleteId] = useState(null);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   const token = localStorage.getItem('token');

//   const columns = [
//     { field: 'description', headerName: 'Description', width: 230 },
//     { field: 'date', headerName: 'Date', width: 200 },
//     { field: 'amount', headerName: 'Amount', width: 130 },
//     { field: 'type', headerName: 'Type', width: 100 },
//     { field: 'status', headerName: 'Status', width: 150 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => (
//         <ActionsCell
//           id={params.row.id}
//           onEdit={() => handleEdit(params.row.id)}
//           onDelete={() => handleDelete(params.row.id)}
//         />
//       )
//     }
//   ];

//   const handleEdit = (editId) => {
//     navigate(`/add-new/${editId}`);
//   };

//   const handleDelete = (deleteId) => {
//     setDeleteId(deleteId);
//     setConfirmationMessage("Are you sure you want to delete this transaction?");
//   };

//   const confirmDelete = () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     };
//     finappaxios.delete(`/api/transactions/${deleteId}`, config)
//       .then(response => {
//         setPopupMessage("Deleted successfully");
//         setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
//       })
//       .catch(error => {
//         setPopupMessage("Error deleting transaction");
//       })
//       .finally(() => {
//         setConfirmationMessage('');
//         setDeleteId(null);
//       });
//   };

//   const fetchTransactions = useCallback(async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//       const response = await finappaxios.get('/api/transactions', config);
//       setTransactions(response.data);
//     } catch (error) {
//       console.error('Error fetching transaction data:', error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleTransactionTypeChange = (event) => {
//     setTransactionTypeFilter(event.target.value);
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//   };

//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = (
//       transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.amount?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.status?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const matchesType = transactionTypeFilter ? transaction.type?.toLowerCase() === transactionTypeFilter.toLowerCase() : true;
//     const matchesStatus = statusFilter ? transaction.status?.toLowerCase() === statusFilter.toLowerCase() : true;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 1, md: 3 } }}>
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//         <Typography variant="h5" component="div">
//           Transactions
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={() => navigate('/add-new')}
//           sx={{ mt: { xs: 2, md: 0 } }}
//         >
//           Add New
//         </Button>
//       </Toolbar>
//       <Box sx={{ mb: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <TextField
//               variant="outlined"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Select
//               value={transactionTypeFilter}
//               onChange={handleTransactionTypeChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//             >
//               <MenuItem value="">Transaction Type</MenuItem>
//               <MenuItem value="Income">Income</MenuItem>
//               <MenuItem value="Expenses">Expenses</MenuItem>
//             </Select>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Select
//               value={statusFilter}
//               onChange={handleStatusFilterChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//             >
//               <MenuItem value="">All Status</MenuItem>
//               <MenuItem value="Accepted">Accepted</MenuItem>
//               <MenuItem value="Pending">Pending</MenuItem>
//               <MenuItem value="Rejected">Rejected</MenuItem>
//             </Select>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box sx={{ height: { xs: 'auto', md: 400 }, width: '100%' }}>
//         <DataGrid
//           rows={filteredTransactions.slice(page * pageSize, (page + 1) * pageSize)}
//           columns={columns}
//           pageSizeOptions={[5, 10, 15]}
//           checkboxSelection
//           autoHeight
//         />
//       </Box>
//       {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
//       {confirmationMessage && (
//         <ConfirmationPopup
//           message={confirmationMessage}
//           onConfirm={confirmDelete}
//           onCancel={() => setConfirmationMessage('')}
//         />
//       )}
//     </Box>
//   );
// };

// export default Transactions;


// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { ModeEditOutline, Search, Add } from '@mui/icons-material';
// import { finappaxios } from "../../../../../axios";
// import DeleteIcon from '@mui/icons-material/Delete';
 
// const ActionsCell = ({ onEdit, onDelete, id }) => (
// <div>
// <IconButton
//       onClick={onEdit}
//       className="text-gray-500"
// >
// <ModeEditOutline />
// </IconButton>
// <IconButton
//       onClick={onDelete}
//       aria-label="delete" size="small"
// >
// <DeleteIcon fontSize="small" />
// </IconButton>
// </div>
// );
 
// const Popup = ({ message, onClose }) => (
// <Dialog open onClose={onClose}>
// <DialogContent>
// <DialogContentText>{message}</DialogContentText>
// </DialogContent>
// <DialogActions>
// <Button onClick={onClose} color="primary">
//         Close
// </Button>
// </DialogActions>
// </Dialog>
// );
 
// const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
// <Dialog open onClose={onCancel}>
// <DialogTitle>Confirmation</DialogTitle>
// <DialogContent>
// <DialogContentText>{message}</DialogContentText>
// </DialogContent>
// <DialogActions>
// <Button onClick={onCancel} color="primary">
//         Cancel
// </Button>
// <Button onClick={onConfirm} color="secondary">
//         Confirm
// </Button>
// </DialogActions>
// </Dialog>
// );
 
// const Transactions = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [popupMessage, setPopupMessage] = useState('');
//   const [confirmationMessage, setConfirmationMessage] = useState('');
//   const [deleteId, setDeleteId] = useState(null);
//   const [page, setPage] = useState(0); // Current page
//   const [pageSize, setPageSize] = useState(10); // Rows per page
 
//   const token = localStorage.getItem('token');
 
//   const columns = [
//     { field: 'description', headerName: 'Description', width: 230 },
//     { field: 'date', headerName: 'Date', width: 200 },
//     { field: 'amount', headerName: 'Amount', width: 130 },
//     { field: 'type', headerName: 'Type', width: 100 },
//     { field: 'status', headerName: 'Status', width: 150 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => (
// <ActionsCell
//           id={params.row.id}
//           onEdit={() => handleEdit(params.row.id)}
//           onDelete={() => handleDelete(params.row.id)}
//         />
//       )
//     }
//   ];
 
//   const handleEdit = (editId) => {
//     navigate(`/add-new/${editId}`);
//   };
 
//   const handleDelete = (deleteId) => {
//     setDeleteId(deleteId);
//     setConfirmationMessage("Are you sure you want to delete this transaction?");
//   };
 
//   const confirmDelete = () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     };
//     finappaxios.delete(`/api/transactions/${deleteId}`, config)
//       .then(response => {
//         setPopupMessage("Deleted successfully");
//         setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
//       })
//       .catch(error => {
//         setPopupMessage("Error deleting transaction");
//       })
//       .finally(() => {
//         setConfirmationMessage('');
//         setDeleteId(null);
//       });
//   };
 
//   const fetchTransactions = useCallback(async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//       const response = await finappaxios.get('/api/transactions', config);
//       setTransactions(response.data);
//     } catch (error) {
//       console.error('Error fetching transaction data:', error);
//     }
//   }, [token]);
 
//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);
 
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };
 
//   const handleTransactionTypeChange = (event) => {
//     setTransactionTypeFilter(event.target.value);
//   };
 
//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//   };
 
//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = (
//       transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.amount?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.status?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
 
//     const matchesType = transactionTypeFilter ? transaction.type?.toLowerCase() === transactionTypeFilter.toLowerCase() : true;
//     const matchesStatus = statusFilter ? transaction.status?.toLowerCase() === statusFilter.toLowerCase() : true;
 
//     return matchesSearch && matchesType && matchesStatus;
//   });
 
//   return (
// <Box className="px-4">
// <Toolbar className="flex justify-between">
// <Typography variant="h5" component="div">
//           Transactions
// </Typography>
// <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={() => navigate('/add-new')}
// >
//           Add New
// </Button>
// </Toolbar>
// <Box className="mb-2">
// <Grid container spacing={4}>
// <Grid item xs={12} sm={6} md={4}>
// <TextField
//               variant="outlined"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               fullWidth
//               InputProps={{
//                 startAdornment: (
// <InputAdornment position="start">
// <Search />
// </InputAdornment>
//                 ),
//               }}
//               className="h-10"
//             />
// </Grid>
// <Grid item xs={12} sm={6} md={4}>
// <Select
//               value={transactionTypeFilter}
//               onChange={handleTransactionTypeChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//               className="h-10"
// >
// <MenuItem value="">Transaction Type</MenuItem>
// <MenuItem value="Income">Income</MenuItem>
// <MenuItem value="Expenses">Expenses</MenuItem>
// </Select>
// </Grid>
// <Grid item xs={12} sm={6} md={4}>
// <Select
//               value={statusFilter}
//               onChange={handleStatusFilterChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//               className="h-10"
// >
// <MenuItem value="">All Status</MenuItem>
// <MenuItem value="Accepted">Accepted</MenuItem>
// <MenuItem value="Pending">Pending</MenuItem>
// <MenuItem value="Rejected">Rejected</MenuItem>
// </Select>
// </Grid>
// </Grid>
// </Box>
// <div className="h-96 w-full">
// <DataGrid
//           rows={filteredTransactions.slice(page * pageSize, (page + 1) * pageSize)}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 5 },
//             },
//           }}
//           pageSizeOptions={[5, 10, 15]}
//           checkboxSelection
//         />
// </div>
//       {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
//       {confirmationMessage && (
// <ConfirmationPopup
//           message={confirmationMessage}
//           onConfirm={confirmDelete}
//           onCancel={() => setConfirmationMessage('')}
//         />
//       )}
// </Box>
//   );
// };
 
// export default Transactions;



// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { ModeEditOutline, Search, Add } from '@mui/icons-material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { finappaxios } from "../../../../../axios";

// const ActionsCell = ({ onEdit, onDelete }) => (
//   <div>
//     <IconButton onClick={onEdit} className="text-gray-500">
//       <ModeEditOutline />
//     </IconButton>
//     <IconButton onClick={onDelete} aria-label="delete" size="small">
//       <DeleteIcon fontSize="small" />
//     </IconButton>
//   </div>
// );

// const Popup = ({ message, onClose }) => (
//   <Dialog open onClose={onClose}>
//     <DialogContent>
//       <DialogContentText>{message}</DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose} color="primary">
//         Close
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
//   <Dialog open onClose={onCancel}>
//     <DialogTitle>Confirmation</DialogTitle>
//     <DialogContent>
//       <DialogContentText>{message}</DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onCancel} color="primary">
//         Cancel
//       </Button>
//       <Button onClick={onConfirm} color="secondary">
//         Confirm
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

// const Transactions = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [popupMessage, setPopupMessage] = useState('');
//   const [confirmationMessage, setConfirmationMessage] = useState('');
//   const [deleteId, setDeleteId] = useState(null);
//   const [page, setPage] = useState(0); // Current page
//   const [pageSize, setPageSize] = useState(10); // Rows per page

//   const token = localStorage.getItem('token');

//   const columns = [
//     { field: 'description', headerName: 'Description', width: 1, flex: 1 },
//     { field: 'date', headerName: 'Date', width: 1, flex: 1 },
//     { field: 'amount', headerName: 'Amount', width: 1, flex: 1 },
//     { field: 'type', headerName: 'Type', width: 1, flex: 1 },
//     { field: 'status', headerName: 'Status', width: 1, flex: 1 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150, // Fixed width for Actions column
//       renderCell: (params) => (
//         <ActionsCell
//           onEdit={() => handleEdit(params.row.id)}
//           onDelete={() => handleDelete(params.row.id)}
//         />
//       )
//     }
//   ];

//   const handleEdit = (editId) => {
//     navigate(`/add-new/${editId}`);
//   };

//   const handleDelete = (deleteId) => {
//     setDeleteId(deleteId);
//     setConfirmationMessage("Are you sure you want to delete this transaction?");
//   };

//   const confirmDelete = () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     };
//     finappaxios.delete(`/api/transactions/${deleteId}`, config)
//       .then(response => {
//         setPopupMessage("Deleted successfully");
//         setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
//       })
//       .catch(error => {
//         setPopupMessage("Error deleting transaction");
//       })
//       .finally(() => {
//         setConfirmationMessage('');
//         setDeleteId(null);
//       });
//   };

//   const fetchTransactions = useCallback(async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//       const response = await finappaxios.get('/api/transactions', config);
//       setTransactions(response.data);
//     } catch (error) {
//       console.error('Error fetching transaction data:', error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleTransactionTypeChange = (event) => {
//     setTransactionTypeFilter(event.target.value);
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//   };

//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = (
//       transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.amount?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.status?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const matchesType = transactionTypeFilter ? transaction.type?.toLowerCase() === transactionTypeFilter.toLowerCase() : true;
//     const matchesStatus = statusFilter ? transaction.status?.toLowerCase() === statusFilter.toLowerCase() : true;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <Box className="px-4">
//       <Toolbar className="flex justify-between">
//         <Typography variant="h5" component="div">
//           Transactions
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={() => navigate('/add-new')}
//         >
//           Add New
//         </Button>
//       </Toolbar>
//       <Box className="mb-2">
//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={6} md={4}>
//             <TextField
//               variant="outlined"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//               className="h-10"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Select
//               value={transactionTypeFilter}
//               onChange={handleTransactionTypeChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//               className="h-10"
//             >
//               <MenuItem value="">Transaction Type</MenuItem>
//               <MenuItem value="Income">Income</MenuItem>
//               <MenuItem value="Expenses">Expenses</MenuItem>
//             </Select>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Select
//               value={statusFilter}
//               onChange={handleStatusFilterChange}
//               displayEmpty
//               variant="outlined"
//               fullWidth
//               className="h-10"
//             >
//               <MenuItem value="">All Status</MenuItem>
//               <MenuItem value="Accepted">Accepted</MenuItem>
//               <MenuItem value="Pending">Pending</MenuItem>
//               <MenuItem value="Rejected">Rejected</MenuItem>
//             </Select>
//           </Grid>
//         </Grid>
//       </Box>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={filteredTransactions.slice(page * pageSize, (page + 1) * pageSize)}
//           columns={columns}
//           pageSize={pageSize}
//           rowsPerPageOptions={[5, 10, 15]}
//           pagination
//           checkboxSelection
//         />
//       </div>
//       {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
//       {confirmationMessage && (
//         <ConfirmationPopup
//           message={confirmationMessage}
//           onConfirm={confirmDelete}
//           onCancel={() => setConfirmationMessage('')}
//         />
//       )}
//     </Box>
//   );
// };

// export default Transactions;





import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ModeEditOutline, Search, Add } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { finappaxios } from "../../../../../axios";



const ActionsCell = ({ onEdit, onDelete }) => (
  <div>
    <IconButton onClick={onEdit} className="text-gray-500">
      <ModeEditOutline />
    </IconButton>
    <IconButton onClick={onDelete} aria-label="delete" size="small">
      <DeleteIcon fontSize="small" />
    </IconButton>
  </div>
);

const Popup = ({ message, onClose }) => (
  <Dialog open onClose={onClose}>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
  <Dialog open onClose={onCancel}>
    <DialogTitle>Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="secondary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

const Transactions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0); // Current page
  const [pageSize, setPageSize] = useState(10); // Rows per page

  const token = localStorage.getItem('token');

  const columns = [
    { field: 'description', headerName: 'Description', width: 250, flex: 1 },
    { field: 'date', headerName: 'Date', width: 180, flex: 1 },
    { field: 'amount', headerName: 'Amount', width: 130, flex: 1 },
    { field: 'type', headerName: 'Type', width: 120, flex: 1 },
    { field: 'status', headerName: 'Status', width: 150, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <ActionsCell
          onEdit={() => handleEdit(params.row.id)}
          onDelete={() => handleDelete(params.row.id)}
        />
      )
    }
  ];

  const handleEdit = (editId) => {
    navigate(`/add-new/${editId}`);
  };

  const handleDelete = (deleteId) => {
    setDeleteId(deleteId);
    setConfirmationMessage("Are you sure you want to delete this transaction?");
  };

  const confirmDelete = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    finappaxios.delete(`/api/transactions/${deleteId}`, config)
      .then(response => {
        setPopupMessage("Deleted successfully");
        setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
      })
      .catch(error => {
        setPopupMessage("Error deleting transaction");
      })
      .finally(() => {
        setConfirmationMessage('');
        setDeleteId(null);
      });
  };

  const fetchTransactions = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await finappaxios.get('/api/transactions', config);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionTypeFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = (
      transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesType = transactionTypeFilter ? transaction.type?.toLowerCase() === transactionTypeFilter.toLowerCase() : true;
    const matchesStatus = statusFilter ? transaction.status?.toLowerCase() === statusFilter.toLowerCase() : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Box className="px-4">
      <Toolbar className="flex justify-between">
        <Typography variant="h5" component="div">
        Transactions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate('/add-new')}
        >
          Add New
        </Button>
      </Toolbar>
      <Box className="mb-2">
        <Grid container spacing={2} >
          <Grid item xs={12} sm={6} md={4} >
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              size='small'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="w-1/4 px-2">
            <Select
              value={transactionTypeFilter}
              onChange={handleTransactionTypeChange}
              displayEmpty
              variant="outlined"
              fullWidth
              size='small'
            >
              <MenuItem value="">Transaction Type</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expenses">Expenses</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              displayEmpty
              variant="outlined"
              fullWidth
              size='small'
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
        rows={filteredTransactions.slice(page * pageSize, (page + 1) * pageSize)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10 , 15]}
        checkboxSelection
        rowHeight={40}
      />
      </div>
      {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
      {confirmationMessage && (
        <ConfirmationPopup
          message={confirmationMessage}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmationMessage('')}
        />
      )}
    </Box>
  );
};

export default Transactions;
