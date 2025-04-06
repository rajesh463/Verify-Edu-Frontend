import React, { useEffect, useState } from "react";
import Demographic from "../../../services/Demographic.api";

const CastCategories = () => {
  const [castCategory, setCastCategory] = useState({
    name: "",
    religionId: null,
  });
  const [allReligions, setAllReligions] = useState([]);
  const [allCastCategory, setAllCastCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const onInputChange = (e) => {
    setCastCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setCastCategory({ name: "", religionId: null });
    setError(null);
    setSuccessMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      if (!castCategory.name.trim()) {
        throw new Error("castCategory name cannot be empty");
      }
      if (!castCategory.religionId) {
        throw new Error("castCategory name cannot be empty");
      }
      const res = await Demographic.addCasteCategory(castCategory);
      setSuccessMessage("castCategory added successfully!");
      resetForm();
      getCastCategories(); // Refresh the list
    } catch (err) {
      setError(err.message || "Failed to add castCategory");
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

  const getCastCategories = async () => {
    setLoading(true);
    try {
      const res = await Demographic.getCasteCategorys();
      setAllCastCategory(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch Cast Category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReligions();
    getCastCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage CastCategories</h2>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="ReligionSelect"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Religion
            </label>
            <select
              id="religionSelect"
              name="religionId"
              value={castCategory.religionId}
              onChange={onInputChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              <option value={null}>Select Religion</option>
              {allReligions.map((religion) => (
                <option key={religion._id} value={religion._id}>
                  {religion.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="castCategoryInput"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter Cast Categories
            </label>
            <input
              id="castCategoryInput"
              name="name"
              value={castCategory.name}
              type="text"
              onChange={onInputChange}
              required
              placeholder="Enter CastCategory"
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
        <h3 className="text-xl font-bold mb-4">CastCategories List</h3>
        {loading && <p>Loading...</p>}
        {allCastCategory.length === 0 && !loading ? (
          <p className="text-gray-600">No CastCategories added yet</p>
        ) : (
          <ul className="space-y-2">
            {allCastCategory.map((castCategory) => (
              <li
                key={castCategory._id}
                className="border-b py-2 px-4 hover:bg-gray-50"
              >
                {castCategory?.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CastCategories;
