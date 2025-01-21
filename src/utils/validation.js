export const validatePersonalInfo = (data) => {
  const errors = {};

  if (!data.aadhaarNumber || !/^\d{12}$/.test(data.aadhaarNumber)) {
    errors.aadhaarNumber = "Please enter a valid 12-digit Aadhaar number";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.mobileNumber || !/^\d{10}$/.test(data.mobileNumber)) {
    errors.mobileNumber = "Please enter a valid 10-digit mobile number";
  }

  // Add more validations as needed

  return errors;
};

export const validateAddressInfo = (data) => {
  const errors = {};

  if (
    !data.permanentAddress.pincode ||
    !/^\d{6}$/.test(data.permanentAddress.pincode)
  ) {
    errors.permanentPincode = "Please enter a valid 6-digit pincode";
  }

  if (!data.currentAddress.sameAsPermanent) {
    if (
      !data.currentAddress.pincode ||
      !/^\d{6}$/.test(data.currentAddress.pincode)
    ) {
      errors.currentPincode = "Please enter a valid 6-digit pincode";
    }
  }

  return errors;
};

export const validateQualificationInfo = (data) => {
  const errors = {};

  if (!data.percentage || data.percentage < 0 || data.percentage > 100) {
    errors.percentage = "Please enter a valid percentage between 0 and 100";
  }

  return errors;
};

export const validateCourseInfo = (data) => {
  const errors = {};
  // Add course-specific validations
  return errors;
};
