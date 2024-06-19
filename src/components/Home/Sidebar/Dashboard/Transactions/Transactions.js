
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Drawer, Snackbar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ModeEditOutline, Search, Add, Close as CloseIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import { finappaxios } from "../../../../../axios";
import AddNew from './AddNew';
import Navbar from '../../Navbar/Navbar';
import TransactionCardSkeleton from './TransactionCardSkeleton';

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

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded shadow-lg">
      <p>{message}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white rounded px-3 py-1"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white rounded px-3 py-1"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

const Transactions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

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
    setEditId(editId);
    setIsDrawerOpen(true);
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
        console.log("Delete response:", response);
        setToastMessage("Deleted successfully");
        setIsToastOpen(true);
        setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
        fetchTransactions(); 
      })
      .catch(error => {
        console.error("Error deleting:", error);
        setToastMessage("Error deleting transaction");
        setIsToastOpen(true);
      })
      .finally(() => {
        setConfirmationMessage('');
        setDeleteId(null);
      });
  };

  const fetchTransactions = useCallback(async () => {
    setLoadingTransactions(true);
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
    } finally {
      setLoadingTransactions(false);
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

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditId(null);
    fetchTransactions();
  };

  return (
    <Box className="px-4">
      <Toolbar className="flex justify-between ">
        <Typography variant="h5" component="div">
          Transactions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Add New
        </Button>
      </Toolbar>
      
      <Box className="mb-2">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              style={{ borderRadius: '20px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Select
              value={transactionTypeFilter}
              onChange={handleTransactionTypeChange}
              displayEmpty
              variant="outlined"
              size="small"
            >
              <MenuItem value="">Transaction Type</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expenses">Expenses</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              displayEmpty
              variant="outlined"
              size="small"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>
      
      {loadingTransactions ? (
        <Box className="flex flex-col items-center">
          {[...Array(5)].map((_, index) => (
            <TransactionCardSkeleton key={index} />
          ))}
        </Box>
      ) : (
        <div style={{ height: 350, width: '100%' }}>
          <DataGrid
            rows={filteredTransactions.slice(page * pageSize, (page + 1) * pageSize)}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            rowHeight={40}
          />
        </div>
      )}
      
      {confirmationMessage && (
        <ConfirmationPopup
          message={confirmationMessage}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmationMessage('')}
        />
      )}
      
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div className="w-30 pt-5 pl-10 pr-10 mr-2" style={{ position: 'relative' }}>
          <IconButton onClick={handleDrawerClose} style={{ position: 'absolute', right: 0,  marginTop:50,marginRight:20}}>
            <CloseIcon />
          </IconButton>
          <AddNew editId={editId} onClose={handleDrawerClose} />
        </div>
      </Drawer>
      
      <Snackbar
        open={isToastOpen}
        autoHideDuration={2000}
        onClose={() => setIsToastOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setIsToastOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Transactions;




