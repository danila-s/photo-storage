async function loginToServer(login, password) {
    const obj = {
        login: login,
        password: password,
    };
    try {
        const response = await fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
        });

        const data = await response.json();
        return data
    }
    catch (err) {
        alert('Что-то пошло не так!')
        console.log(err)
    }
}

async function getActualImg() {
    try {
        const response = await fetch(`http://localhost:8000/gallery`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },

        });

        const data = await response.json();
        return data
    }
    catch (err) {
        alert('Что-то пошло не так!')
        console.log(err)
    }
}


async function loginWithToken(token) {
    try {
        const response = await fetch(`http://localhost:8000/token`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        });

        const data = await response.json();
        return data
    }
    catch (err) {
        alert('Что-то пошло не так!')
        console.log(err)
    }
}




export { loginToServer, loginWithToken, getActualImg }