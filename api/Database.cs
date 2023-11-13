namespace api
{
    public class Database
    {
        private string host{get; set;}
        private string database{get; set;}
        private string username{get; set;}
        private string port{get; set;}
        private string password{get; set;}
        public string cs{get; set;}

        public Database(){
            host = "dfkpczjgmpvkugnb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            database = "aovklha05u21jv78";
            username= "xoax93ec0p6qflzx";
            port="3306";
            password="n1xb0wqzjjcjwqew";
            cs = $"server={host};user={username};database={database};port={port};password={password}";
        }
    }
}