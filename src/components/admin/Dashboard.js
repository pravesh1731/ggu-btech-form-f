import React, { useState, useEffect, useCallback } from "react";
import ApplicationsList from "./ApplicationsList";
import Statistics from "./Statistics";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  const fetchApplications = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/applications`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/statistics`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok) {
        setStatistics(data.statistics);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
    fetchStatistics();
  }, [fetchApplications, fetchStatistics]);

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
    },
    header: {
      backgroundColor: "#fff",
      padding: "15px 5vw",
      borderBottom: "1px solid #ddd",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      rowGap: "10px",
    },
    title: {
      margin: 0,
      color: "#333",
      fontSize: "1.5rem",
    },
    logoutButton: {
      padding: "8px 16px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
    navTabs: {
      backgroundColor: "#fff",
      padding: "0 5vw",
      borderBottom: "1px solid #ddd",
    },
    tabContainer: {
      display: "flex",
      flexWrap: "wrap",
    },
    tabButton: (isActive) => ({
      padding: "12px 20px",
      border: "none",
      backgroundColor: isActive ? "#007bff" : "transparent",
      color: isActive ? "white" : "#333",
      cursor: "pointer",
      borderBottom: isActive ? "2px solid #007bff" : "none",
      fontSize: "1rem",
      flex: "1 1 auto",
      minWidth: "150px",
      textAlign: "center",
    }),
    content: {
      padding: "30px 5vw",
    },
    loadingText: {
      textAlign: "center",
      fontSize: "1.2rem",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>GGU Admin Dashboard</h1>
        <button onClick={onLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={styles.navTabs}>
        <div style={styles.tabContainer}>
          <button
            onClick={() => setActiveTab("applications")}
            style={styles.tabButton(activeTab === "applications")}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("statistics")}
            style={styles.tabButton(activeTab === "statistics")}
          >
            Statistics
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {loading ? (
          <div style={styles.loadingText}>Loading...</div>
        ) : (
          <>
            {activeTab === "applications" && (
              <ApplicationsList applications={applications} />
            )}
            {activeTab === "statistics" && (
              <Statistics statistics={statistics} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
