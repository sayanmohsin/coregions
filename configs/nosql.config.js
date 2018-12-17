const mongoose = require('bluebird').promisifyAll(require('mongoose'));

(async () => {
    // await mongoose.connect('mongodb://localhost:27017/coregions', { useNewUrlParser: true });
    await mongoose.connect('mongodb://coregion:coregion777@ds129386.mlab.com:29386/coregions', { useNewUrlParser: true });
})().catch(err => {
    console.error(err);
});


module.exports = mongoose;