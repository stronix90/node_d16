document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = document.getElementById("formLogin");

    axios
        .post(
            "/api/login",
            {
                email: form[0].value,
                password: form[1].value,
            },
            {
                withCredentials: true,
            }
        )
        .then((res) => {
            window.location.href = "/";
        })
        .catch((err) => alert("Error al intentar loguearse"));
});
