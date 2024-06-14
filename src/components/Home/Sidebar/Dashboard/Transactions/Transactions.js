// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { finappaxios } from "../../../../../axios";
// import plus from '../../../../../Assets/images/plus.png';
// import search from '../../../../../Assets/images/search_icon.png';

// const ActionsCell = ({ onEdit, onDelete, id }) => (
//       <div>
//         <button
//           key={`edit_${id}`}
//           onClick={onEdit}
//           className="p-2 text-blue-500 hover:text-blue-700"
//         >
//           📝   {/* <img src={edit_image} alt="search icon"/> */}

//         </button>
//         <button
//           key={`delete_${id}`}
//           onClick={onDelete}
//           className="p-2 text-red-500 hover:text-red-700"
//         >
//           🗑️
//         </button>
//       </div>
//     );

//     const Transactions = () => {
//       const navigate = useNavigate();
//       const [searchQuery, setSearchQuery] = useState('');
//       const [transactions, setTransactions] = useState([]);
//       const token = localStorage.getItem('token');

//       const columns = [
//         { field: 'description', headerName: 'Description', width: 280 },
//         { field: 'date', headerName: 'Date', width: 400 },
//         { field: 'amount', headerName: 'Amount', width: 150 },
//         { field: 'type', headerName: 'Type', width: 100 },
//         { field: 'status', headerName: 'Status', width: 200 },
//         {
//           field: 'actions', headerName: 'Actions', width: 200,
//           renderCell: (params) => (
//             <ActionsCell
//               id={params.row.id}
//               onEdit={() => handleEdit(params.row.id)}
//               onDelete={() => handleDelete(params.row.id)}
//             />
//           )
//         },
//       ];

//       const handleEdit = (editId) => {
//         navigate(`/add-new/${editId}`);
//       };

//       const handleDelete = (deleteId) => {
//         console.log("Deleting transaction with ID:", deleteId);
//         if (window.confirm("Are you sure you want to delete?")) {
//           const config = {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           };
//           finappaxios.delete(`/api/transactions/${deleteId}`, config)
//             .then(response => {
//               console.log("Delete response:", response);
//               alert("Delete successful");
//               setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
//             })
//             .catch(error => {
//               console.error("Error deleting:", error);
//             });
//         }
//       };

//       const fetchTransactions = async () => {
//         try {
//           const config = {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           };
//           const response = await finappaxios.get('/api/transactions', config);
//           setTransactions(response.data);
//         } catch (error) {
//           console.error('Error fetching transaction data:', error);
//         }
//       };

//       useEffect(() => {
//         fetchTransactions();
//       }, []);

//       const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//       };

//       const filteredTransactions = transactions.filter(transaction =>
//         (transaction.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (transaction.date || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (transaction.amount !== undefined ? transaction.amount.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) ||
//         (transaction.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (transaction.status || '').toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       return (
//         <div className="ml-4 mt-[-5px] mr-20"> 
//                <div className="flex justify-between items-center mb-4">
//                   <h1 className="text-3xl text-indigo-900 font-semibold mt-3">Transactions</h1>
//                   <button
//                     className="bg-blue-900 text-white rounded px-3 py-1 flex items-center space-x-2 mt-3"
//                     onClick={() => navigate('/add-new')}>
//                     <img src={plus} alt="Plus" className="w-4 h-4" />
//                     <span>Add New</span>
//                   </button>
//                </div>
//             <div className="flex justify-between items-center mb-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   className="border rounded-full pl-10 pr-4 py-2 outline-none"
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />
//                 <img
//                   src={search}
//                   alt="search icon"
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
//                 />
//               </div>
//               <select className="border rounded-full px-3 py-2 mr-5">
//                 <option value="">Transaction Type</option>
//                 <option value="Income">Income</option>
//                 <option value="Expense">Expenses</option>
//               </select>
//               <select className="border rounded-full px-4 py-2">
//                 <option value="">All Status</option>
//                 <option value="Accepted">Accepted</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//                 {/* <div className="flex items-center space-x-2 bg-white border rounded-full px-6 py-2">
//                     <span className="material-icons"></span>
//                     <input type="text" className="appearance-none outline-none" placeholder="Sat 25 May 2023 to 25 June 2023" />
//                </div> */}
//             </div>
//             <div className="bg-white overflow-hidden">
//               <div className="max-h-80 overflow-y-auto">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-100 sticky top-0">
//                     <tr>
//                       {columns.map((col) => (
//                         <th
//                           key={col.field}
//                           className="text-left px-3 py-3 bg-rose-50 items-center"
//                           style={{ width: col.width }}
//                         >
//                           {col.headerName}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredTransactions.map((transaction) => (
//                       <tr key={transaction.id}>
//                         {columns.map((col) => (
//                           <td
//                             key={col.field}
//                             className="px-3 py-0 border-b border-gray-200"
//                           >
//                             {col.field === 'actions'
//                               ? col.renderCell({ row: transaction })
//                               : transaction[col.field]}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
        
