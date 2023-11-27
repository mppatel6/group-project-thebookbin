const url = "http://localhost:5263/api/Customer"
let Customers = []

async function handleOnLoad(){
    fetchCustomers()
}

async function fetchCustomers(){
    Customers = await getCustomers()
    console.log(Customers)

}

async function getCustomers(){
    let response = await fetch(url)
    let customers = await response.json()

    return await customers
}
