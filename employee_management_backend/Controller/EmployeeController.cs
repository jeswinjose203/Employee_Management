using Microsoft.AspNetCore.Mvc;
using employee_management_backend.Data;
using employee_management_backend.Models;

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


    // New method to get all employees
    [HttpGet]
    [Route("all")] // This will map to /employee/all
    public ActionResult<List<Product>> GetAllEmployees()
    {
        var employees = DataSeeder.GetAllEmployees();  // Fetch all employees

        if (employees.Count == 0)
        {
            return NotFound("No employees found.");  // Return 404 if no employees are found
        }

        return Ok(employees);  // Return 200 OK with the list of employees
    }
}
