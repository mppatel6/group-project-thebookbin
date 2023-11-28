using MySql.Data.MySqlClient;
using api.Models;

namespace api.Models
{
    public class CustomerUtility
    {
        public List<Customer> ReadCustomers(){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);

            con.Open();
            var custList = new List<Customer>();
            string stm = "SELECT * from customer";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            while(rdr.Read()){
                var custData = new Customer{
                    CID = rdr.GetInt32(0),
                    CustomerEmail = rdr.GetString(1),
                    CustomerPassword = rdr.GetString(2),
                    CustomerTokenAmount = rdr.GetInt32(3)
                }; 
                custList.Add(custData);
            }
            
            con.Close();
            return custList;
        }

        public void EditCustomers(Customer value){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"UPDATE customer SET CID = @CID, CustomerEmail = @CustomerEmail, CustomerPassword = @CustomerPassword, CustomerTokenAmount = @CustomerTokenAmount WHERE CID = @CID;";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@CID", value.CID);
            cmd.Parameters.AddWithValue("@CustomerEmail", value.CustomerEmail);
            cmd.Parameters.AddWithValue("@CustomerPassword", value.CustomerPassword);
            cmd.Parameters.AddWithValue("@CustomerTokenAmount", value.CustomerTokenAmount);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }

        public void AddCustomers(Customer value){
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"INSERT INTO customer(CustomerEmail, CustomerPassword, CustomerTokenAmount) VALUES(@CustomerEmail, @CustomerPassword, @CustomerTokenAmount);";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@CustomerEmail", value.CustomerEmail);
            cmd.Parameters.AddWithValue("@CustomerPassword", value.CustomerPassword);
            cmd.Parameters.AddWithValue("@CustomerTokenAmount", value.CustomerTokenAmount);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}