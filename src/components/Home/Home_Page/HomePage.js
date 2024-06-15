
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../Sidebar/Dashboard/Dashboard'
// import Transactions from '../Sidebar/Dashboard/Transactions/Transactions';
// import BalanceSheet from '../Sidebar/BalanceSheet/BalanceSheet';
// import Reports from '../Sidebar/Reports/Reports';
// import Settings from '../Sidebar/Settings/Settings';
// import AddNew from '../Sidebar/Dashboard/Transactions/AddNew';
// import Navbar from '../Sidebar/Navbar/Navbar';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// // import './HomePage.css'

 
// function HomePage() {
//   const [transactions, setTransactions] = useState([]);
 
//   useEffect(() => {
//     const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
//     setTransactions(savedTransactions);
//   }, []);
 
//   const addTransaction = (newTransaction) => {
//     setTransactions((prevTransactions) => {
//       const existingTransactionIndex = prevTransactions.findIndex(t => t.id === newTransaction.id);
//       let updatedTransactions;
//       if (existingTransactionIndex > -1) {
//         updatedTransactions = [
//           ...prevTransactions.slice(0, existingTransactionIndex),
//           newTransaction,
//           ...prevTransactions.slice(existingTransactionIndex + 1)
//         ];
//       } else {
//         updatedTransactions = [...prevTransactions, newTransaction];
//       }
//       localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
//       return updatedTransactions;
//     });
//   };
  

// return (
//   <div className="container">
//   <Header />
//   <div className="main-content">
//   <Navbar />
//   <div className="content-wrapper">
//   <Routes>
//   <Route path="dashboard" element={<Dashboard />} />
//   <Route path="transactions" element={<Transactions transactions={transactions} setTransactions={setTransactions} />} />
//   <Route path="balance-sheet" element={<BalanceSheet />} />
//   <Route path="reports" element={<Reports />} />
//   <Route path="settings" element={<Settings />} />
//   <Route path="add-new" element={<AddNew addTransaction={addTransaction} />} />
//   <Route path="add-new/:id" element={<AddNew />} />
//   <Route path="/" element={<Navigate to="transactions" />} />
//   </Routes>
//   <Footer />
//   </div>
//   </div>
//   </div>
//     );
//   }
// export default HomePage;



// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../Sidebar/Dashboard/Dashboard';
// import Transactions from '../Sidebar/Dashboard/Transactions/Transactions';
// import BalanceSheet from '../Sidebar/BalanceSheet/BalanceSheet';
// import Reports from '../Sidebar/Reports/Reports';
// import Settings from '../Sidebar/Settings/Settings';
// import AddNew from '../Sidebar/Dashboard/Transactions/AddNew';
// import Navbar from '../Sidebar/Navbar/Navbar';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

// function HomePage() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
//     setTransactions(savedTransactions);
//   }, []);

//   const addTransaction = (newTransaction) => {
//     setTransactions((prevTransactions) => {
//       const existingTransactionIndex = prevTransactions.findIndex(t => t.id === newTransaction.id);
//       let updatedTransactions;
//       if (existingTransactionIndex > -1) {
//         updatedTransactions = [
//           ...prevTransactions.slice(0, existingTransactionIndex),
//           newTransaction,
//           ...prevTransactions.slice(existingTransactionIndex + 1)
//         ];
//       } else {
//         updatedTransactions = [...prevTransactions, newTransaction];
//       }
//       localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
//       return updatedTransactions;
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Header />
//       <div className="flex flex-col md:flex-row">
//         <Navbar />
//         <div className="flex-grow p-4">
//           <Routes>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="transactions" element={<Transactions transactions={transactions} setTransactions={setTransactions} />} />
//             <Route path="balance-sheet" element={<BalanceSheet />} />
//             <Route path="reports" element={<Reports />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="add-new" element={<AddNew addTransaction={addTransaction} />} />
//             <Route path="add-new/:id" element={<AddNew />} />
//             <Route path="/" element={<Navigate to="transactions" />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;


// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../Sidebar/Dashboard/Dashboard';
// import Transactions from '../Sidebar/Dashboard/Transactions/Transactions';
// import BalanceSheet from '../Sidebar/BalanceSheet/BalanceSheet';
// import Reports from '../Sidebar/Reports/Reports';
// import Settings from '../Sidebar/Settings/Settings';
// import AddNew from '../Sidebar/Dashboard/Transactions/AddNew';
// import Navbar from '../Sidebar/Navbar/Navbar';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

// function HomePage() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
//     setTransactions(savedTransactions);
//   }, []);

