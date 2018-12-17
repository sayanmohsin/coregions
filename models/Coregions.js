var mongoose = require('../configs/nosql.config');
var Schema = mongoose.Schema;

var coregionsSchema = new Schema({
    region: { 
        type: String
    },
    subregion: { 
        type: String
    },
    area: { 
        type: String
    },
    common: { 
        type: String
    },
    official: { 
        type: String
    },
    capital: { 
        type: String
    },
    borders: [{
        type: String
    }],
    cca2: { 
        type: String
    },
    ccn3: { 
        type: String
    },
    cca3: { 
        type: String
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    },
    updatedDate: { 
        type: Date, 
        default: Date.now 
    }
});

var Coregions = mongoose.model('coregions', coregionsSchema);

module.exports = Coregions;