/* global $ */

const templateWebLibrary = (function () {
    const messageTypes = {
        notification: 'notification',
        warning: 'warning',
        error: 'error'
    };

    const showMessage = function (root, text, messageType) {
        $(root).append('<p class="message ' + messageType + '">' + text + '</p>');
    };

    return {
        showNotification: function (root, text) {
            showMessage(root, text, messageTypes.notification);
        },
        showWarning: function (root, text) {
            showMessage(root, text, messageTypes.warning);
        },
        showError: function (root, text) {
            showMessage(root, text, messageTypes.error);
        }
    };
})();
