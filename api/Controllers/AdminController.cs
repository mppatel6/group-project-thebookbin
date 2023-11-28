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
    public class AdminController : ControllerBase
    {
        // POST: api/TradeIn
        [HttpPost]
        public IActionResult PostTradeInBook([FromBody] Book book)
        {
            try {
                BookUtility bookUtility = new BookUtility();
                bookUtility.AddBook(book); 

                return Ok("Add book added successfully");
            }
            catch (Exception ex) {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }

    }
}