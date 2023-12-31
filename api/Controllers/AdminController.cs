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
        // POST: api/Admin/AddBook
        [HttpPost("AddBook")]
        public IActionResult PostBook([FromBody] Book book)
        {
            try
            {
                BookUtility bookUtility = new BookUtility();
                bookUtility.AddBook(book);
 
                return Ok("New book added successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception Message: " + ex.Message);
 
                if (ex.Message.Contains("Book with the same name and author already exists."))
                {
                    return BadRequest("Book with the same name and author already exists.");
                }
                else
                {
                    return StatusCode(500, "Internal Server Error: " + ex.Message);
                }
            }
        }
 
        [HttpGet("Price")]
        public IActionResult GetPriceByQuality(int bookID, string quality)
        {
            try
            {
                var bookUtility = new BookUtility();
                var price = bookUtility.GetPriceByQuality(bookID, quality);
                return Ok(new { price });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
 
                [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            try
            {
                var bookUtility = new BookUtility();
                bookUtility.DeleteBook(bookID);
                return Ok($"Book with ID {bookID} deleted successfully.");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }
 
 
        [HttpPut("UpdateBookDetails/{bookID}")]
                public IActionResult UpdateBookDetails(int bookID, [FromBody] Book book)
                {
                    try
                    {
                        var bookUtility = new BookUtility();
                        bookUtility.UpdateBookDetails(bookID, book);
                        return Ok($"Book with ID {bookID} updated successfully.");
                    }
                    catch (Exception ex)
                    {
                        // Log the exception
                        return StatusCode(500, "Internal server error: " + ex.Message);
                    }
                }
 
                // GET: api/Admin/Book/{bookID}
        [HttpGet("Book/{bookID}")]
            public IActionResult GetBookById(int bookID)
            {
            try
            {
                 var bookUtility = new BookUtility();
                var book = bookUtility.GetBook(bookID);
                return Ok(book);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
      }
    }