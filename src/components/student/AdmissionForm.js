import React, { useState } from "react";
import Header from "./Header";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import FeeInfoSection from "./FeeInfoSection";
import DocumentUploadSection from "./DocumentUploadSection";
import DeclarationSection from "./DeclarationSection";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ggu-btech-form-b.vercel.app/";




const AdmissionForm = ({ onSubmissionStart, onSubmissionSuccess, onSubmissionError }) => {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    email: "",
    gender: "",
    nationality: "",
    religion: "",
    category: "",
    address: "",
    mobile: "",
    altMobile: "",
    refNo: "",
    amount: "",
    bank: "",
    date_feepayment: "",
    physChallenged: "",
    admissionStatus: "",
    department: "",
    branchName: "",
    applicationNum: "",
    crlRank: "",
    mark12: "",
    categoryCert: null,
    feeReceipt: null,
    appForm: null,
    marksheet12: null,
    jeeScorecard: null,
    allotmentLetter: null,
    pwdCert: null,
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('🚀 Starting form submission...');
  
  onSubmissionStart();

  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (value !== null && value !== '') {
      formData.append(key, value);
    }
  });

  try {
    const response = await fetch(`${API_BASE_URL}/api/admission`, {
      method: 'POST',
      body: formData,
    });

    console.log('📊 Response status:', response.status);
    console.log('📋 Content-Type:', response.headers.get('content-type'));
    
    // Check content type before parsing
    const contentType = response.headers.get('content-type');
    
    if (response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('✅ Success:', result);
        onSubmissionSuccess();
      } else {
        console.log('✅ Success (non-JSON response)');
        onSubmissionSuccess();
      }
    } else {
      // Handle error responses
      let errorMessage = `HTTP ${response.status}`;
      
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } else {
        const errorText = await response.text();
        console.error('❌ HTML Error Response:', errorText.substring(0, 200));
        errorMessage = `Server returned HTML error page (${response.status})`;
      }
      
      throw new Error(errorMessage);
    }
    
  } catch (error) {
    console.error('💥 Request failed:', error);
    alert(`Submission failed: ${error.message}`);
    onSubmissionError();
  }
};




  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <Header />
      <PersonalInfoSection form={form} onChange={handleChange} />
      <ContactInfoSection form={form} onChange={handleChange} />
      <FeeInfoSection form={form} onChange={handleChange} />
      <DocumentUploadSection form={form} onChange={handleChange} />
      <DeclarationSection form={form} onChange={handleChange} />
      
      <button type="submit" style={{ marginTop: 20, width: "100%" }}>
        Submit
      </button>
    </form>
  );
};

export default AdmissionForm;
