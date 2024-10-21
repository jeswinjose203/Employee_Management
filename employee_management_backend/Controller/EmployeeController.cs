using Microsoft.AspNetCore.Mvc;
using employee_management_backend.Data;

[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    // This method now accepts an employee code from the URL
    [HttpGet("{empCode}")]
    public string Get(int empCode)
    {
        //DataSeeder.SeedData();  // Seed the data first (if needed)

        var employee = DataSeeder.GetEmployeeByEmpCode(empCode);  // Get employee by employee code
        if (employee != null)
        {
            Console.WriteLine($"Employee Found: {employee.EmpName}, Location: {employee.Location}");
            return $"Employee Found: {employee.EmpName}, Location: {employee.Location}";
        }
        else
        {
            Console.WriteLine("Employee not found.");
            return "Employee not Found";
        }
    }
}
