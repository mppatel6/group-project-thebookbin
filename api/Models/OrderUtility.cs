using MySql.Data.MySqlClient;
using api.Models;

namespace api.Models
{
    public class OrderUtility
    {
        public List<Order> ReadOrders(){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);

            con.Open();
            var oList = new List<Order>();
            string stm = "SELECT * from orders";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            while(rdr.Read()){
                var oData = new Order{
                    OrderID = rdr.GetInt32(0),
                    PurchaseQty = rdr.GetInt32(1),
                    BookID = rdr.GetInt32(2),
                    CID = rdr.GetInt32(3),
                    CustomerEmail = rdr.GetString(4),
                    CustomerFName = rdr.GetString(5),
                    CustomerLName = rdr.GetString(6),
                    CustomerAddress = rdr.GetString(7),
                    Country = rdr.GetString(8),
                    State = rdr.GetString(9),
                    Zipcode = rdr.GetString(10)
                };
                oList.Add(oData);
            }

            con.Close();
            return oList;
        }

        public void EditOrders(Order value){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"UPDATE orders SET OrderID = @OrderID, PurchaseQty = @PurchaseQty, BookID = @BookID, CID = @CID, CustomerEmail = @CustomerEmail, CustomerFName = @CustomerFName, CustomerLName = @CustomerLName, CustomerAddress = @CustomerAddress, Country = @Country, State = @State, Zipcode = @Zipcode WHERE OrderID = @OrderID;";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@OrderID", value.OrderID);
            cmd.Parameters.AddWithValue("PurchaseQty", value.PurchaseQty);
            cmd.Parameters.AddWithValue("BookID", value.BookID);
            cmd.Parameters.AddWithValue("@CID", value.CID);
            cmd.Parameters.AddWithValue("@CustomerEmail", value.CustomerEmail);
            cmd.Parameters.AddWithValue("@CustomerFName", value.CustomerFName);
            cmd.Parameters.AddWithValue("@CustomerLName", value.CustomerLName);
            cmd.Parameters.AddWithValue("@CustomerAddress", value.CustomerAddress);
            cmd.Parameters.AddWithValue("@Country", value.Country);
            cmd.Parameters.AddWithValue("@State", value.State);
            cmd.Parameters.AddWithValue("@Zipcode", value.Zipcode);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }

        public void AddOrders(Order value){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"INSERT INTO orders(OrderID, PurchaseQty, BookID, CID, CustomerEmail, CustomerFName, CustomerLName, CustomerAddress, Country, State, Zipcode) VALUES(@OrderID, @PurchaseQty, @BookID, @CID, @CustomerEmail, @CustomerFName, @CustomerLName, @CustomerAddress, @Country, @State, @Zipcode);";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@OrderID", value.OrderID);
            cmd.Parameters.AddWithValue("PurchaseQty", value.PurchaseQty);
            cmd.Parameters.AddWithValue("BookID", value.BookID);
            cmd.Parameters.AddWithValue("@CID", value.CID);
            cmd.Parameters.AddWithValue("@CustomerEmail", value.CustomerEmail);
            cmd.Parameters.AddWithValue("@CustomerFName", value.CustomerFName);
            cmd.Parameters.AddWithValue("@CustomerLName", value.CustomerLName);
            cmd.Parameters.AddWithValue("@CustomerAddress", value.CustomerAddress);
            cmd.Parameters.AddWithValue("@Country", value.Country);
            cmd.Parameters.AddWithValue("@State", value.State);
            cmd.Parameters.AddWithValue("@Zipcode", value.Zipcode);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}