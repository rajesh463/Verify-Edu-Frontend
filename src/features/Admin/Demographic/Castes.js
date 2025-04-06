import React, { useEffect, useState } from "react";
import Demographic from "../../../services/Demographic.api";

const Castes = () => {
  const [cast, setCast] = useState({
    name: "",
    religionId: null,
    castCategoryId: null,
  });
  const [allReligions, setAllReligions] = useState([]);
  const [allCastCategory, setAllCastCategory] = useState([]);
  const [allCasts, setAllCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const onInputChange = (e) => {
    setCast((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setCast({ name: "", religionId: null, castCategoryId: null });
    setError(null);
    setSuccessMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      if (!cast.name.trim()) {
        throw new Error("Cast name cannot be empty");
      }
      if (!cast.religionId) {
        throw new Error("Cast name cannot be empty");
      }
      if (!cast.castCategoryId) {
        throw new Error("Cast name cannot be empty");
      }
      const res = await Demographic.addCaste(cast);
      setSuccessMessage("Cast added successfully!");
      resetForm();
      getCasts(); // Refresh the list
    } catch (err) {
      setError(err.message || "Failed to add Cast");
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
      setError("Failed to fetch Cast");
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
      setError("Failed to fetch Cast");
    } finally {
      setLoading(false);
    }
  };
  const getCasts = async () => {
    setLoading(true);
    try {
      const res = await Demographic.getCasts();
      setAllCasts(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch Cast");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReligions();
    getCasts();
  }, []);

  useEffect(() => {
    if (!cast?.religionId) getCastCategories();
  }, [cast?.religionId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Cast</h2>

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
              value={cast?.religionId}
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
              htmlFor="CastCateogySelect"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Cast-Category
            </label>
            <select
              id="CastCateogySelect"
              name="castCategoryId"
              value={cast?.castCategoryId}
              onChange={onInputChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              <option value={null}>Select Cast-Category</option>
              {allCastCategory.map((castCategory) => (
                <option key={castCategory._id} value={castCategory._id}>
                  {castCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="castCategoryInput"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter Cast
            </label>
            <input
              id="castCategoryInput"
              name="name"
              value={cast?.name}
              type="text"
              onChange={onInputChange}
              required
              placeholder="Enter Cast"
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
        <h3 className="text-xl font-bold mb-4">Cast List</h3>
        {loading && <p>Loading...</p>}
        {allCasts.length === 0 && !loading ? (
          <p className="text-gray-600">No Cast added yet</p>
        ) : (
          <ul className="space-y-2">
            {allCasts.map((cst) => (
              <li key={cst._id} className="border-b py-2 px-4 hover:bg-gray-50">
                {cst?.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Castes;
