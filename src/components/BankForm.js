import React, { useMemo } from "react";
import { Formik, Form } from "formik";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { saveFormDataAsync } from "../redux/formSlice"; // Updated import for async action
import { basicSchema } from "../schema/basicSchema";
import Card from "./Card";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate

const BankForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const formStatus = useSelector((state) => state.form.status);

  const bankOptions = [
    { value: "Bank of Baroda", label: "Bank of Baroda" },
    { value: "HDFC Bank", label: "HDFC Bank" },
    { value: "ICICI Bank", label: "ICICI Bank" },
    { value: "IDFC First Bank", label: "IDFC First Bank" },
    { value: "Kotak Bank", label: "Kotak Bank" },
    { value: "SBI", label: "SBI" },
    { value: "Bank of Maharashtra", label: "Bank of Maharashtra" },
  ];

  const cityOptions = [
    { value: "Thane", label: "Thane" },
    { value: "Mulund", label: "Mulund" },
    { value: "Bhandup", label: "Bhandup" },
    { value: "Ghatkopar", label: "Ghatkopar" },
  ];

  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kashmir", label: "Kashmir" },
  ];

  const countryOptions = [
    { value: "India", label: "India" },
    { value: "Dubai", label: "Dubai" },
    { value: "USA", label: "USA" },
  ];

 
  const initialValues = useMemo(() => {
    if (location.state && location.state.id !== undefined) {
      const storedData = JSON.parse(localStorage.getItem("bankFormData")) || [];
      const dataToEdit = storedData.find(item => item.id === location.state.id) || {};
      return {
        bankName: dataToEdit.bankName || "",
        ifscCode: dataToEdit.ifscCode || "",
        branchName: dataToEdit.branchName || "",
        addressLine1: dataToEdit.addressLine1 || "",
        addressLine2: dataToEdit.addressLine2 || "",
        city: dataToEdit.city || "",
        state: dataToEdit.state || "",
        country: dataToEdit.country || "",
        pincode: dataToEdit.pincode || "",
        accountHolderName: dataToEdit.accountHolderName || "",
        accountNumber: dataToEdit.accountNumber || "",
        email: dataToEdit.email || "",
      };
    }
    return {
      bankName: "",
      ifscCode: "",
      branchName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      accountHolderName: "",
      accountNumber: "",
      email: "",
    };
  }, [location.state]); 

  const onSubmit = (values, { resetForm }) => {
    const existingData = JSON.parse(localStorage.getItem("bankFormData")) || [];
    
    if (values.id !== undefined) {
      const updatedData = existingData.map(item =>
        item.id === values.id ? values : item
      );
      localStorage.setItem("bankFormData", JSON.stringify(updatedData));
    } else {
      const newId = existingData.length ? Math.max(...existingData.map(item => item.id)) + 1 : 0;
      const updatedData = [
        ...existingData,
        { ...values, id: newId },
      ];
      localStorage.setItem("bankFormData", JSON.stringify(updatedData));
    }

    dispatch(saveFormDataAsync(values)).then(() => {
      resetForm();
      navigate(-1); // Navigate back to list
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={basicSchema}
        onSubmit={onSubmit}
        enableReinitialize={true} // Enable reinitialization
      >
        <Form>
          {/* General Information Card */}
          <Card title="General Information">
            <div className="row">
              <div className="col-md-6">
                <SelectInput
                  label="Bank Name*"
                  name="bankName"
                  options={bankOptions}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="IFSC Code*"
                  placeholder="Enter IFSC code"
                  name="ifscCode"
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Branch Name*"
                  placeholder="Enter Branch name"
                  name="branchName"
                />
              </div>
            </div>
          </Card>

          {/* Address Info Card */}
          <Card title="Address Information">
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Address Line 1*"
                  placeholder="Enter Address"
                  name="addressLine1"
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Address Line 2"
                  placeholder="Enter Address"
                  name="addressLine2"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <SelectInput label="City*" name="city" options={cityOptions} />
              </div>
              <div className="col-md-4">
                <SelectInput label="State*" name="state" options={stateOptions} />
              </div>
              <div className="col-md-4">
                <SelectInput
                  label="Country*"
                  name="country"
                  options={countryOptions}
                />
              </div>
              <div className="col-md-4">
                <TextInput
                  label="Pincode*"
                  placeholder="Enter Pincode"
                  name="pincode"
                />
              </div>
            </div>
          </Card>

          {/* Customer Info Card */}
          <Card title="Customer Information">
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Account Holder Name*"
                  placeholder="Enter Full name"
                  name="accountHolderName"
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Account Number*"
                  placeholder="Enter Account number"
                  name="accountNumber"
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Email*"
                  name="email"
                  placeholder="Enter Email address"
                  type="email"
                />
              </div>
            </div>
          </Card>

          <div className="text-center mt-4 d-flex justify-content-start">
            <button type="submit" className="btn btn-primary">
              {formStatus === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BankForm;
