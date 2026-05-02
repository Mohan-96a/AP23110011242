import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Button,
  Chip,
  Stack,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import NotificationCard from './NotificationCard';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LIMIT = 10;
  const API_BASE = 'http://20.207.122.201/evaluation-service/notifications';

  useEffect(() => {
    fetchNotifications();
  }, [filterType, page]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      let url = API_BASE;
      const params = new URLSearchParams();
      params.append('limit', LIMIT);
      params.append('page', page);
      if (filterType) {
        params.append('notification_type', filterType);
      }

      const fullUrl = `${url}?${params.toString()}`;
      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data.notifications || []);
      setFilteredNotifications(data.notifications || []);
    } catch (err) {
      setError(err.message || 'Failed to load notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);

    const types = [null, 'Placement', 'Result', 'Event'];
    setFilterType(types[newValue]);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil((notifications.length > 0 ? 100 : 0) / LIMIT);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <NotificationsIcon sx={{ fontSize: 32, color: '#1976d2' }} />
        <h1 style={{ margin: 0, fontSize: '28px', color: '#333' }}>Notification Priority Inbox</h1>
      </Box>

      <Paper sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="All Notifications" />
          <Tab label="Placement" />
          <Tab label="Results" />
          <Tab label="Events" />
        </Tabs>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : filteredNotifications.length === 0 ? (
        <Alert severity="info">No notifications found</Alert>
      ) : (
        <>
          <Stack spacing={2} sx={{ mb: 4 }}>
            {filteredNotifications.map((notif) => (
              <NotificationCard key={notif.ID || notif.id} notification={notif} />
            ))}
          </Stack>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
