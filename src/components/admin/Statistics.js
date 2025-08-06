import React from 'react';

const Statistics = ({ statistics }) => {
  if (!statistics) {
    return <div>Loading statistics...</div>;
  }

  const StatCard = ({ title, data, color = '#007bff' }) => (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{ color, marginBottom: '15px' }}>{title}</h3>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 0',
          borderBottom: '1px solid #eee'
        }}>
          <span>{key}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h2>Application Statistics</h2>
      
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#28a745', fontSize: '48px', margin: 0 }}>
          {statistics.totalApplications}
        </h1>
        <p style={{ fontSize: '18px', color: '#666', margin: '10px 0 0 0' }}>
          Total Applications Received
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        <StatCard 
          title="Category Breakdown" 
          data={statistics.categoryBreakdown}
          color="#007bff"
        />
        <StatCard 
          title="Gender Distribution" 
          data={statistics.genderBreakdown}
          color="#28a745"
        />
        <StatCard 
          title="Admission Status" 
          data={statistics.admissionStatusBreakdown}
          color="#ffc107"
        />
        <StatCard 
          title="Physically Challenged" 
          data={statistics.physChallengedBreakdown}
          color="#dc3545"
        />
      </div>
    </div>
  );
};

export default Statistics;
