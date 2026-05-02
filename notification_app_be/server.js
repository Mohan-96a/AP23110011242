const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { requestLogger } = require('./middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

const EXTERNAL_API_URL = 'http://20.207.122.201/evaluation-service/notifications';
const priorityWeights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function normalizeNotification(item) {
  return {
    id: item.ID || item.id,
    type: item.Type || item.type,
    message: item.Message || item.message,
    timestamp: item.Timestamp || item.timestamp
  };
}

function sortNotifications(list) {
  return [...list].sort((a, b) => {
    const priorityScore = (priorityWeights[b.type] || 0) - (priorityWeights[a.type] || 0);
    if (priorityScore !== 0) return priorityScore;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
}

async function fetchExternalNotifications(authHeader) {
  const headers = {};
  if (authHeader) {
    headers.Authorization = authHeader;
  }

  const response = await axios.get(EXTERNAL_API_URL, { headers, timeout: 10000 });
  if (!response.data || !Array.isArray(response.data.notifications)) {
    throw new Error('Unexpected API response format');
  }

  return response.data.notifications.map(normalizeNotification);
}

app.get('/top-notifications', async (req, res) => {
  try {
    const topN = Number(req.query.top) || Number(req.query.limit) || 10;
    const filterType = req.query.notification_type || req.query.type;
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = topN;
    const authHeader = req.header('Authorization') || process.env.EVAL_API_AUTH;

    const notifications = await fetchExternalNotifications(authHeader);
    let filtered = notifications;

    if (filterType) {
      filtered = filtered.filter((notification) => notification.type === filterType);
    }

    const sorted = sortNotifications(filtered);
    const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

    res.json({ items: paginated, total: sorted.length, page, pageSize });
  } catch (error) {
    res.status(502).json({ error: error.message || 'Unable to retrieve notifications' });
  }
});

app.listen(4000, () => {
  console.log('Notification backend running on http://localhost:4000');
});
