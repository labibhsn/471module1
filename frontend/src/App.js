import React, { useState, useEffect } from 'react';

function App() {
  const [stats, setStats] = useState({
    totalSales: 0,
    activeUsersCount: 0,
    auctionSuccessRate: 0,
  });
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    userCategory: '',
  });
  const [warningMessage, setWarningMessage] = useState('');
  const [auctions, setAuctions] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch statistics from backend
  const fetchStatistics = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`http://localhost:5000/admin/statistics?${query}`);
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStatistics();
  }, [filters]);

  // Handlers for filter inputs
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Suspend auction
  const suspendAuction = async (auctionId) => {
    await fetch(`http://localhost:5000/admin/suspend-auction/${auctionId}`, {
      method: 'POST',
    });
    alert('Auction suspended');
    // Refresh data if needed
  };

  // Warn user
  const warnUser = async (userId) => {
    if (!warningMessage) {
      alert('Please enter a warning message');
      return;
    }
    await fetch(`http://localhost:5000/admin/warn-user/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: warningMessage }),
    });
    alert('User warned');
    setWarningMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard - Auction Site</h1>

      <h2>Filters</h2>
      <label>
        Start Date:
        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
      </label>
      <label style={{ marginLeft: '10px' }}>
        End Date:
        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
      </label>
      <label style={{ marginLeft: '10px' }}>
        User Category:
        <select name="userCategory" value={filters.userCategory} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="regular">Regular</option>
          <option value="premium">Premium</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <h2>Statistics</h2>
      <p>Total Sales: ${stats.totalSales.toFixed(2)}</p>
      <p>Active Users: {stats.activeUsersCount}</p>
      <p>Auction Success Rate: {stats.auctionSuccessRate.toFixed(2)}%</p>

      <h2>Admin Actions</h2>
      <div>
        <h3>Suspend Auction</h3>
        <input
          type="text"
          placeholder="Auction ID"
          onChange={(e) => setFilters({ ...filters, auctionIdToSuspend: e.target.value })}
        />
        <button onClick={() => suspendAuction(filters.auctionIdToSuspend)}>Suspend</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Warn User</h3>
        <input
          type="text"
          placeholder="User ID"
          onChange={(e) => setFilters({ ...filters, userIdToWarn: e.target.value })}
        />
        <input
          type="text"
          placeholder="Warning message"
          value={warningMessage}
          onChange={(e) => setWarningMessage(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <button onClick={() => warnUser(filters.userIdToWarn)}>Warn</button>
      </div>
    </div>
  );
}

export default App;
