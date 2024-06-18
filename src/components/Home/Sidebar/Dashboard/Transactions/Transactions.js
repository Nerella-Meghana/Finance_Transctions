
import React, { useState, useEffect, useCallback } from 'react';
import { Drawer, IconButton, Snackbar, Fade } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { finappaxios } from "../../../../../axios";
import AddNew from './AddNew';
const ActionsCell = ({ onEdit, onDelete, id }) => (
  <div>
    <button
      key={`edit_${id}`}
      onClick={onEdit}
      className="p-2 text-blue-500 hover:text-blue-700"
    >
      ✏️
    </button>
    <button
      key={`delete_${id}`}
      onClick={onDelete}
      className="p-2 text-red-500 hover:text-red-700"
    >
      🗑️
    </button>
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
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const token = localStorage.getItem('token');

  const columns = [
    { field: 'description', headerName: 'Description', width: 280 },
    { field: 'date', headerName: 'Date', width: 400 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'actions', headerName: 'Actions', width: 200,
      renderCell: (params) => (
        <ActionsCell
          id={params.row.id}
          onEdit={() => handleEdit(params.row.id)}
          onDelete={() => handleDelete(params.row.id)}
        />
      )
    },
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
        setIsToastOpen(true); // Open the toast message
        setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
      })
      .catch(error => {
        console.error("Error deleting:", error);
        setToastMessage("Error deleting transaction");
        setIsToastOpen(true); // Open the toast message for error
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

  const filteredTransactions = transactions.filter(transaction =>
    (transaction.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (transaction.date || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (transaction.amount !== undefined ? transaction.amount.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) ||
    (transaction.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (transaction.status || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditId(null);
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsToastOpen(false);
  };

  return (
    <div className="ml-0 mt-[-5px] mr-5">
      <div className="max-w-full mx-auto">
        <h1 className="text-2xl text-indigo-900 font-semibold mb-3">Transactions</h1>
        <div className="flex justify-between items-center mb-3">
          <input
            type="text"
            className="border rounded-full px-1 py-1 mr-4"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select className="border rounded-full px-2 py-1 mr-4">
            <option value="">Transaction Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <select className="border rounded-full px-2 py-1 mr-4">
            <option value="">All Status</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            className="bg-blue-500 text-white rounded px-3 py-1"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add New
          </button>
        </div>
        <div className="bg-white overflow-hidden">
          <div className="max-h-80 overflow-y-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.field}
                      className="text-left px-3 py-3 bg-rose-50 items-center"
                      style={{ width: col.width }}
                    >
                      {col.headerName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    {columns.map((col) => (
                      <td
                        key={col.field}
                        className="px-3 py-0 border-b border-gray-200"
                      >
                        {col.field === 'actions'
                          ? col.renderCell({ row: transaction })
                          : transaction[col.field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {confirmationMessage && (
        <ConfirmationPopup
          message={confirmationMessage}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmationMessage('')}
        />
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <div className="w-30 pt-5 pl-10 pr-10" style={{ position: 'relative' }}>
          <IconButton onClick={handleDrawerClose} style={{ position: 'absolute', right: 0 }}>
            <CloseIcon />
          </IconButton>
          <AddNew editId={editId} onClose={handleDrawerClose} />
        </div>
      </Drawer>

      {/* Snackbar for toast message */}
      {/* <Snackbar
        open={isToastOpen}
        autoHideDuration={3000} // Adjust duration as needed (milliseconds)
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Fade} // Use Fade for the transition effect
        TransitionProps={{ timeout: 600 }} // Customize transition timing (milliseconds)
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleToastClose}
          severity={toastMessage === "Deleted successfully" ? "success" : "error"} // Severity can be 'success', 'error', 'warning', 'info'
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </MuiAlert>
      </Snackbar> */}
      <Snackbar
  open={isToastOpen}
  autoHideDuration={1000} // Adjust duration as needed (milliseconds)
  onClose={handleToastClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  TransitionComponent={Fade} // Use Fade for the transition effect
  TransitionProps={{ timeout: { enter:0, exit: 600 } }} // Customize enter and exit transition timing (milliseconds)
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleToastClose}
    severity={toastMessage === "Deleted successfully" ? "success" : "error"} // Severity can be 'success', 'error', 'warning', 'info'
    sx={{ width: '100%' }}
  >
    {toastMessage}
  </MuiAlert>
</Snackbar>

    </div>
  );
};

export default Transactions;


