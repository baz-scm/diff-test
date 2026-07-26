using System;
using System.Text.RegularExpressions;

namespace DiffTest.Injection
{
    public static class SortColumnValidator
    {
        public static string Sanitize(string value)
        {
            if (!Regex.IsMatch(value, "^[A-Za-z0-9_]+$"))
            {
                throw new ArgumentException("invalid sort column");
            }

            return value;
        }
    }
}
