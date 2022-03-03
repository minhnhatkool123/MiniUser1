const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Moment = require("moment");

autoIncrement.initialize(mongoose);

const Schema = mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true,
		},
		expiredTime: {
			type: Date,
			default: Moment(new Date()).add(15, "minutes"),
		},
		email: {
			type: String,
			require: true,
		},
		code: {
			type: String,
			required: true,
		},
	},
	{
		collection: "Service_MiniProgramOtp",
		versionKey: false,
		timestamps: true,
	}
);

Schema.plugin(autoIncrement.plugin, {
	model: `${Schema.options.collection}-id`,
	field: "id",
	startAt: 1,
	incrementBy: 1,
});

//Schema.plugin(autoIncrement.plugin, Schema.options.collection);

module.exports = mongoose.model(Schema.options.collection, Schema);
