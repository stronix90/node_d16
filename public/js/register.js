document.getElementById("formRegister").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = document.getElementById("formRegister");

    axios
        .post(
            "/api/register",
            {
                email: form[0].value,
                password: form[1].value,
                name: form[2].value,
                lastname: form[3].value,
                age: form[4].value,
                nickname: form[5].value,
            },
            {
                withCredentials: true,
            }
        )
        .then((res) => {
            window.location.href = "/";
        })
        .catch((err) => alert(err.response.data.error));
});
