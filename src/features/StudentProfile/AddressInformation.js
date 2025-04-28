import React, { useState, useEffect } from "react";
import Services from "../../services/Services";
import "./AddressInformation.css";
import SelectInput from "../../components/FormInput/SelectInput";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "../../components/FeedbackComponents/Sucess/SuccessModal";

const AddressInformation = () => {
  const { user } = useAuth();
  const [formState, setFormState] = useState({
    states: [],
    addressData: {
      permanent: {
        districts: [],
        talukas: [],
      },
      current: {
        districts: [],
        talukas: [],
      },
    },
    addresses: {
      permanentAddress: {
        addressLine1: "",
        addressLine2: "",
        state: "",
        district: "",
        taluka: "",
        village: "",
        pincode: "",
      },
      currentAddress: {
        addressLine1: "",
        addressLine2: "",
        state: "",
        district: "",
        taluka: "",
        village: "",
        pincode: "",
        sameAsPermanent: false,
      },
    },
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalData, setModalData] = useState({
    heading: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [addressType, field] = name.split(".");

    setFormState((prevState) => {
      if (type === "checkbox" && field === "sameAsPermanent") {
        return {
          ...prevState,
          addresses: {
            ...prevState.addresses,
            currentAddress: checked
              ? {
                  ...prevState.addresses.permanentAddress,
                  sameAsPermanent: checked,
                }
              : {
                  ...prevState.addresses.currentAddress,
                  sameAsPermanent: checked,
                },
          },
        };
      }

      return {
        ...prevState,
        addresses: {
          ...prevState.addresses,
          [addressType]: {
            ...prevState.addresses[addressType],
            [field]: value,
          },
        },
      };
    });
  };

  const handleStateChange = async (value, type) => {
    try {
      const response = await Services.getDistricts(value);
      setFormState((prevState) => ({
        ...prevState,
        addressData: {
          ...prevState.addressData,
          [type]: {
            ...prevState.addressData[type],
            districts: response?.data?.data || [],
            talukas: [],
          },
        },
      }));
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = async (value, type) => {
    try {
      const response = await Services.getTalukas(value);
      setFormState((prevState) => ({
        ...prevState,
        addressData: {
          ...prevState.addressData,
          [type]: {
            ...prevState.addressData[type],
            talukas: response?.data?.data || [],
          },
        },
      }));
    } catch (error) {
      console.error("Error fetching talukas:", error);
    }
  };

  const getStates = async () => {
    try {
      const response = await Services.getStates();
      setFormState((prevState) => ({
        ...prevState,
        states: response?.data?.data || [],
      }));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const [addressType, field] = name.split(".");

    setFormState((prevState) => ({
      ...prevState,
      addresses: {
        ...prevState.addresses,
        [addressType]: {
          ...prevState.addresses[addressType],
          [field]: value,
        },
      },
    }));
  };

  const fetchAddressInfo = async () => {
    try {
      if (!user?.email) {
        return;
      }
      const response = await Services.getAddressInfo(user.email);

      if (response.status === 200 && response.data?.data) {
        const data = response.data.data;

        // Update form state with fetched data
        setFormState((prevState) => ({
          ...prevState,
          addresses: {
            permanentAddress: {
              addressLine1: data.permanentAddress.addressLine1 || "",
              addressLine2: data.permanentAddress.addressLine2 || "",
              state: data.permanentAddress.state?._id || "",
              district: data.permanentAddress.district?._id || "",
              taluka: data.permanentAddress.taluka?._id || "",
              village: data.permanentAddress.village || "",
              pincode: data.permanentAddress.pincode || "",
            },
            currentAddress: {
              addressLine1: data.currentAddress.addressLine1 || "",
              addressLine2: data.currentAddress.addressLine2 || "",
              state: data.currentAddress.state?._id || "",
              district: data.currentAddress.district?._id || "",
              taluka: data.currentAddress.taluka?._id || "",
              village: data.currentAddress.village || "",
              pincode: data.currentAddress.pincode || "",
              sameAsPermanent: data.currentAddress.sameAsPermanent || false,
            },
          },
        }));

        // If permanent address state exists, fetch its districts and talukas
        if (data.permanentAddress?.state?._id) {
          await handleStateChange(data.permanentAddress.state._id, "permanent");
          if (data.permanentAddress?.district?._id) {
            await handleDistrictChange(
              data.permanentAddress.district._id,
              "permanent"
            );
          }
        }

        // If current address state exists and is different from permanent, fetch its districts and talukas
        if (
          data.currentAddress?.state?._id &&
          !data.currentAddress.sameAsPermanent
        ) {
          await handleStateChange(data.currentAddress.state._id, "current");
          if (data.currentAddress?.district?._id) {
            await handleDistrictChange(
              data.currentAddress.district._id,
              "current"
            );
          }
        }
      }
    } catch (error) {
      console.error("Error fetching address information:", error);
    }
  };

  useEffect(() => {
    getStates();
    fetchAddressInfo();
  }, [user?.email]);

  const AddressForm = ({ type }) => {
    const addressType = `${type}Address`;
    const address = formState.addresses[addressType];

    return (
      <div className="address-section">
        <h3>
          {type === "permanent" ? "Permanent Address" : "Current Address"}
        </h3>

        <div className="form-group">
          <label>Address Line 1</label>
          <input
            type="text"
            name={`${addressType}.addressLine1`}
            defaultValue={address.addressLine1}
            onBlur={handleBlur}
            placeholder="Enter address line 1"
          />
        </div>

        <div className="form-group">
          <label>Address Line 2</label>
          <input
            type="text"
            name={`${addressType}.addressLine2`}
            defaultValue={address.addressLine2}
            onBlur={handleBlur}
            placeholder="Enter address line 2 (optional)"
          />
        </div>

        <div className="form-group">
          <SelectInput
            options={formState.states}
            name={`${addressType}.state`}
            value={address.state}
            label="State"
            onChange={(e) => {
              handleChange(e);
              handleStateChange(e.target.value, type);
            }}
            required
          />
        </div>

        <div className="form-group">
          <SelectInput
            options={formState.addressData[type].districts}
            name={`${addressType}.district`}
            value={address.district}
            label="District"
            onChange={(e) => {
              handleChange(e);
              handleDistrictChange(e.target.value, type);
            }}
            required
          />
        </div>

        <div className="form-group">
          <SelectInput
            options={formState.addressData[type].talukas}
            name={`${addressType}.taluka`}
            value={address.taluka}
            label="Taluka"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Village/City</label>
          <input
            type="text"
            name={`${addressType}.village`}
            defaultValue={address.village}
            onBlur={handleBlur}
            placeholder="Enter village/city name"
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name={`${addressType}.pincode`}
            defaultValue={address.pincode}
            onBlur={handleBlur}
            maxLength="6"
            placeholder="Enter 6-digit pincode"
          />
        </div>
      </div>
    );
  };

  const handleSave = async () => {
    try {
      const formData = {
        userId:user?.email,
        permanentAddress: formState.addresses.permanentAddress,
        currentAddress: formState.addresses.currentAddress,
      };

      const response = await Services.submitAddressInfo(formData);

      if (response.status === 200) {
        setModalData({
          heading: "Success!",
          description: "Address information has been saved successfully.",
        });
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error saving address information:", error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="personal-info-section">
      <h2>Address Information</h2>
      <AddressForm type="permanent" />

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="currentAddress.sameAsPermanent"
            checked={formState.addresses.currentAddress.sameAsPermanent}
            onChange={handleChange}
          />
          Same as Permanent Address
        </label>
      </div>

      {!formState.addresses.currentAddress.sameAsPermanent && (
        <AddressForm type="current" />
      )}

      <button onClick={handleSave}>Save</button>

      {showSuccessModal && (
        <SuccessModal onClose={handleCloseModal} data={modalData} />
      )}
    </div>
  );
};

export default AddressInformation;
