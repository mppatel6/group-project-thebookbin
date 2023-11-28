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
                    CID = rdr.IsDBNull(1) ? (int?)null : rdr.GetInt32(1),
                    CustomerEmail = rdr.GetString(2),
                    CustomerFName = rdr.GetString(3),
                    CustomerLName = rdr.GetString(4),
                    CustomerAddress = rdr.GetString(5),
                    Country = rdr.GetString(6),
                    State = rdr.GetString(7),
                    Zipcode = rdr.GetString(8)
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

            string stm = @"UPDATE orders SET OrderID = @OrderID, CID = @CID, CustomerEmail = @CustomerEmail, CustomerFName = @CustomerFName, CustomerLName = @CustomerLName, CustomerAddress = @CustomerAddress, Country = @Country, State = @State, Zipcode = @Zipcode WHERE OrderID = @OrderID;";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@OrderID", value.OrderID);
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

            string stm = @"INSERT INTO orders(CID, CustomerEmail, CustomerFName, CustomerLName, CustomerAddress, Country, State, Zipcode) VALUES(@CID, @CustomerEmail, @CustomerFName, @CustomerLName, @CustomerAddress, @Country, @State, @Zipcode);";
            using var cmd = new MySqlCommand(stm, con);

            // Handle CID as DBNull.Value if it's null
            var temp = !string.IsNullOrEmpty(Convert.ToString(value.CID)) ? value.CID : (object)DBNull.Value;
            cmd.Parameters.AddWithValue("@CID", temp);

            // Add other parameters as usual
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