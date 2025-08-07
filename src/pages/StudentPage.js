import React, { useState } from 'react';
import AdmissionForm from '../components/student/AdmissionForm';
import SuccessPage from '../components/student/SuccessPage';
import LoadingSpinner from '../components/common/LoadingSpinner';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;


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
    setIsSubmitted(false); // Reset submitted state
  };

  const handleSubmissionError = () => {
    console.log('❌ handleSubmissionError called');
    setIsLoading(false);
    setIsSubmitted(false); // Keep on form page
  };

  const resetForm = () => {
    console.log('🔄 resetForm called');
    setIsSubmitted(false);
    setIsLoading(false);
  };

  // Debug logging
  console.log('StudentPage render:', { isLoading, isSubmitted });

  if (isLoading) {
    return <LoadingSpinner message="Submitting your application..." />;
  }

  if (isSubmitted) {
    return <SuccessPage onReset={resetForm} />;
  }

  return (
    <div className="student-page">
      <AdmissionForm
        onSubmissionStart={handleSubmissionStart}
        onSubmissionSuccess={handleSubmissionSuccess}
        onSubmissionError={handleSubmissionError}
      />
    </div>
  );
};

export default StudentPage;
