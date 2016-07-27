'use strict';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({
        active: true,
        url: "https://*.shaparak.ir/*"
    }, tabs => {
    	const tab = tabs[0];
        chrome.pageAction.show(tab.id);
        chrome.pageAction.setIcon({
        	tabId: tab.id,
        	path: {
        		"128": "images/verified_icon_128.png"
        	}
        });
        chrome.pageAction.setTitle({
        	tabId: tab.id,
        	title: chrome.i18n.getMessage("verified")
        })
    });
});