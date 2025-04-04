import React, { useEffect, useState } from "react";
// import TextInput from "../../../components/FormInput/TextInput";
// import Button from "../../../components/FormInput/Button";
import Locations from "../../../services/Location.api";

const District = () => {
  const [district, setDistrict] = useState({
    name: "",
    stateId: "",
  });
  const [allDistrict, setAllDistrict] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setDistrict({
      name: "",
      stateId: "",
    });
    setError(null);
    setSuccessMessage("");
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDistrict((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      if (!district.name.trim()) {
        throw new Error("District name cannot be empty");
      }
      if (!district.stateId) {
        throw new Error("Please select a state");
      }

      await Locations.addDistrict(district);
      setSuccessMessage("District added successfully!");
      resetForm();
      getDistrict(); // Refresh the list
    } catch (err) {
      setError(err.message || "Failed to add district");
    } finally {
      setLoading(false);
    }
  };

  const getDistrict = async () => {
    setLoading(true);
    try {
      const res = await Locations.getDistricts();
      setAllDistrict(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch districts");
    } finally {
      setLoading(false);
    }
  };

  const getStates = async () => {
    setLoading(true);
    try {
      const res = await Locations.getStates();
      setAllStates(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch states");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStates();
    getDistrict();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Districts</h2>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* State Selection */}
            <div className="mb-4">
              <label
                htmlFor="stateSelect"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select State
              </label>
              <select
                id="stateSelect"
                name="stateId"
                value={district.stateId}
                onChange={onInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                <option value="">Select State</option>
                {allStates.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Input */}
            <div className="mb-4">
              <label
                htmlFor="districtInput"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Enter District
              </label>
              <input
                id="districtInput"
                name="name"
                value={district.name}
                onChange={onInputChange}
                required
                placeholder="Enter District Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Adding..." : "Add District"}
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-xl font-bold mb-4">Districts List</h3>
        {loading && <p>Loading...</p>}
        {allDistrict.length === 0 && !loading ? (
          <p className="text-gray-600">No districts added yet</p>
        ) : (
          <ul className="space-y-2">
            {allDistrict.map((district) => (
              <li
                key={district._id}
                className="border-b py-2 px-4 hover:bg-gray-50"
              >
                {district.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default District;
