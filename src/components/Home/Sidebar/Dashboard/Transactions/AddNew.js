

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { finappaxios } from '../../../../../axios';



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

const AddNew = ({ addTransaction }) => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      const fetchTransaction = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await finappaxios.get(`/api/transactions/${id}`, config);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching transaction:', error);
        }
      };
      fetchTransaction();
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue;
  
    // Validate input value for amount
    if (name === 'amount') {
      // Check if the value is a valid integer string
      const isValidAmount = /^\d+$/.test(value);
      parsedValue = isValidAmount ? parseInt(value, 10) : ''; // If not valid, set empty string
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
    console.log('Form Data:', formData);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let response;
      if (id) {
        response = await finappaxios.put(`/api/transactions/${id}`, formData, config);
      } else {
        response = await finappaxios.post('/api/transactions', formData, config);
      }
      if (response.status === 200 || response.status === 201) {
        setPopupMessage(id ? 'Transaction updated successfully' : 'Transaction added successfully');
        setTimeout(() => {
          navigate('/home/transactions');
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      setPopupMessage('Error saving transaction');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="max-w-lg w-full mx-auto p-8 bg-white shadow-md rounded-2xl h-280">
        <h1 className="text-xl font-semibold mb-6 text-left text-indigo-900">{id ? 'Edit Transaction' : 'Add Transaction'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-md font-medium pb-2 text-black">Type</label>
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
              <label className="block text-md font-medium pb-2 text-black">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-md font-medium pb-2 text-black">Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-md font-medium pb-2 text-black">Date</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-md font-medium pb-2 text-black">Status</label>
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
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/home/transactions')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-900 text-white rounded-md"
            >
              {id ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
      {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
    </div>
  );
};

export default AddNew;
