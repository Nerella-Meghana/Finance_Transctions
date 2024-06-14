

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
} from '@mui/material';
import {
  DataGrid, GridColDef
} from '@mui/x-data-grid';
import {
  DeleteOutline, ModeEditOutline, Search, Add
} from '@mui/icons-material';
import { finappaxios } from "../../../../../axios";
import DeleteIcon from '@mui/icons-material/Delete';


const ActionsCell = ({ onEdit, onDelete, id }) => (

  
    <div>
    <IconButton
      onClick={onEdit}
      sx={{
        color: 'gray'
         // Light blue color
        }
      }
    >
      <ModeEditOutline />
    </IconButton>
    <IconButton
      onClick={onDelete}
      aria-label="delete" size="small" >
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
    { field: 'description', headerName: 'Description', width: 230 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <ActionsCell
          id={params.row.id}
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
    <Box sx={{ paddingRight: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={8} md={4} >
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                height: '2.0rem', // Adjust height as needed
                '& .MuiOutlinedInput-root': {
                  height: '2.5rem', // Ensures the input field's internal elements adjust height
                },
                '& .MuiInputBase-input': {
                  padding: '0.5rem', // Adjusts the internal padding for the input text
                },
                width: '200px', // Adjust width as needed
              }}
            />
          </Grid>
          <Grid item xs={8} md={3} >
            <Select
              value={transactionTypeFilter}
              onChange={handleTransactionTypeChange}
              displayEmpty
              variant="outlined"
              fullWidth
              sx={{
                height: '2.5rem', // Adjust height as needed
                '& .MuiOutlinedInput-root': {
                  height: '2.5rem', // Ensures the input field's internal elements adjust height
                },
                '& .MuiInputBase-input': {
                  padding: '0.5rem', // Adjusts the internal padding for the input text
                },
                width: '180px', // Adjust width as needed
              }}
            >
              <MenuItem value="">Transaction Type</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expenses">Expenses</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={8} md={3} marginLeft={9}>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              displayEmpty
              variant="outlined"
              fullWidth
              sx={{
                height: '2.5rem', // Adjust height as needed
                '& .MuiOutlinedInput-root': {
                  height: '2.5rem', // Ensures the input field's internal elements adjust height
                },
                '& .MuiInputBase-input': {
                  padding: '0.5rem', // Adjusts the internal padding for the input text
                },
                width: '180px', // Adjust width as needed
              }}
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






