import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const BankDetailsList = () => {
  const [bankData, setBankData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 3;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("bankFormData")) || [];
    setBankData(storedData);
    setFilteredData(storedData);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = bankData.filter((item) =>
      item.bankName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      item.accountHolderName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  };

  const handleEdit = (id) => {
    navigate("/", { state: { id } });
  };

  const handleDelete = (id) => {
    const updatedData = bankData.filter((item) => item.id !== id);
    setBankData(updatedData);
    localStorage.setItem("bankFormData", JSON.stringify(updatedData));
  };

  const handleBackToForm = () => {
    navigate("/"); 
  };

  //Pagination part constants/functions and calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the entries to display on the current page
  const startIndex = (currentPage -1) * itemsPerPage;
  const currentEntries = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mt-5">
      <h2>Bank Details Submissions</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Bank Name or Account Holder Name"
          className="form-control"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Submission List */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bank Name</th>
            <th>Account Holder Name</th>
            <th>Account Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.length > 0 ? (
            currentEntries.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.bankName}</td>
                <td>{item.accountHolderName}</td>
                <td>{item.accountNumber}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <strong>X</strong>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>



      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />



      {/* Back to Form Button */}
      <div className="text-center mt-4 d-flex justify-content-start">
        <button className="btn btn-secondary" onClick={handleBackToForm}>
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default BankDetailsList;
