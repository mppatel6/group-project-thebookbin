using MySql.Data.MySqlClient;
using api.Models;

namespace api.Models
{
    public class OrderDetailsUtility
    {
        public List<OrderDetails> ReadOD(){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);

            con.Open();
            var odList = new List<OrderDetails>();
            string stm = "SELECT * from orderdetails";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            while(rdr.Read()){
                var odData = new OrderDetails{
                    OrderDetailID = rdr.GetInt32(0),
                    OrderID = rdr.GetInt32(1),
                    BookID = rdr.GetInt32(2)
                };
                odList.Add(odData);
            }

            con.Close();
            return odList;
        }

        public void EditOrderDetails(OrderDetails value){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"UPDATE orderdetails SET OrderDetailID = @OrderDetailID, OrderID = @OrderID, BookID = @BookID WHERE OrderDetails;";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("OrderDetailID", value.OrderDetailID);
            cmd.Parameters.AddWithValue("OrderID", value.OrderID);
            cmd.Parameters.AddWithValue("BookID", value.BookID);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }

        public void AddOrderDetails(OrderDetails value){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"INSERT INTO orderdetails(OrderID, BookID) VALUES(@OrderID, @BookID);";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("OrderID", value.OrderID);
            cmd.Parameters.AddWithValue("BookID", value.BookID);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}