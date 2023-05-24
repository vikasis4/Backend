var crypto = require('crypto');

exports.encrypt = function (plainText, workingKey) {
	var derivedKey = crypto.pbkdf2Sync(workingKey, 'salt', 10000, 16, 'sha1');  
	var iv = Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex');
	var cipher = crypto.createCipheriv('aes-128-cbc', derivedKey, iv);
	var encoded = cipher.update(plainText, 'utf8', 'hex');
	encoded += cipher.final('hex');
	return encoded;
  };

  exports.decrypt = function (encText, workingKey) {
	var derivedKey = crypto.pbkdf2Sync(workingKey, 'salt', 10000, 16, 'sha1');  
	var iv = Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex');
	var decipher = crypto.createDecipheriv('aes-128-cbc', derivedKey, iv);
	var decoded = decipher.update(encText, 'hex', 'utf8');
	decoded += decipher.final('utf8');
	return decoded;
  };

