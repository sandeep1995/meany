var mongoose = require('mongoose');

var SocietySchema = new mongoose.Schema({

	societyName: {
		type: String,
		required: true
	},

	societyAddress: {
		type: String,
		required: true
	},

	joinDate: {
		type: Date,
		default: Date.now
	},

	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active'
	},

	locLat: {
		type: String,
		default: ''
	},

	locLong: {
		type: String,
		default: ''
	},

	contactPerson: {
		type: String,
		required: true
	},

	contactEmail: {
		type: String,
		default: ''
	},

	contactPhone: String,

	modulesSubscribed: {
		payments: {
			type: Boolean,
			default: false
		},
	    members: {
			type: Boolean,
			default: false
		},
	    classifieds: {
			type: Boolean,
			default: false
		},
	    contacts: {
			type: Boolean,
			default: false
		},
	    visitors: {
			type: Boolean,
			default: false
		},
	    notices: {
			type: Boolean,
			default: false
		},
	    polls: {
			type: Boolean,
			default: false
		},
	    documents: {
			type: Boolean,
			default: false
		},
	    employees: {
			type: Boolean,
			default: false
		},
	    residents: {
			type: Boolean,
			default: false
		},
	    services: {
			type: Boolean,
			default: false
		}
	},

	approvedPAX: {
		type: Number
	},

	merchId: {
		type: Number
	},

	merchKey: {
		type: Number
	},
	website: {
		type: String
	},
	merchSalt: {
		type: String
	},

	services: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ServiceOffered'
	}],
	
	admin: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'User'
  }
});

module.exports = mongoose.model('Society', SocietySchema);
