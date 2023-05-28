var http = require('http'),
	fs = require('fs'),
	ccav = require('./ccavutil.js'),
	qs = require('querystring');
const axios = require('axios');

exports.postRes = function (request, response) {
	var ccavEncResponse = '',
		ccavResponse = '',
		workingKey = '706C8D6B6AF0D4D37E61D2679CECB970',	//Put in the 32-Bit key shared by CCAvenues.
		ccavPOST = '';

	request.on('data', function (data) {
		ccavEncResponse += data;
		ccavPOST = qs.parse(ccavEncResponse);
		var encryption = ccavPOST.encResp;
		ccavResponse = ccav.decrypt(encryption, workingKey);
	});

	request.on('end', async function () {
		await axios.post('https://api.rankboost.live/api/pay/handle', { str: ccavResponse }).then(function (response) {
			if (response.data.success) {
				response.json({ Msg: 'Payment SuccessFull' })
				response.json(ccavResponse)
			} else {
				response.json({ Msg: 'Payment Failed, If Money is deducted contact customer support' })
			}
		})
		var pData = '';
		pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
		pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
		pData = pData.replace(/&/gi, '</td></tr><tr><td>')
		pData = pData + '</td></tr></table>'
		htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';
		response.writeHeader(200, { "Content-Type": "text/html" });
		response.write(htmlcode);
		response.end();
	});
};
