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
    public class BookController : ControllerBase
    {
        // GET: api/Book
        [HttpGet]
        public List<Book> Get()
        {
            BookUtility readObject = new BookUtility();
            return readObject.ReadBooks();
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Book
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Book/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
