const express = require('express');
const cors = require('cors');
const { requestLogger } = require('./middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

const notifications = [
  { id: '1', type: 'Placement', message: 'Company X is visiting for internships.', timestamp: '2026-05-02T10:30:00Z' },
  { id: '2', type: 'Result', message: 'Semester results are out for all students.', timestamp: '2026-05-02T11:00:00Z' },
  { id: '3', type: 'Event', message: 'Campus cultural fest starts next week.', timestamp: '2026-05-01T16:00:00Z' },
  { id: '4', type: 'Placement', message: 'New placement drive added for final year students.', timestamp: '2026-05-02T12:15:00Z' },
  { id: '5', type: 'Result', message: 'Sports team selection results published.', timestamp: '2026-05-02T09:45:00Z' }
];

const priorityWeights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function sortNotifications(list) {
  return [...list].sort((a, b) => {
    const priorityScore = (priorityWeights[b.type] || 0) - (priorityWeights[a.type] || 0);
    if (priorityScore !== 0) return priorityScore;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
}

app.get('/notifications', (req, res) => {
  const topN = Number(req.query.top) || 5;
  const sorted = sortNotifications(notifications);
  res.json({ items: sorted.slice(0, topN), total: sorted.length });
});

app.listen(4000, () => {
  console.log('Notification backend running on http://localhost:4000');
});
