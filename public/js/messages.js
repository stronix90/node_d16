//HANDLELOGIN
document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();

    socket.emit("getMessages");

    document.getElementById("loginContainer").classList.remove("d-block");
    document.getElementById("loginContainer").classList.add("d-none");

    document.getElementById("formMsg").classList.remove("d-none");
    document.getElementById("formMsg").classList.add("d-block");
});

// SEND MESSAGE
document.getElementById("formMsg").addEventListener("submit", (e) => {
    e.preventDefault();

    const newMessage = {
        author: {
            email: document.querySelector("#formLogin #email").value,
            nombre: document.querySelector("#formLogin #nombre").value,
            apellido: document.querySelector("#formLogin #apellido").value,
            edad: document.querySelector("#formLogin #edad").value,
            alias: document.querySelector("#formLogin #alias").value,
            avatar: document.querySelector("#formLogin #avatar").value,
        },
        text: document.querySelector("#formMsg #message").value,
    };
    socket.emit("newMessage", newMessage);

    document.querySelector("#formMsg #message").value = "";
});

// RECEIVE AND DRAW MESSAGES
// getAll
socket.on("inicioMsg", (data) => {
    const desnomalizedMessages = normalizr.denormalize(
        data.messages.result,
        chat,
        data.messages.entities
    );

    document.getElementById("savedSpace").innerHTML = data.savedSpace.toFixed(0)

    const messageUL = document.getElementById("messageUL");

    desnomalizedMessages.messages.map((msg) =>
        messageUL.appendChild(DOM_drawMessage(msg))
    );

    scrollDown();
});

// getNewOne
socket.on("newMessage", (data) => {
    const messageUL = document.getElementById("messageUL");
    messageUL.appendChild(DOM_drawMessage(data));

    scrollDown();
});

// NORMALIZR
// --- Normalizr Schemas ------------------------------
const userSchema = new normalizr.schema.Entity(
    "user",
    {},
    {
        idAttribute: "email",
    }
);
const messageSchema = new normalizr.schema.Entity(
    "message",
    { author: userSchema },
    { idAttribute: "_id" }
);

const chat = new normalizr.schema.Entity("chat", {
    messages: [messageSchema],
});

// DOM
const DOM_drawMessage = (msg) => {
    const email = document.querySelector("#formLogin #email").value;
    const DOM_msg = `
    <li
        class="m-2 liMessages ${email === msg.author.email && "liMessages_me"}">

        <div class="position-relative ${
            email === msg.author.email
                ? "liMessages__msgContainer"
                : "liMessages_me__msgContainer"
        }">

            <img
                style="width: 35px; position: absolute; top: -5; left: -22;"
                src="${msg.author.avatar}" alt="Avatar" >

            <p style="margin: 0; font-size:.7rem">${msg.author.alias}</p>

            <span style="margin: .5rem 0;">${msg.text}</span>

            <p style="margin: 0; font-size:.7rem">${moment(
                msg.created_at
            ).format("DD/MM/YYYY HH:mm:ss")}</p>

        </div>
    </li>`;

    return document.createRange().createContextualFragment(DOM_msg);
};

const scrollDown = () => {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.scrollTop = messageContainer.scrollHeight;
};
