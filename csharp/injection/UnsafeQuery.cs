using System.Data.SqlClient;

namespace DiffTest.Injection
{
    public class UnsafeUserRepository
    {
        public SqlCommand SearchUsers(string term)
        {
            return new SqlCommand($"SELECT Id, Name FROM Users WHERE Name LIKE '%{term}%'");
        }
    }
}
