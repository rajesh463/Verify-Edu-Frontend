import React, { useEffect, useState } from "react";
// import TextInput from "../../../components/FormInput/TextInput";
// import Button from "../../../components/FormInput/Button";
import Locations from "../../../services/Location.api";

const Talukas = () => {
  const [taluka, setTaluka] = useState({
    name: "",
    stateId: "",
    districtId: "",
  });
  const [allDistrict, setAllDistrict] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allTalukas, setAllTalukas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setTaluka({
      name: "",
      stateId: "",
      districtId: "",
    });
    setError(null);
    setSuccessMessage("");
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTaluka((prevState) => ({
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
      if (!taluka.name.trim()) {
        throw new Error("Taluka name cannot be empty");
      }
      if (!taluka.stateId) {
        throw new Error("Please select a state");
      }
      if (!taluka.districtId) {
        throw new Error("Please select a district");
      }

      await Locations.addTaluka(taluka);
      setSuccessMessage("Taluka added successfully!");
      resetForm();
      getTalukas(); // Refresh the list
    } catch (err) {
      setError(err.message || "Failed to add taluka");
    } finally {
      setLoading(false);
    }
  };

  const getDistrictByState = async (stateId) => {
    if (!stateId || stateId === "") return;

    setLoading(true);
    try {
      const res = await Locations.getDistrictsByStateId(stateId);
      setAllDistrict(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch districts");
      setAllDistrict([]);
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

  const getTalukas = async () => {
    setLoading(true);
    try {
      const res = await Locations.getTalukas();
      setAllTalukas(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch talukas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStates();
    getTalukas();
  }, []);

  useEffect(() => {
    if (taluka.stateId) {
      getDistrictByState(taluka.stateId);
      setTaluka((prev) => ({ ...prev, districtId: "" })); // Reset district when state changes
    }
  }, [taluka.stateId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Talukas</h2>

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
                value={taluka.stateId}
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

            {/* District Selection */}
            <div className="mb-4">
              <label
                htmlFor="districtSelect"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select District
              </label>
              <select
                id="districtSelect"
                name="districtId"
                value={taluka.districtId}
                onChange={onInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!taluka.stateId || loading}
              >
                <option value="">Select District</option>
                {allDistrict.map((district) => (
                  <option key={district._id} value={district._id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Taluka Input */}
            <div className="mb-4">
              <label
                htmlFor="talukaInput"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Enter Taluka
              </label>
              <input
                id="talukaInput"
                name="name"
                value={taluka.name}
                onChange={onInputChange}
                required
                placeholder="Enter Taluka Name"
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
            {loading ? "Adding..." : "Add Taluka"}
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-xl font-bold mb-4">Talukas List</h3>
        {loading && <p>Loading...</p>}
        {allTalukas.length === 0 && !loading ? (
          <p className="text-gray-600">No talukas added yet</p>
        ) : (
          <ul className="space-y-2">
            {allTalukas.map((taluka) => (
              <li
                key={taluka._id}
                className="border-b py-2 px-4 hover:bg-gray-50"
              >
                {taluka.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Talukas;
