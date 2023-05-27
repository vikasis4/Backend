var crypto = require('crypto');
exports.encrypt = function (plainText, workingKey) {
  var m = crypto.createHash('md5');
  m.update(workingKey);
  var key = Buffer.from(m.digest('hex'), 'hex'); // Convert the hash result to a Buffer
  var iv = Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex'); // Specify the IV as a Buffer
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  var encoded = cipher.update(plainText, 'utf8', 'hex');
  encoded += cipher.final('hex');
  return encoded;
};

exports.decrypt = function (encodedText, workingKey) {
  var m = crypto.createHash('md5');
  m.update(workingKey);
  var key = Buffer.from(m.digest('hex'), 'hex'); // Convert the hash result to a Buffer
  var iv = Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex'); // Specify the IV as a Buffer
  var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  var decoded = decipher.update(encodedText, 'hex', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
};