//       );
//     };

// export default Transactions;








// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { finappaxios } from "../../../../../axios";
// import plus from '../../../../../Assets/images/plus.png';
// import search from '../../../../../Assets/images/search_icon.png';

// const ActionsCell = ({ onEdit, onDelete, id }) => (
//   <div>
//     <button
//       key={`edit_${id}`}
//       onClick={onEdit}
//       className="p-2 text-blue-500 hover:text-blue-700"
//     >
//       📝
//     </button>
//     <button
//       key={`delete_${id}`}
//       onClick={onDelete}
//       className="p-2 text-red-500 hover:text-red-700"
//     >
//       🗑️
//     </button>
//   </div>
// );

// const Transactions = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [transactionTypeFilter, setTransactionTypeFilter] = useState('');

//   const token = localStorage.getItem('token');

//   const columns = [
//     { field: 'description', headerName: 'Description', width: 280 },
//     { field: 'date', headerName: 'Date', width: 400 },
//     { field: 'amount', headerName: 'Amount', width: 150 },
//     { field: 'type', headerName: 'Type', width: 100 },
//     { field: 'status', headerName: 'Status', width: 200 },
//     {
//       field: 'actions', headerName: 'Actions', width: 200,
//       renderCell: (params) => (
//         <ActionsCell
//           id={params.row.id}
//           onEdit={() => handleEdit(params.row.id)}
//           onDelete={() => handleDelete(params.row.id)}
//         />
//       )
//     },
//   ];

//   const handleEdit = (editId) => {
//     navigate(`/add-new/${editId}`);
//   };

//   const handleDelete = (deleteId) => {
//     console.log("Deleting transaction with ID:", deleteId);
//     if (window.confirm("Are you sure you want to delete?")) {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//       finappaxios.delete(`/api/transactions/${deleteId}`, config)
//         .then(response => {
//           console.log("Delete response:", response);
//           alert("Delete successful");
//           setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
//         })
//         .catch(error => {
//           console.error("Error deleting:", error);
//         });
//     }
//   };

