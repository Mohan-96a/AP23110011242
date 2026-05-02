const apiUrl = 'http://localhost:4000/notifications?top=5';
const notificationContainer = document.getElementById('notifications');
const countElement = document.getElementById('notification-count');

function formatTimestamp(value) {
  return new Date(value).toLocaleString();
}

function renderNotifications(items) {
  notificationContainer.innerHTML = '';
  items.forEach((notification) => {
    const card = document.createElement('article');
    card.className = `notification ${notification.type.toLowerCase()}`;
    card.innerHTML = `
      <h2>${notification.type}</h2>
      <p>${notification.message}</p>
      <time>${formatTimestamp(notification.timestamp)}</time>
    `;
    notificationContainer.appendChild(card);
  });
}

async function loadNotifications() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    countElement.textContent = `Showing top ${data.items.length} of ${data.total} notifications`;
    renderNotifications(data.items);
  } catch (error) {
    notificationContainer.innerHTML = '<p class="error">Unable to load notifications.</p>';
    console.error('Notification load failed', error);
  }
}

loadNotifications();
