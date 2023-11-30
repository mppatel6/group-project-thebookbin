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
    public class OrderDetailsController : ControllerBase
    {
        // GET: api/OrderDetails
        [HttpGet]
        public List<OrderDetails> Get()
        {
            OrderDetailsUtility readOD = new OrderDetailsUtility();
            return readOD.ReadOD();
        }

        // GET: api/OrderDetails/5
        [HttpGet("{id}", Name = "GetOrderDetail")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/OrderDetails
        [HttpPost]
        public void Post([FromBody] OrderDetails value)
        {
            OrderDetailsUtility addOD = new OrderDetailsUtility();
            addOD.AddOrderDetails(value);
        }

        // PUT: api/OrderDetails/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] OrderDetails value)
        {
            OrderDetailsUtility editOD = new OrderDetailsUtility();
            editOD.EditOrderDetails(value);
        }

        // DELETE: api/OrderDetails/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
