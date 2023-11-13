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

        public void EditBook(Book value){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"UPDATE book SET BookID = @BookID, BookName = @BookName, BookAuthor = @BookAuthor, BookGenre = @BookGenre, BookDescription = @BookDescription, BookImage = @BookImage, NewQuantity = @NewQuantity, NewPrice = @NewPrice, GoodQuantity = @GoodQuantity, GoodPrice = @GoodPrice, PoorQuantity = @PoorQuantity, PoorPrice = @PoorPrice, AdminID = @AdminID;";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@BookID", value.ID);
            cmd.Parameters.AddWithValue("@BookName", value.ID);
            cmd.Parameters.AddWithValue("@BookAuthor", value.ID);
            cmd.Parameters.AddWithValue("@BookGenre", value.ID);
            cmd.Parameters.AddWithValue("@BookDescription", value.ID);
            cmd.Parameters.AddWithValue("@BookImage", value.ID);
            cmd.Parameters.AddWithValue("@NewQuantity", value.ID);
            cmd.Parameters.AddWithValue("@NewPrice", value.ID);
            cmd.Parameters.AddWithValue("@GoodQuantity", value.ID);
            cmd.Parameters.AddWithValue("@GoodPrice", value.ID);
            cmd.Parameters.AddWithValue("@PoorQuantity", value.ID);
            cmd.Parameters.AddWithValue("@PoorPrice", value.ID);
            cmd.Parameters.AddWithValue("@AdminID", value.ID);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }

        public void AddBook(Book value){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"INSERT INTO book(BookID, BookName, BookAuthor, BookGenre, BookDescription, BookImage, NewQuantity, NewPrice, GoodQuantity, GoodPrice, PoorQuantity, PoorPrice, AdminID) VALUES(@BookID, @BookName, @BookAuthor, @BookGenre, @BookDescription, @BookImage, @NewQuantity, @NewPrice, @GoodQuantity, @GoodPrice, @PoorQuantity, @PoorPrice, @AdminID);";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@BookID", value.ID);
            cmd.Parameters.AddWithValue("@BookName", value.ID);
            cmd.Parameters.AddWithValue("@BookAuthor", value.ID);
            cmd.Parameters.AddWithValue("@BookGenre", value.ID);
            cmd.Parameters.AddWithValue("@BookDescription", value.ID);
            cmd.Parameters.AddWithValue("@BookImage", value.ID);
            cmd.Parameters.AddWithValue("@NewQuantity", value.ID);
            cmd.Parameters.AddWithValue("@NewPrice", value.ID);
            cmd.Parameters.AddWithValue("@GoodQuantity", value.ID);
            cmd.Parameters.AddWithValue("@GoodPrice", value.ID);
            cmd.Parameters.AddWithValue("@PoorQuantity", value.ID);
            cmd.Parameters.AddWithValue("@PoorPrice", value.ID);
            cmd.Parameters.AddWithValue("@AdminID", value.ID);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }


    }
}