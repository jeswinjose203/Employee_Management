using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using employee_management_backend.Data;
namespace employee_management_backend
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container if needed, like a database context or dependency injections
            builder.Services.AddControllers(); // If you want to use controllers

            var app = builder.Build();

            // Middleware pipeline configuration
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); // For development environment, show detailed error pages
            }

            app.UseHttpsRedirection(); // Ensure HTTPS redirection

            app.UseRouting(); // Enables routing

            app.UseAuthorization(); // Add authorization middleware

            // Map routes to controllers
            app.MapControllers(); // If you have controller endpoints
            DataSeeder.SeedData();
            var employee = DataSeeder.GetEmployeeByEmpCode(1);
            if (employee != null)
            {
                Console.WriteLine($"Employee Found: {employee.EmpName}, Location: {employee.Location}");
            }
            else
            {
                Console.WriteLine("Employee not found.");
            }
            // Run the app
            app.Run();
        }
    }
}


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
