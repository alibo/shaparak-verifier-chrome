'use strict';
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.tabs.query({
    active: true,
    url: 'https://*.shaparak.ir/*'
  }, tabs => {
    const tab = tabs[0];
    
    if (typeof tab !== 'undefined') {
      const showNotification = (duration) => {
        const message = {
          iconUrl: 'images/verified_icon_128.png',
          type: 'basic',
          title: 'سایت معتبر است',
          message: 'با خیال راحت پرداخت خود را انجام دهید',
          priority: 1
        };

        // create unique notification id, this method creates different id for each transaction        
        const notificationId = `${tab.id}|${tab.url}`;

        chrome.notifications.create(notificationId, message, function () {
          if (chrome.runtime.lastError) console.log(chrome.runtime.lastError.message);

          // automatically hide the notification after 5 seconds
          setTimeout(() => {
            chrome.notifications.clear(notificationId, () => { });
          }, duration * 1000);
        });

        chrome.notifications.onClicked.addListener(id => {
          // hide notification on user click
          if (id === notificationId) chrome.notifications.clear(notificationId, () => {});
        });
      };

      const configurePopup = () => {
        chrome.pageAction.show(tab.id);
        chrome.pageAction.setIcon({
          tabId: tab.id,
          path: {
            '128': 'images/verified_icon_128.png'
          }
        });
        chrome.pageAction.setTitle({
          tabId: tab.id,
          title: chrome.i18n.getMessage('verified')
        });
      };

      chrome.storage.sync.get({
        automaticNotification: false,
        automaticNotificationDuration: 2
      }, (items) => {
        if (items.automaticNotification) showNotification(items.automaticNotificationDuration);
        configurePopup();
      });
    }
  });
});