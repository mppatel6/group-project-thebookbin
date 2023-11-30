const url = "https://localhost:5263/api/Customer";
let Customers = []

async function handleOnLoad(){
    Customers = await getCustomers()
    console.log(Customers)
    displayTokens()
}

async function getCustomers(){
    let response = await fetch(url)
    let customers = await response.json()

    return await customers
}

async function displayTokens(){
    const tokenAmountElement = document.getElementById('tokenAmount');

    // Check if user is logged in
    const email = localStorage.getItem('email');
    if (email) {
        const foundCustomer = Customers.find(customer => customer.customerEmail === email);
        console.log(foundCustomer)

        // Display the token amount
        tokenAmountElement.textContent = `Your Token Amount: ${foundCustomer.customerTokenAmount}`;
    } else {
        // Hide the token amount if no user is logged in
        tokenAmountElement.textContent = '';
    }
}

