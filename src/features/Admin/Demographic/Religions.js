import React, { useEffect, useState } from "react";
import Demographic from "../../../services/Demographic.api";

const Religions = () => {
  const [religion, setReligion] = useState({
    name: "",
  });
  const [allReligions, setAllReligions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const onInputChange = (e) => {
    setReligion((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setReligion({ name: "" });
    setError(null);
    setSuccessMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      if (!religion.name.trim()) {
        throw new Error("religion name cannot be empty");
      }

      const res = await Demographic.addReligions(religion);
      setSuccessMessage("religion added successfully!");
      resetForm();
      getReligions(); // Refresh the list
    } catch (err) {
      setError(err.message || "Failed to add religion");
    } finally {
      setLoading(false);
    }
  };

  const getReligions = async () => {
    setLoading(true);
    try {
      const res = await Demographic.getReligions();
      setAllReligions(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch religion");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReligions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Religion</h2>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="religonInput"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter Religion
            </label>
            <input
              id="religonInput"
              name="name"
              value={religion.name}
              type="text"
              onChange={onInputChange}
              required
              placeholder="Enter Religion"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Adding..." : "Add State"}
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-xl font-bold mb-4">Religion List</h3>
        {loading && <p>Loading...</p>}
        {allReligions.length === 0 && !loading ? (
          <p className="text-gray-600">No Religion added yet</p>
        ) : (
          <ul className="space-y-2">
            {allReligions.map((rel) => (
              <li key={rel._id} className="border-b py-2 px-4 hover:bg-gray-50">
                {rel?.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Religions;
