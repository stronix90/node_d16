const mongoose = require("mongoose");
const { Schema } = mongoose;

const util = require("util");

const { normalize, schema: normalizrSchema } = require("normalizr");

// --- Normalizr Schemas ------------------------------
const userSchema = new normalizrSchema.Entity(
    "user",
    {},
    {
        idAttribute: "email",
    }
);
const messageSchema = new normalizrSchema.Entity(
    "message",
    { author: userSchema },
    { idAttribute: "_id" }
);

const chat = new normalizrSchema.Entity("chat", {
    messages: [messageSchema],
});

const ContainerMongo = require("../containers/mongoContainer");

class CartDaoMongo extends ContainerMongo {
    constructor() {
        super(
            "messages",
            new Schema(
                {
                    author: {
                        email: String,
                        nombre: String,
                        apellido: String,
                        edad: Number,
                        alias: String,
                        avatar: String,
                    },
                    text: String,
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

    print(objeto) {
        console.log(util.inspect(objeto, false, 12, true));
    }

    normalizeMessages = (messages) => {
        const formattedMessages = { id: 1000, messages };
        const normalizedData = normalize(formattedMessages, chat);

        const originalSize = JSON.stringify(messages).length;
        const normalizedSize = JSON.stringify(normalizedData).length;

        return {
            savedSpace: (normalizedSize * 100) / originalSize,
            messages: normalizedData,
        };
    };
}

module.exports = CartDaoMongo;
