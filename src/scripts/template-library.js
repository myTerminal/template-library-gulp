import jquery from 'jquery';

const messageTypes = {
    notification: 'notification',
    warning: 'warning',
    error: 'error'
};

const showMessage = function (root, text, messageType) {
    jquery(root).append('<p class="message ' + messageType + '">' + text + '</p>');
};

export const showNotification = function (root, text) {
    showMessage(root, text, messageTypes.notification);
};

export const showWarning = function (root, text) {
    showMessage(root, text, messageTypes.warning);
};

export const showError = function (root, text) {
    showMessage(root, text, messageTypes.error);
};
