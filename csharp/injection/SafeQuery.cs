using System.Data.SqlClient;

namespace DiffTest.Injection
{
    public class SafeUserRepository
    {
        public SqlCommand ListUsersSorted(string rawSort)
        {
            var sortColumn = SortColumnValidator.Sanitize(rawSort);
            return new SqlCommand($"SELECT Id, Name FROM Users ORDER BY {sortColumn}");
        }
    }
}
