const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
};

const userSchema = mongoose.Schema({
    userid : reqString,
	hourlyclaimtimestamp : Number,
	dailyclaimtimestamp : Number,
	weeklyclaimtimestamp : Number,
	lastplundertimestamp : Number,
	coinbalance : Number,
	vaultcoins : Number,
	vaultsize : Number,
	userxp : Number, 
	userlevel : Number,
	userhp : Number,
	useratk : Number,
	userdef : Number,
	itemcount : Number,
	commandsusedcount : Number,
	huntedcount : Number,
	fishedcount : Number,
	moodleuserid : String, 
	moodleAPIkey : String
  },
  {
	  timestamps: true,
  });

module.exports = mongoose.model('user', userSchema);
