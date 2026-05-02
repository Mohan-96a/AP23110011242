const axios = require('axios');

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

async function fetchTopNotifications(limit = 10) {
  const authHeader = process.env.EVAL_API_AUTH || process.env.AUTHORIZATION || null;
  const headers = {};
  if (authHeader) headers.Authorization = authHeader;

  const response = await axios.get(EXTERNAL_API_URL, { headers, timeout: 10000 });
  if (!response.data || !Array.isArray(response.data.notifications)) {
    throw new Error(`Unexpected API format: ${JSON.stringify(response.data)}`);
  }

  const normalized = response.data.notifications.map(normalizeNotification);
  const sorted = sortNotifications(normalized);
  return sorted.slice(0, limit);
}

async function main() {
  try {
    const topNotifications = await fetchTopNotifications(10);
    console.log(JSON.stringify({ top: 10, notifications: topNotifications }, null, 2));
  } catch (error) {
    console.error('Failed to fetch top notifications:', error.message);
    process.exit(1);
  }
}

main();
