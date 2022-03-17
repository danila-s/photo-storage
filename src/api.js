async function loginToServer(login, password) {
    const obj = {
      login: login,
      password: password,
    };
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


  export {loginToServer}