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
// Get an employee by EmpCode            
// var employee = DataSeeder.GetEmployeeByEmpCode(1);
// if (employee != null)
// {
//     Console.WriteLine($"Employee Found: {employee.EmpName}, Location: {employee.Location}");
// }
// else
// {
//     Console.WriteLine("Employee not found.");
// }




// Get all employees
// var employees = DataSeeder.GetAllEmployees();
// foreach (var emp in employees)
// {
//     Console.WriteLine($"EmpCode: {emp.EmpCode}, Name: {emp.EmpName}, Location: {emp.Location}");
// }


// Check if an employee exists by EmpCode
// bool exists = DataSeeder.EmployeeExists(1);
// Console.WriteLine(exists ? "Employee exists." : "Employee does not exist.");

        }
    }
}
