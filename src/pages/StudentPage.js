import React, { useState } from 'react';
import AdmissionForm from '../components/student/AdmissionForm';
import SuccessPage from '../components/student/SuccessPage';
import LoadingSpinner from '../components/common/LoadingSpinner';


const StudentPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmissionSuccess = () => {
    console.log('✅ handleSubmissionSuccess called');
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleSubmissionStart = () => {
    console.log('⏳ handleSubmissionStart called');
    setIsLoading(true);
    setIsSubmitted(false);
  };

  const handleSubmissionError = () => {
    console.log('❌ handleSubmissionError called');
    setIsLoading(false);
    setIsSubmitted(false);
  };

  const resetForm = () => {
    console.log('🔄 resetForm called');
    setIsSubmitted(false);
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingSpinner message="Submitting your application..." />;
  }

  if (isSubmitted) {
    return <SuccessPage onReset={resetForm} />;
  }

  return (
    <div className="student-page">
      <AdmissionForm
        apiBaseUrl={API_BASE_URL} // ✅ Pass API_BASE_URL to AdmissionForm
        onSubmissionStart={handleSubmissionStart}
        onSubmissionSuccess={handleSubmissionSuccess}
        onSubmissionError={handleSubmissionError}
      />
    </div>
  );
};

export default StudentPage;
