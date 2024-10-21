using System;
using employee_management_backend.Data;

namespace employee_management_backend
{
    class Program
    {
        static void Main(string[] args)
        {
            DataSeeder.SeedData();
            Console.WriteLine("Data seeding complete.");
        }
    }
}
