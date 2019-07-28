const crypto = require('crypto');
const hmac = crypto.createHmac('sha256','zb408416');
hmac.update('123');
console.log(hmac.digest('hex'));