//   const addTransaction = (newTransaction) => {
//     setTransactions((prevTransactions) => {
//       const existingTransactionIndex = prevTransactions.findIndex(t => t.id === newTransaction.id);
//       let updatedTransactions;
//       if (existingTransactionIndex > -1) {
//         updatedTransactions = [
//           ...prevTransactions.slice(0, existingTransactionIndex),
//           newTransaction,
//           ...prevTransactions.slice(existingTransactionIndex + 1)
//         ];
//       } else {
//         updatedTransactions = [...prevTransactions, newTransaction];
//       }
//       localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
//       return updatedTransactions;
//     });
//   };

//   return (
//     <div className="relative min-h-screen">
//       <Header />
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen pl-[200px] pt-[78px] pb-[58px] flex">
//         <div className="flex-grow p-5">
//           <Routes>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="transactions" element={<Transactions transactions={transactions} setTransactions={setTransactions} />} />
//             <Route path="balance-sheet" element={<BalanceSheet />} />
//             <Route path="reports" element={<Reports />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="add-new" element={<AddNew addTransaction={addTransaction} />} />
//             <Route path="add-new/:id" element={<AddNew />} />
//             <Route path="/" element={<Navigate to="transactions" />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;


// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../Sidebar/Dashboard/Dashboard';
// import Transactions from '../Sidebar/Dashboard/Transactions/Transactions';
// import BalanceSheet from '../Sidebar/BalanceSheet/BalanceSheet';
// import Reports from '../Sidebar/Reports/Reports';
// import Settings from '../Sidebar/Settings/Settings';
// // import AddNew from '../Sidebar/Dashboard/Transactions/AddNew';
// import Navbar from '../Sidebar/Navbar/Navbar';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

// function HomePage() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
//     setTransactions(savedTransactions);
//   }, []);

//   const addTransaction = (newTransaction) => {
//     setTransactions((prevTransactions) => {
//       const existingTransactionIndex = prevTransactions.findIndex(t => t.id === newTransaction.id);
//       let updatedTransactions;
//       if (existingTransactionIndex > -1) {
//         updatedTransactions = [
//           ...prevTransactions.slice(0, existingTransactionIndex),
//           newTransaction,
//           ...prevTransactions.slice(existingTransactionIndex + 1)
//         ];
//       } else {
//         updatedTransactions = [...prevTransactions, newTransaction];
//       }
//       localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
//       return updatedTransactions;
//     });
//   };

//   return (
//     <div className="fixed flex flex-col w-full min-h-screen">
//       <Header />
//       <div className="flex flex-grow">
//         <Navbar />
//         <div className="flex flex-grow flex-col bg-gray-100 pt-[78px] pb-[58px] pl-[200px] pr-5 overflow-auto">
          
//             <Routes>
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="transactions" element={<Transactions transactions={transactions} setTransactions={setTransactions} />} />
//               <Route path="balance-sheet" element={<BalanceSheet />} />
//               <Route path="reports" element={<Reports />} />
//               <Route path="settings" element={<Settings />} />
//               {/* <Route path="add-new" element={<AddNew addTransaction={addTransaction} />} />
//               <Route path="add-new/:id" element={<AddNew />} /> */}
//               <Route path="/" element={<Navigate to="transactions" />} />
//             </Routes>
//           </div>
//         </div>
      
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;



