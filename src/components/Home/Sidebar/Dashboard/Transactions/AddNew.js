
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              {editId || id ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
      {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage('')} />}
    </div>
  );
};

export default AddNew;