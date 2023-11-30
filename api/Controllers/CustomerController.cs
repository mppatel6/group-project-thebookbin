using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        // GET: api/Customer
        [HttpGet]
        public List<Customer> Get()
        {
            CustomerUtility readCust = new CustomerUtility();
            return readCust.ReadCustomers();
        }

        // GET: api/Customer/5
        [HttpGet("{id}", Name = "GetCustomer")]
        public string GetCustomer(int id)
        {
            return "value";
        }

        // POST: api/Customer
        [HttpPost]
        public void Post([FromBody] Customer value)
        {
            CustomerUtility addCust = new CustomerUtility();
            addCust.AddCustomers(value);
        }

        // PUT: api/Customer/5
        [HttpPut]
        public void Put([FromBody] Customer value)
        {
            CustomerUtility editCust = new CustomerUtility();
            editCust.EditCustomers(value);
        }

        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
