import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalLikes: 0,
    totalBookings: 0,
    totalContacts: 0
  });

  useEffect(() => {
    // Check if user is admin
    if (!user || user.email !== 'vishnusagar@gmail.com') {
      navigate('/login');
      return;
    }

    // Load all user data from localStorage
    loadUserData();
  }, [user, navigate]);

  const loadUserData = () => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const allActivities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    
    // Enhance users with booking and contact data
    const enhancedUsers = allUsers.map(user => {
      const userBookings = JSON.parse(localStorage.getItem(`bookedVisits_${user.email}`) || '[]');
      const userContacts = JSON.parse(localStorage.getItem(`contactedProperties_${user.email}`) || '[]');
      
      return {
        ...user,
        bookings: userBookings,
        contacts: userContacts,
        hasBooked: userBookings.length > 0,
        hasContacted: userContacts.length > 0
      };
    });
    
    setUsers(enhancedUsers);
    setActivities(allActivities);

    // Calculate stats
    let totalLikes = 0;
    let totalBookings = 0;
    let totalContacts = 0;

    allUsers.forEach(u => {
      const userLikes = JSON.parse(localStorage.getItem(`likedProperties_${u.email}`) || '[]');
      const userBookings = JSON.parse(localStorage.getItem(`bookedVisits_${u.email}`) || '[]');
      const userContacts = JSON.parse(localStorage.getItem(`contactedProperties_${u.email}`) || '[]');
      
      totalLikes += userLikes.length;
      totalBookings += userBookings.length;
      totalContacts += userContacts.length;
    });

    setStats({
      totalUsers: allUsers.length,
      totalProperties: 12,
      totalLikes,
      totalBookings,
      totalContacts
    });
  };

  const deleteUser = (email) => {
    if (window.confirm(`Are you sure you want to delete user: ${email}?`)) {
      const updatedUsers = users.filter(u => u.email !== email);
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      
      // Log activity
      logActivity('User Deleted', `Admin deleted user: ${email}`);
    }
  };

  const logActivity = (action, description) => {
    const newActivity = {
      id: Date.now(),
      action,
      description,
      timestamp: new Date().toISOString(),
      user: 'Admin'
    };
    const updatedActivities = [newActivity, ...activities];
    localStorage.setItem('userActivities', JSON.stringify(updatedActivities));
    setActivities(updatedActivities);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Administrator</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-info">
            <h3>{stats.totalProperties}</h3>
            <p>Properties</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <h3>{stats.totalLikes}</h3>
            <p>Total Likes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <h3>{stats.totalContacts}</h3>
            <p>Contacts</p>
          </div>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users Management
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            {users.length === 0 ? (
              <p className="no-data">No users registered yet.</p>
            ) : (
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Registered</th>
                      <th>Bookings</th>
                      <th>Contacted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, index) => (
                      <tr key={index}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{formatDate(u.registeredAt || new Date().toISOString())}</td>
                        <td>
                          {u.hasBooked ? (
                            <div className="booking-info">
                              <span className="status-badge booked">✓ Booked</span>
                              <div className="booking-details">
                                {u.bookings.map((booking, idx) => (
                                  <div key={idx} className="booking-item">
                                    <strong>{booking.propertyTitle}</strong>
                                    <span>Date: {booking.date}</span>
                                    <span>Time: {booking.time}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="status-badge not-booked">No Bookings</span>
                          )}
                        </td>
                        <td>
                          {u.hasContacted ? (
                            <div className="contact-info">
                              <span className="status-badge contacted">✓ Contacted</span>
                              <div className="contact-details">
                                {u.contacts.map((contact, idx) => (
                                  <div key={idx} className="contact-item">
                                    <strong>{contact.propertyTitle}</strong>
                                    <span>Owner: {contact.ownerName}</span>
                                    <span>Date: {formatDate(contact.date)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="status-badge not-contacted">No Contacts</span>
                          )}
                        </td>
                        <td>
                          <button 
                            className="delete-btn" 
                            onClick={() => deleteUser(u.email)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
