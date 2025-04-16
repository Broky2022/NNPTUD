import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import Alert from '../components/common/Alert';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // This assumes you have an API endpoint for admin stats
      const response = await axios.get('/admin/stats');
      setStats(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load admin statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="container mt-4">
        <Alert type="error" message="You don't have permission to access this page." />
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container p-4">
        <h1 className="title is-2">Admin Panel</h1>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {loading ? (
          <div className="has-text-centered p-4">Loading statistics...</div>
        ) : (
          <div className="columns is-multiline">
            <div className="column is-3">
              <div className="box has-text-centered">
                <p className="heading">Total Users</p>
                <p className="title">{stats?.totalUsers || 0}</p>
                <Link to="/users" className="button is-primary is-small mt-2">Manage Users</Link>
              </div>
            </div>

            <div className="column is-3">
              <div className="box has-text-centered">
                <p className="heading">Total Classes</p>
                <p className="title">{stats?.totalClasses || 0}</p>
                <Link to="/classes" className="button is-primary is-small mt-2">Manage Classes</Link>
              </div>
            </div>

            <div className="column is-3">
              <div className="box has-text-centered">
                <p className="heading">Active Students</p>
                <p className="title">{stats?.totalStudents || 0}</p>
              </div>
            </div>

            <div className="column is-3">
              <div className="box has-text-centered">
                <p className="heading">Active Teachers</p>
                <p className="title">{stats?.totalTeachers || 0}</p>
              </div>
            </div>
          </div>
        )}

        <div className="box p-4 mt-4">
          <h2 className="title is-4">System Management</h2>
          <div className="buttons">
            <Link to="/users" className="button is-primary">
              User Management
            </Link>
            <Link to="/classes" className="button is-info">
              Class Management
            </Link>
            <button className="button is-warning" onClick={fetchStats}>
              Refresh Stats
            </button>
          </div>
        </div>

        <div className="box p-4 mt-4">
          <h2 className="title is-4">Recent Activities</h2>
          {stats?.recentActivities?.length ? (
            <ul>
              {stats.recentActivities.map((activity, index) => (
                <li key={index} className="mb-2">
                  <strong>{activity.user}</strong> {activity.action} - {new Date(activity.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activities recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;