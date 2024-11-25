import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasscodeSection = () => {
  const [passcode, setPasscode] = useState(""); // State to store the input passcode
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Navigation hook to redirect

  const correctPasscode = "Empty22Cross@@Promotions&&";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      // Redirect to dashboard if passcode is correct
      navigate("/dashboard");
    } else {
      // Display error message if passcode is incorrect
      setError("Incorrect passcode. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-600">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Enter Passcode</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="passcode"
              className="block text-gray-700 font-semibold mb-2"
            >
              Passcode
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
              placeholder="Enter the passcode"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasscodeSection;
