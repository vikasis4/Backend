const mongoose = require('mongoose');

const Variables = new mongoose.Schema({
    var1: { type: 'string' },
    var2: { type: 'string' },
    var3: { type: 'string' },
    var4: { type: 'string' },
    var5: { type: 'string' },
    var6: { type: 'string' },
    var7: { type: 'string' },
    var8: { type: 'string' },
    var9: { type: 'string' },
    var10: { type: 'string' },
    var11: { type: 'string' },
    var12: { type: 'string' },
    var13: { type: 'string' },
    var14: { type: 'string' },
    var15: { type: 'string' },
    var16: { type: 'string' },
    var17: { type: 'string' },
    var18: { type: 'string' },
    var19: { type: 'string' },
    var20: { type: 'string' },
})

module.exports = mongoose.model('Variables', Variables)