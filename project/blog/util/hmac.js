const crypto = require('crypto');
module.exports = (str)=>{
    const hmac = crypto.createHmac('sha512','zylby408416');
    hmac.update(str);
    return hmac.digest('hex');
}