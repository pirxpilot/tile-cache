var ua = require('ua-query');

/* global self */

function isModernIndexedDB() {
  return ua.isChrome(36) || ua.isFirefox(16) || ua.isSafari(10) || ua.isStandalone_iOS(10);
}

if (!isModernIndexedDB()) {
  self._mlasq_old_browser = true;
}
