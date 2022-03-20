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

async function upload(photo, description) {
    try {
        const response = await fetch(`http://localhost:8000/upload`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ photo: photo, description: description }),
        });

        const data = await response.json();
        return data
    }
    catch (err) {
        alert('Что-то пошло не так!')
        console.log(err)
    }
}


export { loginToServer, loginWithToken, upload }