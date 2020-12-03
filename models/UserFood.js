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

UserFoodSchema.index({
    user: 1,
    name: 1,
}, {
    unique: true,
});

const UserFood = mongoose.model('userFoods', UserFoodSchema);
module.exports = UserFood;