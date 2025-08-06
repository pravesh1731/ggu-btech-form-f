import React, { useState } from "react";

const ApplicationsList = ({ applications }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Add this missing state

  const filteredApplications = applications.filter(
    (app) =>
      app.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.student_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.mobile?.includes(searchTerm) ||
      app.applicationNum?.includes(searchTerm) ||
      app.crlRank?.includes(searchTerm)
  );

  const viewApplication = (application) => {
    setSelectedApplication(application);
  };

  
  // Enhanced Excel download function
const downloadExcel = async () => {
  try {
    setLoading(true);
    console.log('Starting Excel download...');
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No admin token found. Please login again.');
    }
    
    const response = await fetch('http://localhost:5002/api/admin/applications/download/excel', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }

    // Check if response is actually an Excel file
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('spreadsheetml')) {
      throw new Error('Server did not return an Excel file');
    }

    // Get the blob from response
    const blob = await response.blob();
    console.log('Blob size:', blob.size, 'bytes');
    
    if (blob.size === 0) {
      throw new Error('Received empty file');
    }
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Get filename from response headers or use default
    const contentDisposition = response.headers.get('content-disposition');
    let filename = `GGU_Student_Applications_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]*)"?/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    
    console.log('Downloading file:', filename);
    
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
    
    alert('Excel file downloaded successfully!');
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download Excel file: ' + error.message);
  } finally {
    setLoading(false);
  }
};


  if (selectedApplication) {
    return (
      <div>
        <button
          onClick={() => setSelectedApplication(null)}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back to List
        </button>

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Application Details</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <h3>Personal Information</h3>
              <p>
                <strong>Name:</strong> {selectedApplication.student_name || 'N/A'}
              </p>
              <p>
                <strong>Father's Name:</strong> {selectedApplication.fatherName || 'N/A'}
              </p>
              <p>
                <strong>Mother's Name:</strong> {selectedApplication.motherName || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {selectedApplication.student_email || 'N/A'}
              </p>
              <p>
                <strong>DOB:</strong> {selectedApplication.dob || 'N/A'}
              </p>
              <p>
                <strong>Gender:</strong> {selectedApplication.gender || 'N/A'}
              </p>
              <p>
                <strong>Nationality:</strong> {selectedApplication.nationality || 'N/A'}
              </p>
              <p>
                <strong>Religion:</strong> {selectedApplication.religion || 'N/A'}
              </p>
              <p>
                <strong>Category:</strong> {selectedApplication.category || 'N/A'}
              </p>
              <p>
                <strong>JEE Mains Application No.:</strong> {selectedApplication.applicationNum || 'N/A'}
              </p>
              <p>
                <strong>CRL Rank:</strong> {selectedApplication.crlRank || 'N/A'}
              </p>
            </div>

            <div>
              <h3>Contact & Other Details</h3>
              <p>
                <strong>Mobile:</strong> {selectedApplication.mobile || 'N/A'}
              </p>
              <p>
                <strong>Alt Mobile:</strong> {selectedApplication.altMobile || 'N/A'}
              </p>
              <p>
                <strong>Address:</strong> {selectedApplication.address || 'N/A'}
              </p>
              <p>
                <strong>Amount:</strong> ₹{selectedApplication.amount || 'N/A'}
              </p>
              <p>
                <strong>Bank:</strong> {selectedApplication.bank || 'N/A'}
              </p>
              <p>
                <strong>Fee Payment Date:</strong>{" "}
                {selectedApplication.date_feepayment || 'N/A'}
              </p>
              <p>
                <strong>Physically Challenged:</strong>{" "}
                {selectedApplication.physChallenged || 'N/A'}
              </p>
              <p>
                <strong>Admission Status:</strong>{" "}
                {selectedApplication.admissionStatus || 'N/A'}
              </p>
              {selectedApplication.branchName && (
                <p>
                  <strong>Branch Name:</strong> {selectedApplication.branchName}
                </p>
              )}
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3>Documents</h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {selectedApplication.categoryCert && (
                <a
                  href={selectedApplication.categoryCert}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#007bff",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Category Certificate
                </a>
              )}
              {selectedApplication.feeReceipt && (
                <a
                  href={selectedApplication.feeReceipt}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#28a745",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Fee Receipt
                </a>
              )}
              {selectedApplication.appForm && (
                <a
                  href={selectedApplication.appForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#ffc107",
                    color: "black",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Application Form
                </a>
              )}
              {selectedApplication.jeeScorecard && (
                <a
                  href={selectedApplication.jeeScorecard}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#17a2b8",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  JEE Scorecard
                </a>
              )}
              {selectedApplication.marksheet12 && (
                <a
                  href={selectedApplication.marksheet12}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#fd7e14",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Class 12th Marksheet
                </a>
              )}
              {selectedApplication.allotmentLetter && (
                <a
                  href={selectedApplication.allotmentLetter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#e83e8c",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Allotment Letter
                </a>
              )}
              {selectedApplication.pwdCert && (
                <a
                  href={selectedApplication.pwdCert}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#20c997",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  PWD Certificate
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with search and download button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '15px'
        }}
      >
        <h2>Student Applications ({filteredApplications.length})</h2>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={downloadExcel}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? '⏳ Generating...' : '📥 Download Excel'}
          </button>
          
          <input
            type="text"
            placeholder="Search by name, email, mobile, JEE number, or rank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 15px',
              width: '350px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Mobile
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                JEE App No.
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                CRL Rank
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Category
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "15px" }}>{application.student_name || 'N/A'}</td>
                <td style={{ padding: "15px" }}>{application.student_email || 'N/A'}</td>
                <td style={{ padding: "15px" }}>{application.mobile || 'N/A'}</td>
                <td style={{ padding: "15px" }}>{application.applicationNum || 'N/A'}</td>
                <td style={{ padding: "15px" }}>{application.crlRank || 'N/A'}</td>
                <td style={{ padding: "15px" }}>{application.category || 'N/A'}</td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <button
                    onClick={() => viewApplication(application)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApplications.length === 0 && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#6c757d'
          }}>
            <p>No applications found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;
