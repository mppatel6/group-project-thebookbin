using DotNetEnv;

namespace api
{
    public class Database
    {
        public string cs{get; set;}

        public Database()
        {
            DotNetEnv.Env.Load();

            var Host = Environment.GetEnvironmentVariable("DB_HOST");
            var DatabaseName = Environment.GetEnvironmentVariable("DB_DATABASE");
            var Username = Environment.GetEnvironmentVariable("DB_USERNAME");
            var Port = Environment.GetEnvironmentVariable("DB_PORT");
            var Password = Environment.GetEnvironmentVariable("DB_PASSWORD");

            cs = $"server={Host};user={Username};database={DatabaseName};port={Port};password={Password}";
        }
    }
}