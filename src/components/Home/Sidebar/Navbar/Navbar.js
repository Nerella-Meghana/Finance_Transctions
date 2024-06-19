
import React from 'react';
import { Link } from 'react-router-dom';
import reports_image from'../../../../Assets/images/reports.png';
import Balance_sheet from '../../../../Assets/images/BalanceSheet.png';
import transactions from '../../../../Assets/images/Transaction.png';
import Dashboard from '../../../../Assets/images/Dashboard.png';
import Settings from '../../../../Assets/images/setting.png';
 
function Navbar() {
  return (
    <aside className="bg-white h-[calc(100vh-78px)] w-[200px] fixed top-[78px] left-0 p-5 flex flex-col shadow-sm border-r-2 mt-1">
      <nav>
        <ul className="list-none p-0 m-0">
          <li className="mb-2">
              <Link to="/home/dashboard" className="flex items-center p-2 mt-8 rounded hover:bg-pink-50">
                <img src={Dashboard} alt="Balance_sheet" className="h-6 w-6 mr-2" />
                <span className="hover:text-blue-800">Dashboard</span>
              </Link>
          </li>
         
            <li className="mb-2">
              <Link to="/home/transactions" className="flex items-center p-2 rounded hover:bg-pink-50">
                <img src={transactions} alt="Balance_sheet" className="h-6 w-6 mr-2" />
                <span className="hover:text-blue-800">Transactions</span>
              </Link>
            </li>
           
            <li className="mb-2">
              <Link to="/home/balance-sheet" className="flex items-center p-2 rounded hover:bg-pink-50">
                <img src={Balance_sheet} alt="Balance_sheet" className="h-6 w-6 mr-2" />
                <span className="hover:text-blue-800">Balance sheet</span>
              </Link>
            </li>
            <li className="mb-2">
                <Link to="/home/reports" className="flex items-center p-2 rounded hover:bg-pink-50">
                  <img src= {reports_image} alt="Reports Icon" className="h-6 w-6 mr-2" />
                  <span className="hover:text-blue-800">Reports</span>
                </Link>
            </li>
            <li className="mb-2">
                <Link to="/home/settings" className="flex items-center p-2 rounded hover:bg-pink-50">
                  <img src= {Settings} alt="setting Icon" className="h-6 w-6 mr-2" />
                  <span className="hover:text-blue-800">Settings</span>
                </Link>
            </li>
        </ul>
      </nav>
    </aside>
  );
}
 
export default Navbar;


