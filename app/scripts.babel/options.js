'use strict';

window.addEventListener('load', () => {
    const submitButton = document.getElementById('submit');
    const automaticNotification = document.getElementById('automaticNotification');
    const automaticNotificationDuration = document.getElementById('automaticNotificationDuration');
    const automaticNotificationDurationWrapper = document.getElementById('automaticNotificationDurationWrapper');

    // save user configrations and show proper message  
    let timer;
    const saveConfigurations = () => {
        const showSuccessMessage = () => {
            clearTimeout(timer);

            // show success message when user configurations saved
            const message = document.getElementById('successMessage');
            message.classList.add('visible');

            // automatically hide the message after 5 seconds
            timer = setTimeout(() => {
                message.classList.remove('visible');
            }, 5000);
        };

        chrome.storage.sync.set({
            automaticNotification: automaticNotification.checked,
            automaticNotificationDuration: automaticNotificationDuration.value
        }, showSuccessMessage);
    };

    // restore user configurations
    chrome.storage.sync.get({
        automaticNotification: false,
        automaticNotificationDuration: 2
    }, (items) => {
        automaticNotification.checked = items.automaticNotification;
        automaticNotificationDuration.value = items.automaticNotificationDuration;

        const hideDuration = () => {
            if (automaticNotification.checked === false) automaticNotificationDurationWrapper.classList.add('disabled')
            else automaticNotificationDurationWrapper.classList.remove('disabled');
        };
        hideDuration();

        automaticNotification.addEventListener('change', () => {
            hideDuration();
            saveConfigurations();
        });

        automaticNotificationDuration.addEventListener('change', () => {
            saveConfigurations();
        });
    });
});