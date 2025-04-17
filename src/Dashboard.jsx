import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const DashboardPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expiryDays, setExpiryDays] = useState(7);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    // Get user email from JWT stored in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to home page if no token
    } else {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      setUserEmail(decoded.email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const generatePassword = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/dashboard/generate-password',
        { expiryDays },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setGeneratedPassword(response.data.data.password);
      setShowModal(false); 
    } catch (error) {
      setError('Error generating password');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Welcome, {userEmail}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Generate WiFi Password
        </button>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Select Password Expiry</h3>
            <div className="mb-4 space-y-2">
  {[7, 14, 21].map((days) => (
    <button
      key={days}
      onClick={() => setExpiryDays(days)}
      className={`w-full py-2 rounded-md transition-colors duration-200
        ${expiryDays === days
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
      `}
    >
      {days} Days
    </button>
  ))}
</div>


            <button
              onClick={generatePassword}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Generate Password
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {generatedPassword && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
          <h3 className="font-semibold">Generated WiFi Password:</h3>
          <p>{generatedPassword}</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
