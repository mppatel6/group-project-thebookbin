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

            while(rdr.Read()) {
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

        public void AddBook(Book book)
{
    Database db = new Database();
    using var con = new MySqlConnection(db.cs);
    con.Open();

    string checkQuery = "SELECT * FROM book WHERE BookName = @BookName AND BookAuthor = @BookAuthor;";
    using var checkCmd = new MySqlCommand(checkQuery, con);
    checkCmd.Parameters.AddWithValue("@BookName", book.BookName);
    checkCmd.Parameters.AddWithValue("@BookAuthor", book.BookAuthor);

    using MySqlDataReader reader = checkCmd.ExecuteReader();

    if (reader.Read())
    {
        reader.Close();
        throw new Exception("Book with the same name and author already exists.");
    }
    else
    {
        reader.Close();
        AddBook(book, con);
    }

    con.Close();
}


        public void EditBook(Book value) {
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"UPDATE book SET BookID = @BookID, BookName = @BookName, BookAuthor = @BookAuthor, BookGenre = @BookGenre, BookDescription = @BookDescription, BookImage = @BookImage, NewQuantity = @NewQuantity, NewPrice = @NewPrice, GoodQuantity = @GoodQuantity, GoodPrice = @GoodPrice, PoorQuantity = @PoorQuantity, PoorPrice = @PoorPrice, AdminID = @AdminID WHERE BookID = @BookID;";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@BookID", value.BookID);
            cmd.Parameters.AddWithValue("@BookName", value.BookName);
            cmd.Parameters.AddWithValue("@BookAuthor", value.BookAuthor);
            cmd.Parameters.AddWithValue("@BookGenre", value.BookGenre);
            cmd.Parameters.AddWithValue("@BookDescription", value.BookDescription);
            cmd.Parameters.AddWithValue("@BookImage", value.BookImage);
            cmd.Parameters.AddWithValue("@NewQuantity", value.NewQuantity);
            cmd.Parameters.AddWithValue("@NewPrice", value.NewPrice);
            cmd.Parameters.AddWithValue("@GoodQuantity", value.GoodQuantity);
            cmd.Parameters.AddWithValue("@GoodPrice", value.GoodPrice);
            cmd.Parameters.AddWithValue("@PoorQuantity", value.PoorQuantity);
            cmd.Parameters.AddWithValue("@PoorPrice", value.PoorPrice);
            cmd.Parameters.AddWithValue("@AdminID", value.AdminID);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }


        private void UpdateQuantities(Book book, MySqlConnection con) {
    string updateQuery = @"UPDATE book 
                           SET NewQuantity = NewQuantity + @NewQuantity,
                               GoodQuantity = GoodQuantity + @GoodQuantity,
                               PoorQuantity = PoorQuantity + @PoorQuantity,
                               NewPrice = CASE WHEN @NewQuantity > 0 AND @NewPrice >= 0 THEN @NewPrice ELSE NewPrice END,
                               GoodPrice = CASE WHEN @GoodQuantity > 0 AND @GoodPrice >= 0 THEN @GoodPrice ELSE GoodPrice END,
                               PoorPrice = CASE WHEN @PoorQuantity > 0 AND @PoorPrice >= 0 THEN @PoorPrice ELSE PoorPrice END
                           WHERE BookName = @BookName AND BookAuthor = @BookAuthor;";

    using var cmd = new MySqlCommand(updateQuery, con);

    cmd.Parameters.AddWithValue("@NewQuantity", book.NewQuantity);
    cmd.Parameters.AddWithValue("@GoodQuantity", book.GoodQuantity);
    cmd.Parameters.AddWithValue("@PoorQuantity", book.PoorQuantity);
    cmd.Parameters.AddWithValue("@NewPrice", book.NewPrice >= 0 ? book.NewPrice : (object)DBNull.Value);
    cmd.Parameters.AddWithValue("@GoodPrice", book.GoodPrice >= 0 ? book.GoodPrice : (object)DBNull.Value);
    cmd.Parameters.AddWithValue("@PoorPrice", book.PoorPrice >= 0 ? book.PoorPrice : (object)DBNull.Value);
    cmd.Parameters.AddWithValue("@BookName", book.BookName);
    cmd.Parameters.AddWithValue("@BookAuthor", book.BookAuthor);

    cmd.ExecuteNonQuery();
}


        private void AddBook(Book book, MySqlConnection con) {
            string insertQuery = @"INSERT INTO book (BookName, BookAuthor, BookGenre, BookDescription, BookImage, NewQuantity, NewPrice, GoodQuantity, GoodPrice, PoorQuantity, PoorPrice, AdminID) VALUES(@BookName, @BookAuthor, @BookGenre, @BookDescription, @BookImage, @NewQuantity, @NewPrice, @GoodQuantity, @GoodPrice, @PoorQuantity, @PoorPrice, @AdminID);";
            using var cmd = new MySqlCommand(insertQuery, con);

            cmd.Parameters.AddWithValue("@BookName", book.BookName);
            cmd.Parameters.AddWithValue("@BookAuthor", book.BookAuthor);
            cmd.Parameters.AddWithValue("@BookGenre", book.BookGenre);
            cmd.Parameters.AddWithValue("@BookDescription", book.BookDescription);
            cmd.Parameters.AddWithValue("@BookImage", book.BookImage);
            cmd.Parameters.AddWithValue("@NewQuantity", book.NewQuantity);
            cmd.Parameters.AddWithValue("@NewPrice", book.NewPrice);
            cmd.Parameters.AddWithValue("@GoodQuantity", book.GoodQuantity);
            cmd.Parameters.AddWithValue("@GoodPrice", book.GoodPrice);
            cmd.Parameters.AddWithValue("@PoorQuantity", book.PoorQuantity);
            cmd.Parameters.AddWithValue("@PoorPrice", book.PoorPrice);
            cmd.Parameters.AddWithValue("@AdminID", book.AdminID);

            cmd.ExecuteNonQuery();
        }

        public void DeleteBook(int bookID)
{
    Database db = new Database();
    using var con = new MySqlConnection(db.cs);
    con.Open();

    string deleteQuery = "DELETE FROM book WHERE BookID = @BookID;";
    using var cmd = new MySqlCommand(deleteQuery, con);
    cmd.Parameters.AddWithValue("@BookID", bookID);

    cmd.ExecuteNonQuery();
}


        public Book GetBook(int id){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = "SELECT * FROM book WHERE BookID = @BookID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@BookID", id);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();

            return new Book(){
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
        }
    }
}