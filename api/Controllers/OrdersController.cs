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
    public class OrdersController : ControllerBase
    {
        // GET: api/Orders
        [HttpGet]
        public List<Order> Get()
        {
            OrderUtility readOrder = new OrderUtility();
            return readOrder.ReadOrders();
        }

        // GET: api/Orders/5
        [HttpGet("{id}", Name = "GetOrder")]
        public string GetOrder(int id)
        {
            return "value";
        }

        // POST: api/Orders
        [HttpPost]
        public void Post([FromBody] Order value)
        {
            OrderUtility addOrder = new OrderUtility();
            addOrder.AddOrders(value);
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Order value)
        {
            OrderUtility editOrder = new OrderUtility();
            editOrder.EditOrders(value);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
