self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      icon: '/path/to/notification/icon.png',
      badge: '/path/to/badge/icon.png',
      data: {
        url: event.data.url || '/'  // Default to the root URL if no specific URL is provided
      }
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  
    const urlToOpen = event.notification.data.url || '/';
    event.waitUntil(
      clients.openWindow(urlToOpen)
    );
  });