const ContainerMongo = require("../containers/mongoContainer");

const mongoose = require("mongoose");
const { Schema } = mongoose;

class UserDaoMongo extends ContainerMongo {
    constructor() {
        super(
            "users",
            new Schema(
                {
                    email: String,
                    password: String,
                    name: String,
                    lastname: String,
                    age: Number,
                    nickname: String,
                },
                {
                    versionKey: false,
                },
                {
                    timestamps: true,
                }
            )
        );
    }

    checkUser = async (email) => {
        const res = await this.coll.find({ email });
        return res;
    };
}

module.exports = UserDaoMongo;
