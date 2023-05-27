var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function (request, response) {
    var body = '',
        workingKey = '706C8D6B6AF0D4D37E61D2679CECB970',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVDT70KE49CC24TDCC',			//Put in the Access Code shared by CCAvenues.
        encRequest = '',
        formbody = '';

    request.on('data', function (data) {
        body += data;
        encRequest = ccav.encrypt(body, workingKey);
        formbody = '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });

    request.on('end', function () {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(formbody);
        response.end();
    });
    return;
};
