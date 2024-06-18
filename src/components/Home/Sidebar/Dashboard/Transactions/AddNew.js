
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { finappaxios } from '../../../../../axios';

// const Popup = ({ message, onClose }) => (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
//       <p className="text-xl font-semibold">{message}</p>
//       <button
//         onClick={onClose}
//         className="mt-6 bg-blue-500 text-white rounded-lg px-6 py-2 text-lg"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// );

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
//   const [popupMessage, setPopupMessage] = useState('');
//   const token = localStorage.getItem('token');

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
//         setPopupMessage(editId || id ? 'Transaction updated successfully' : 'Transaction added successfully');
//         setTimeout(() => {
//           onClose(); // Close the drawer
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Error saving transaction:', error);
//       setPopupMessage('Error saving transaction');
//     }
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
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-md"
//             >
//               {editId || id ? 'Update' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </div>
//       {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
//     </div>
//   );
// };

// export default AddNew;




// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { finappaxios } from '../../../../../axios';

// const Popup = ({ message, onClose }) => (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
//       <p className="text-xl font-semibold">{message}</p>
//       <button
//         onClick={onClose}
//         className="mt-6 bg-blue-500 text-white rounded-lg px-6 py-2 text-lg"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// );

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
//   const [popupMessage, setPopupMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem('token');

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
//         setPopupMessage(editId || id ? 'Transaction updated successfully' : 'Transaction added successfully');
//         setTimeout(() => {
//           onClose(); // Close the drawer
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Error saving transaction:', error);
//       setPopupMessage('Error saving transaction');
//     } finally {
//       setIsLoading(false);
//     }
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
//             <button
//               type="submit"
//               className={`px-6 py-2 ${isLoading ? 'bg-blue-600 opacity-50' : 'bg-blue-600'} text-white rounded-md flex items-center justify-center`}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : (
//                 editId || id ? 'Update' : 'Add'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//       {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
//     </div>
//   );
// };

// export default AddNew;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { finappaxios } from '../../../../../axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const Popup = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
      <p className="text-xl font-semibold">{message}</p>
      <button
        onClick={onClose}
        className="mt-6 bg-blue-500 text-white rounded-lg px-6 py-2 text-lg"
      >
        Close
      </button>
    </div>
  </div>
);

const AddNew = ({ onClose, editId }) => {
  const { id } = useParams();
  const userIDString = localStorage.getItem('user_id_response');
  const userID = parseInt(userIDString, 10);

  const [formData, setFormData] = useState({
    description: '',
    date: '',
    amount: 0,
    type: '',
    status: '',
    userId: userID,
  });
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

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
        setPopupMessage(editId || id ? 'Transaction updated successfully' : 'Transaction added successfully');
        setTimeout(() => {
          onClose(); // Close the drawer
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      setPopupMessage('Error saving transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-xl w-full mx-auto p-8 bg-white rounded-3xl">
        <h1 className="text-2xl font-semibold mb-6 text-left text-indigo-900">
          {editId || id ? 'Edit Transaction' : 'Add Transaction'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-md font-medium text-gray-700 pb-2 ">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 px-3 py-2 w-full border rounded-lg bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>Select Type</option>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 pb-2 ">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 px-3 py-2 w-full border rounded-xl bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 pb-2 ">Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 px-3 py-2 w-full border rounded-xl bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 pb-2 ">Date</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 px-3 py-2 w-full border rounded-xl bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 pb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 px-3 py-2 w-full border rounded-lg bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                width: "50px", // Adjust width as needed
                marginLeft: '22px', // Adjust margin left as needed
                height: '40px', // Adjust height as needed
                bgcolor: '#1A237E',
                '&:hover': {
                  bgcolor: "#1565c0", // Darker blue on hover
                },
                '&:focus': {
                  bgcolor: "#1976d2", // Blue on focus
                },
                '&.Mui-disabled': {
                  bgcolor: "#1976d2", // Blue when disabled
                },
              }}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : (editId || id ? 'Update' : 'Add')}
            </Button>
          </div>
        </form>
      </div>
      {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
    </div>
  );
};

export default AddNew;
