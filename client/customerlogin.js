const url = "http://localhost:5263/api/Customer";
let Customers = []

async function handleOnLoad(){
    fetchCustomers()

}

async function fetchCustomers(){
    // Customers = await getCustomers()
    // console.log(Customers)

}

async function getCustomers(){
    let response = await fetch(url)
    let customers = await response.json()

    return await customers
}

async function handleLogin() {
    let email = document.getElementById('floatingInput').value;
    let password = document.getElementById('floatingPassword').value;

    console.log(email)
    console.log(password)

    Customers = await getCustomers()
    console.log(Customers)

    const foundCustomer = Customers.find(customer =>
        customer.customerEmail === email && customer.customerPassword === password
    )

    if (foundCustomer) {
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)

        console.log("success")
        // Redirect to browse.html
        window.location.href = "./homepage.html"
    } else {
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.textContent = "Invalid email or password. Please try again.";
    }
}

async function getCustomers() {
    let response = await fetch(url);
    let customers = await response.json();
    return customers;
}