// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { finappaxios } from '../../../../../axios';
// import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';

// const AddNew = ({ onClose, editId }) => {
//   const { id } = useParams();
//   const userIDString = localStorage.getItem('user_id_response');
//   const userID = parseInt(userIDString, 10);

//   const [formData, setFormData] = useState({
//     description: '',
//     date: '',
//     amount: 0,
//     type: '',
//     status: '',
//     userId: userID,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem('token');

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   useEffect(() => {
//     const transactionId = editId || id;
//     if (transactionId) {
//       const fetchTransaction = async () => {
//         try {
//           const config = {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           };
//           const response = await finappaxios.get(`/api/transactions/${transactionId}`, config);
//           setFormData(response.data);
//         } catch (error) {
//           console.error('Error fetching transaction:', error);
//         }
//       };
//       fetchTransaction();
//     }
//   }, [editId, id, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let parsedValue;

//     if (name === 'amount') {
//       const isValidAmount = /^\d+$/.test(value);
//       parsedValue = isValidAmount ? parseInt(value, 10) : '';
//     } else {
//       parsedValue = value;
//     }

//     setFormData({
//       ...formData,
//       [name]: parsedValue,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       let response;
//       if (editId || id) {
//         response = await finappaxios.put(`/api/transactions/${editId || id}`, formData, config);
//       } else {
//         response = await finappaxios.post('/api/transactions', formData, config);
//       }
//       if (response.status === 200 || response.status === 201) {
//         setSnackbar({
//           open: true,
//           message: editId || id ? 'Transaction updated successfully' : 'Transaction added successfully',
//           severity: 'success',
//         });
//         setTimeout(() => {
//           onClose(); // Close the drawer
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Error saving transaction:', error);
//       setSnackbar({
//         open: true,
//         message: 'Error saving transaction',
//         severity: 'error',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="max-w-xl w-full mx-auto p-8 bg-white rounded-3xl">
//         <h1 className="text-2xl font-semibold mb-6 text-left text-indigo-900">
//           {editId || id ? 'Edit Transaction' : 'Add Transaction'}
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-md font-medium text-gray-700 pb-2 ">Type</label>
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="mt-1 px-3 py-2 w-full border rounded-lg bg-gray-200 focus:outline-none"
//               >
//                 <option value="" disabled>Select Type</option>
//                 <option value="Income">Income</option>
//                 <option value="Expenses">Expenses</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-md font-medium text-gray-700 pb-2 ">Description</label>
//               <input
//                 type="text"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="mt-1 px-3 py-2 w-full border rounded-xl bg-gray-200 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-md font-medium text-gray-700 pb-2 ">Amount</label>
//               <input
//                 type="text"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 className="mt-1 px-3 py-2 w-full border rounded-xl bg-gray-200 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-md font-medium text-gray-700 pb-2 ">Date</label>
//               <input
//                 type="datetime-local"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="mt-1 px-3 py-2 w-full border rounded-xl bg-gray-200 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-md font-medium text-gray-700 pb-2">Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="mt-1 px-3 py-2 w-full border rounded-lg bg-gray-200 focus:outline-none"
//               >
//                 <option value="" disabled>Select Status</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Accepted">Accepted</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
//             >
//               Cancel
//             </button>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 width: "85px", // Adjust width as needed
//                 marginLeft: '22px', // Adjust margin left as needed
//                 height: '40px', // Adjust height as needed
//                 bgcolor: '#1A237E',
//                 '&:hover': {
//                   bgcolor: "#1565c0", // Darker blue on hover
//                 },
//                 '&:focus': {
//                   bgcolor: "#1976d2", // Blue on focus
//                 },
//                 '&.Mui-disabled': {
//                   bgcolor: "#1976d2", // Blue when disabled
//                 },
//               }}
//               disabled={isLoading} // Disable button when loading
//             >
//               {isLoading ? <CircularProgress size={24} color="inherit" /> : (editId || id ? 'Update' : 'Add')}
//             </Button>
//           </div>
//         </form>
//       </div>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={2000}
//         onClose={handleSnackbarClose} 
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default AddNew;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';// Ensure this import path is correct based on your project setup
import Alert from '@mui/material/Alert';
import { finappaxios } from '../../../../../axios'; // Adjust the import path as necessary

const AddNew = ({ onClose, editId, fetchTransactions }) => {
  const { id } = useParams();
  const userIDString = localStorage.getItem('user_id_response');
  const userID = parseInt(userIDString, 10);

  const [formData, setFormData] = useState({
    description: '',
    date: '',
    amount: 0,
    type: '',
    status: '',
    source: '',
    categories: '',
    subCategory: '',
    tax: '',
    paymentMethod: '',
    userId: userID,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  }); 

  useEffect(() => {
    const transactionId = editId || id;
    if (transactionId) {
      const fetchTransaction = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await finappaxios.get(`/api/transactions/${transactionId}`, config);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching transaction:', error);
        }
      };
      fetchTransaction();
    }
  }, [editId, id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue;

    if (name === 'amount') {
      const isValidAmount = /^\d+$/.test(value);
      parsedValue = isValidAmount ? parseInt(value, 10) : '';
    } else {
      parsedValue = value;
    }
 
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let response;
      if (editId || id) {
        response = await finappaxios.put(`/api/transactions/${editId || id}`, formData, config);
      } else {
        response = await finappaxios.post('/api/transactions', formData, config);
      }
      if (response.status === 200 || response.status === 201) {
        setSnackbar({
          open: true,
          message: editId || id ? 'Transaction updated successfully' : 'Transaction added successfully',
          severity: 'success',
        });
        fetchTransactions(); // Re-fetch transactions after add/update
        setTimeout(() => {
          onClose(); // Close the drawer
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      setSnackbar({
        open: true,
        message: 'Error saving transaction',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-xl w-full mx-auto p-8 bg-white rounded-3xl">
        <h1 className="text-2xl font-semibold mb-10 text-left text-indigo-900">
          {editId || id ? 'Edit Transaction' : 'Add Transaction'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <TextField
                label="Source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                sx={{
                  '& .MuiInputBase-input': {
                    height: '20px',
                    padding: '15px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                label="Categories"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                label="Sub-Category"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-2xl"
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                type="datetime-local"
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-input': {
                    height: '20px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                select
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                SelectProps={{
                  native: true,
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              >
                <option value="" disabled>Select Type</option>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </TextField>
            </div>
            <div>
              <TextField
                label="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                label="Tax"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                select
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                SelectProps={{
                  native: true,
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              >
                <option value="" disabled>Select Payment</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </TextField>
            </div>
            <div>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mt-1 rounded-xl"
                SelectProps={{
                  native: true,
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              >
                <option value="" disabled>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </TextField>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700"
            >
              Cancel
            </button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                width: '50px',
                marginLeft: '22px',
                height: '40px',
                bgcolor: '#1A237E',
                '&:hover': {
                  bgcolor: '#1565c0',
                },
                '&:focus': {
                  bgcolor: '#1976d2',
                },
                '&.Mui-disabled': {
                  bgcolor: '#1976d2',
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : (editId || id ? 'Update' : 'Add')}
            </Button>
          </div>
        </form>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
 
export default AddNew;
//  }
//     </div>
//   );
// };

// export default AddNew;