//   const fetchTransactions = async () => {
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
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleTransactionTypeChange = (event) => {
//     setTransactionTypeFilter(event.target.value);
//   };

//   const filteredTransactions = transactions.filter(transaction =>
//     (transaction.description || '').toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (transactionTypeFilter ? transaction.type.toLowerCase() === transactionTypeFilter.toLowerCase() : true)
//   );

//   return (
//     <div className="ml-4 mt-[-5px] mr-20"> 
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl text-indigo-900 font-semibold mt-3">Transactions</h1>
//         <button
//           className="bg-blue-900 text-white rounded px-3 py-1 flex items-center space-x-2 mt-3"
//           onClick={() => navigate('/add-new')}>
//           <img src={plus} alt="Plus" className="w-4 h-4" />
//           <span>Add New</span>
//         </button>
//       </div>
//       <div className="flex justify-between items-center mb-3">
//         <div className="relative">
//           <input
//             type="text"
//             className="border rounded-full pl-10 pr-4 py-2 outline-none"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           <img
//             src={search}
//             alt="search icon"
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
//           />
//         </div>
//         <select
//           className="border rounded-full px-3 py-2 mr-5"
//           onChange={handleTransactionTypeChange}
//         >
//           <option value="">Transaction Type</option>
//           <option value="Income">Income</option>
//           <option value="Expense">Expenses</option>
//         </select>
//         <select className="border rounded-full px-4 py-2 mr-48">
//           <option value="">All Status</option>
//           <option value="Accepted">Accepted</option>
//           <option value="Pending">Pending</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//       </div>
//       <div className="bg-white overflow-hidden">
//         <div className="max-h-80 overflow-y-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-100 sticky top-0">
//               <tr>
//                 {columns.map((col) => (
//                   <th
//                     key={col.field}
//                     className="text-left px-3 py-3 bg-rose-50 items-center"
//                     style={{ width: col.width }}
//                   >
//                     {col.headerName}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTransactions.map((transaction) => (
//                 <tr key={transaction.id}>
//                   {columns.map((col) => (
//                     <td
//                       key={col.field}
//                       className="px-3 py-0 border-b border-gray-200"
//                     >
//                       {col.field === 'actions'
//                         ? col.renderCell({ row: transaction })
//                         : transaction[col.field]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions;








import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { finappaxios } from "../../../../../axios";
import plus from '../../../../../Assets/images/plus.png';
import search from '../../../../../Assets/images/search_icon.png';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import clock_image from '../../../../../Assets/images/clock.png';

const ActionsCell = ({ onEdit, onDelete, id }) => (
  <div>
    <button
      key={`edit_${id}`}
      onClick={onEdit}
      className="p-2 text-gray-500 hover:text-blue-700"
    >
      <ModeEditOutlinedIcon/>
    </button>
    <button
      key={`delete_${id}`}
      onClick={onDelete}
      className="p-2 text-gray-500 hover:text-red-700"
    >
     <DeleteOutlineIcon />
    </button>
  </div>
);

const Transactions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');

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
    navigate(`/add-new/${editId}`);
  };

  const handleDelete = (deleteId) => {
    console.log("Deleting transaction with ID:", deleteId);
    if (window.confirm("Are you sure you want to delete?")) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      finappaxios.delete(`/api/transactions/${deleteId}`, config)
        .then(response => {
          console.log("Delete response:", response);
          alert("Delete successful");
          setTransactions(transactions.filter(transaction => transaction.id !== deleteId));
        })
        .catch(error => {
          console.error("Error deleting:", error);
        });
    }
  };

  const fetchTransactions = async () => {
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
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionTypeFilter(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = (
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!transactionTypeFilter) {
      return matchesSearch;
    } else {
      return (
        matchesSearch &&
        transaction.type.toLowerCase() === transactionTypeFilter.toLowerCase()
      );
    }
  });

  return (
    <div className="ml-4 mt-[-5px] mr-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-indigo-900 font-semibold mt-3">Transactions</h1>
        <button
          className="bg-blue-900 text-white rounded px-3 py-1 flex items-center space-x-2 mt-3"
          onClick={() => navigate('/add-new')}
        >
          <img src={plus} alt="Plus" className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="relative">
          <input
            type="text"
            className="border rounded-full pl-10 pr-4 py-2 outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img
            src={search}
            alt="search icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
          />
        </div>
        <select
          className="border rounded-full px-3 py-2 mr-5"
          onChange={handleTransactionTypeChange}
        >
          <option value="">Transaction Type</option>
          <option value="Income">Income</option>
          <option value="Expenses">Expenses</option>
        </select>
        <select className="border rounded-full px-4 py-2 mr-56">
          <option value="">All Status</option>
          <option value="Accepted">Accepted</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
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
  );
};

export default Transactions;



