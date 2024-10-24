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

            // Add services to the container
            builder.Services.AddControllers();

            // Configure CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    builder => builder.WithOrigins("http://localhost:3000")  // Allow requests from your React frontend
                                      .AllowAnyHeader()    // Allow any headers
                                      .AllowAnyMethod()    // Allow any HTTP method (GET, POST, etc.)
                                      .AllowCredentials());  // Allow sending credentials (like cookies)
            });

            var app = builder.Build();

            // Middleware pipeline configuration
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); // Show detailed error pages in development
            }

            app.UseHttpsRedirection(); // Ensure HTTPS redirection

            app.UseRouting(); // Enables routing

            // Apply CORS policy
            app.UseCors("AllowSpecificOrigins");

            app.UseAuthorization(); // Add authorization middleware

            // Map routes to controllers
            app.MapControllers(); // Map controller routes

            // Seed data
            DataSeeder.SeedData();

            // Fetch an employee for testing purposes (optional)
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
