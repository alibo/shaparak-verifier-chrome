'use strict';

import Notification from './Notification.js';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (shouldNotifyUser(changeInfo, tab)) {
        enablePopup(tab);
        showNotification(tab);
    }
});

function shouldNotifyUser(changeInfo, tab) {
    return changeInfo.status === 'complete' && isShaparak(tab.url);
}

function isShaparak(urlString) {
    try {
        const url = new URL(urlString);
        return url.hostname.match(/\.shaparak\.ir$/i) && url.protocol == 'https:';
    } catch (e) {
        return false;
    }
}

function enablePopup(tab) {
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
}

function showNotification(tab) {
    chrome.storage.sync.get({
        automaticNotification: false,
        automaticNotificationDuration: 2
    }, (items) => {
        if (items.automaticNotification) {
            const duration = items.automaticNotificationDuration;

            Notification.make(tab, duration).show();
        }
    });
}