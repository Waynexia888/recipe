const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserFoodSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// use the unique constraint on a compound index
// define a combination of fields to be unique
// same user can only add one food name to the fridge.
UserFoodSchema.index({
    user: 1,
    name: 1,
}, {
    unique: true,
});

const UserFood = mongoose.model('userFoods', UserFoodSchema);
module.exports = UserFood;