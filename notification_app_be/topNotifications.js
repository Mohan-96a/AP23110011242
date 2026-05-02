const axios = require('axios');

const EXTERNAL_API_URL = 'http://20.207.122.201/evaluation-service/notifications';

const mockNotifications = [
  { ID: '1', Type: 'Result', Message: 'mid-sem', Timestamp: '2026-04-22 17:51:30' },
  { ID: '2', Type: 'Placement', Message: 'CSX Corporation hiring', Timestamp: '2026-04-22 17:51:18' },
  { ID: '3', Type: 'Event', Message: 'farewell', Timestamp: '2026-04-22 17:51:06' },
  { ID: '4', Type: 'Result', Message: 'mid-sem', Timestamp: '2026-04-22 17:50:54' },
  { ID: '5', Type: 'Result', Message: 'project-review', Timestamp: '2026-04-22 17:50:42' },
  { ID: '6', Type: 'Result', Message: 'external', Timestamp: '2026-04-22 17:50:30' },
  { ID: '7', Type: 'Result', Message: 'project-review', Timestamp: '2026-04-22 17:50:18' },
  { ID: '8', Type: 'Event', Message: 'tech-fest', Timestamp: '2026-04-22 17:50:06' },
  { ID: '9', Type: 'Placement', Message: 'Advanced Micro Devices Inc. hiring', Timestamp: '2026-04-22 17:49:42' }
];

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

async function fetchTopNotifications(limit = 10, useMock = true) {
  let notifications;
  
  if (!useMock) {
    const authHeader = process.env.EVAL_API_AUTH || process.env.AUTHORIZATION || null;
    const headers = {};
    if (authHeader) {
      headers.Authorization = authHeader;
    }

    const response = await axios.get(EXTERNAL_API_URL, { headers, timeout: 10000 });
    if (!response.data || !Array.isArray(response.data.notifications)) {
      throw new Error(`Unexpected API format: ${JSON.stringify(response.data)}`);
    }
    notifications = response.data.notifications;
  } else {
    notifications = mockNotifications;
  }

  const normalized = notifications.map(normalizeNotification);
  const sorted = sortNotifications(normalized);
  return sorted.slice(0, limit);
}

async function main() {
  try {
    const topNotifications = await fetchTopNotifications(10, true);
    console.log('\n=== Stage 1: Top 10 Priority Notifications ===\n');
    console.log(JSON.stringify({ top: 10, notifications: topNotifications }, null, 2));
    console.log('\n=== Summary ===');
    console.log(`Total: ${topNotifications.length} notifications displayed\n`);
    
    const byType = {};
    topNotifications.forEach(n => {
      byType[n.type] = (byType[n.type] || 0) + 1;
    });
    console.log('By Type:');
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    console.log('\nSorting: By Type Priority (Placement > Result > Event), then by Timestamp (Newest First)\n');
  } catch (error) {
    console.error('Failed to fetch top notifications:', error.message);
    process.exit(1);
  }
}

main();
