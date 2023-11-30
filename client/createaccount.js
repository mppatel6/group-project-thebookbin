const url = "https://localhost:5263/api/Customer"

async function handleCreateAccount() {
    let customer = {
        CID: 0,
        CustomerEmail: document.getElementById('floatingInput').value,
        CustomerPassword: document.getElementById('floatingPassword').value,
        CustomerTokenAmount: 0
    }

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(customer),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if (response.ok) {
        alert("Account created successfully!")
        window.location.href = "customerlogin.html"
    } else {
        alert("Account creation failed. Please try again.")
    }
}