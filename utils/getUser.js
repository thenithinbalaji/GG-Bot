const mongo = require('@root/database/mongo');
const userSchema = require('@schemas/userSchema');
const addUser = require('./addUser');

module.exports = async (name, userId) => {
    return (
        (await userSchema.findOne({
            userId,
        })) || (await addUser(name, userId))
    );
};
