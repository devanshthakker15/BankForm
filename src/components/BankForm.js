import React, { useMemo } from "react";
import { Formik, Form, FieldArray } from "formik";
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

  // Initialize form values, now with an array for multiple addresses
  const initialValues = useMemo(() => {
    if (location.state && location.state.id !== undefined) {
      const storedData = JSON.parse(localStorage.getItem("bankFormData")) || [];
      const dataToEdit =
        storedData.find((item) => item.id === location.state.id) || {};
      return {
        bankName: dataToEdit.bankName || "",
        ifscCode: dataToEdit.ifscCode || "",
        branchName: dataToEdit.branchName || "",
        accountHolderName: dataToEdit.accountHolderName || "",
        accountNumber: dataToEdit.accountNumber || "",
        email: dataToEdit.email || "",
        addresses: dataToEdit.addresses || [
          {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
          },
        ],
      };
    }
    return {
      bankName: "",
      ifscCode: "",
      branchName: "",
      accountHolderName: "",
      accountNumber: "",
      email: "",
      addresses: [
        {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        },
      ], 
    };
  }, [location.state]);

  const onSubmit = (values, { resetForm }) => {
    const existingData = JSON.parse(localStorage.getItem("bankFormData")) || [];

    if (values.id !== undefined) {
      const updatedData = existingData.map((item) =>
        item.id === values.id ? values : item
      );
      localStorage.setItem("bankFormData", JSON.stringify(updatedData));
    } else {
      const newId = existingData.length
        ? Math.max(...existingData.map((item) => item.id)) + 1
        : 0;
      const updatedData = [...existingData, { ...values, id: newId }];
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
        {({ values }) => (
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

            {/* Multiple Addresses using FieldArray */}
            <FieldArray name="addresses">
              {({remove, push }) => (
                <Card title="Address Information">
                  {values.addresses.length > 0 &&
                    values.addresses.map((address, index) => (
                      <div key={index}>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <TextInput
                              label="Address Line 1*"
                              placeholder="Enter Address"
                              name={`addresses.${index}.addressLine1`}
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Address Line 2"
                              placeholder="Enter Address"
                              name={`addresses.${index}.addressLine2`}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <SelectInput
                              label="City*"
                              name={`addresses.${index}.city`}
                              options={cityOptions}
                            />
                          </div>
                          <div className="col-md-3">
                            <SelectInput
                              label="State*"
                              name={`addresses.${index}.state`}
                              options={stateOptions}
                            />
                          </div>
                          <div className="col-md-3">
                            <SelectInput
                              label="Country*"
                              name={`addresses.${index}.country`}
                              options={countryOptions}
                            />
                          </div>
                          <div className="col-md-3 mt-2">
                            <TextInput
                              label="Pincode*"
                              placeholder="Enter Pincode"
                              name={`addresses.${index}.pincode`}
                            />
                          </div>
                        </div>
                        

                        <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          onClick={() =>
                            push({
                              addressLine1: "",
                              addressLine2: "",
                              city: "",
                              state: "",
                              country: "",
                              pincode: "",
                            })
                          }
                        >
                          Add Another Address
                        </button>
                          <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => remove(index)}
                          >
                            Remove Address
                          </button>
                        </div>
                      </div>
                    ))}
                </Card>
              )}
            </FieldArray>

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
                {formStatus === "loading" ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BankForm;