import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import  Dashboard from '../Sidebar/Dashboard/Dashboard';
import Transactions from '../Sidebar/Dashboard/Transactions/Transactions';
import BalanceSheet from '../Sidebar/BalanceSheet/BalanceSheet';
import Reports from '../Sidebar/Reports/Reports';
import Settings from '../Sidebar/Settings/Settings';
import AddNew from '../Sidebar/Dashboard/Transactions/AddNew';
import Navbar from '../Sidebar/Navbar/Navbar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function HomePage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => {
      const existingTransactionIndex = prevTransactions.findIndex(t => t.id === newTransaction.id);
      let updatedTransactions;
      if (existingTransactionIndex > -1) {
        updatedTransactions = [
          ...prevTransactions.slice(0, existingTransactionIndex),
          newTransaction,
          ...prevTransactions.slice(existingTransactionIndex + 1)
        ];
      } else {
        updatedTransactions = [...prevTransactions, newTransaction];
      }
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
  };

  return (
    <div className="fixed flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <Navbar />
        <div className="flex flex-grow flex-col bg-gray-100 pt-[78px] pb-[58px] pl-[200px] pr-5 overflow-auto">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions transactions={transactions} setTransactions={setTransactions} />} />
            <Route path="balance-sheet" element={<BalanceSheet />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="add-new" element={<AddNew addTransaction={addTransaction} />} />
            <Route path="add-new/:id" element={<AddNew addTransaction={addTransaction} />} />
            <Route path="/" element={<Navigate to="transactions" />} />
          </Routes>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;





// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../Sidebar/Dashboard/Dashboard';
// import Transactions from '../Sidebar/Dashboard/Transactions/Transactions';
// import BalanceSheet from '../Sidebar/BalanceSheet/BalanceSheet';
// import Reports from '../Sidebar/Reports/Reports';
// import Settings from '../Sidebar/Settings/Settings';
// import AddNew from '../Sidebar/Dashboard/Transactions/AddNew';
// import Navbar from '../Sidebar/Navbar/Navbar';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// import { useTheme } from '../../../contexts/ThemeContext'; // Import useTheme hook

// function HomePage() {
//   const { theme } = useTheme(); // Access theme from useTheme hook

//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
//     setTransactions(savedTransactions);
//   }, []);

//   const addTransaction = (newTransaction) => {
//     setTransactions((prevTransactions) => {
//       const existingTransactionIndex = prevTransactions.findIndex(t => t.id === newTransaction.id);
//       let updatedTransactions;
//       if (existingTransactionIndex > -1) {
//         updatedTransactions = [
//           ...prevTransactions.slice(0, existingTransactionIndex),
//           newTransaction,
//           ...prevTransactions.slice(existingTransactionIndex + 1)
//         ];
//       } else {
//         updatedTransactions = [...prevTransactions, newTransaction];
//       }
//       localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
//       return updatedTransactions;
//     });
//   };

//   return (
//     <div className={`fixed flex flex-col w-full min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
//       <Header />
//       <div className="flex flex-grow">
//         <Navbar />
//         <div className={`flex flex-grow flex-col bg-gray-100 pt-[78px] pb-[58px] pl-[200px] pr-5 overflow-auto ${theme === 'dark' ? 'dark' : ''}`}>
//           <Routes>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="transactions" element={<Transactions transactions={transactions} setTransactions={setTransactions} />} />
//             <Route path="balance-sheet" element={<BalanceSheet />} />
//             <Route path="reports" element={<Reports />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="add-new" element={<AddNew addTransaction={addTransaction} />} />
//             <Route path="add-new/:id" element={<AddNew addTransaction={addTransaction} />} />
//             <Route path="/" element={<Navigate to="transactions" />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;



// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../Sidebar/Dashboard/Dashboard';
// import Transactions from '../Sidebar/Dashboard/Transactions/Transactions';
// import BalanceSheet from '../Sidebar/BalanceSheet/BalanceSheet';
// import Reports from '../Sidebar/Reports/Reports';
// import Settings from '../Sidebar/Settings/Settings';
// import AddNew from '../Sidebar/Dashboard/Transactions/AddNew';
// import Navbar from '../Sidebar/Navbar/Navbar';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

// import { useTheme, useThemeUpdate } from '../../../contexts/ThemeContext'; // Assuming useThemeUpdate for setting theme

// function HomePage() {
//   const { theme } = useTheme();
//   const toggleTheme = useThemeUpdate();

//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
//     setTransactions(savedTransactions);
//   }, []);

//   const addTransaction = (newTransaction) => {
//     setTransactions((prevTransactions) => {
//       const existingTransactionIndex = prevTransactions.findIndex(t => t.id === newTransaction.id);
//       let updatedTransactions;
//       if (existingTransactionIndex > -1) {
//         updatedTransactions = [
//           ...prevTransactions.slice(0, existingTransactionIndex),
//           newTransaction,
//           ...prevTransactions.slice(existingTransactionIndex + 1)
//         ];
//       } else {
//         updatedTransactions = [...prevTransactions, newTransaction];
//       }
//       localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
//       return updatedTransactions;
//     });
//   };

//   const handleThemeToggle = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     toggleTheme(newTheme);
//     localStorage.setItem('theme', newTheme); // Persist theme preference in localStorage
//   };

//   return (
//     <div className={`fixed flex flex-col w-full min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
//       <Header>
//         <button className="focus:outline-none" onClick={handleThemeToggle}>
//           Toggle Theme
//         </button>
//       </Header>
//       <div className="flex flex-grow">
//         <Navbar />
//         <div className={`flex flex-grow flex-col bg-gray-100 pt-[78px] pb-[58px] pl-[200px] pr-5 overflow-auto ${theme === 'dark' ? 'dark' : ''}`}>
//           <Routes>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="transactions" element={<Transactions transactions={transactions} setTransactions={setTransactions} />} />
//             <Route path="balance-sheet" element={<BalanceSheet />} />
//             <Route path="reports" element={<Reports />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="add-new" element={<AddNew addTransaction={addTransaction} />} />
//             <Route path="add-new/:id" element={<AddNew addTransaction={addTransaction} />} />
//             <Route path="/" element={<Navigate to="transactions" />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;
