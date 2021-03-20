  FlowerItemSchema = mongoos.Schema({
		_id: mongoos.Schema.Types.ObjectId,
	title: {type: String,
					required: true
	},
	description: {type: String,
								required: true
	},
	price: {type: Number, 
					required: true
				},
	isAvailable: {type: bool,
								default: 'Available'
	}
});

	module.exports = mongoos.model('FlowerItem', FlowerItemSchema);
	
	const Item = require('../models/FlowerItem');
	