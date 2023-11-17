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
    }
}