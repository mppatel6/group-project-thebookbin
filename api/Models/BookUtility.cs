using MySql.Data.MySqlClient;
using api.Models;

namespace api.Models
{
    public class BookUtility
    {
        public List<Book> ReadBooks(){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);

            con.Open();
            var bookList = new List<Book>();
            string stm = "SELECT * from book;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            while(rdr.Read()){
                var bookData = new Book{
                    BookID = rdr.GetInt32(0),
                    BookName = rdr.GetString(1),
                    BookAuthor = rdr.GetString(2),
                    BookGenre = rdr.GetString(3),
                    BookDescription = rdr.GetString(4),
                    BookImage = rdr.GetString(5),
                    NewQuantity = rdr.GetInt32(6),
                    NewPrice = rdr.GetInt32(7),
                    GoodQuantity = rdr.GetInt32(8),
                    GoodPrice = rdr.GetInt32(9),
                    PoorQuantity = rdr.GetInt32(10),
                    PoorPrice = rdr.GetInt32(11),
                    AdminID = rdr.GetInt32(12)
                };
                bookList.Add(bookData);
            }
            con.Close();
            return bookList;
        }
    }
}