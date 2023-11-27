const url = "http://localhost:5263/api/Customer"


async function handleCreateAccount() {
    let customer = {
        CID: 0,
        CustomerEmail: document.getElementById('floatingInput').value,
        CustomerPassword: document.getElementById('floatingPassword').value,
        CustomerTokenAmount: 0
    }

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(customer),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}