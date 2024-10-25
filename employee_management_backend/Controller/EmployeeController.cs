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
    
    // Method to get billed members
    [HttpGet("billedmembers")] // This will map to /employee/billedmembers
    public ActionResult<List<Product>> GetBilledMembers()
    {
        var billedMembers = DataSeeder.GetBilledMembers(); // Use the new method to fetch billed members

        if (billedMembers.Count == 0)
        {
            return NotFound("No billed members found."); // Return 404 if no billed members are found
        }

        return Ok(billedMembers); // Return 200 OK with the list of billed members
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

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] Signup employee)
    {
        if (ModelState.IsValid)
        {
            try
            {
                // Check if the employee already exists by EmpCode
                if (DataSeeder.EmployeeExists(employee.EmpCode))
                {
                    Console.WriteLine($"Employee with EmpCode {employee.EmpCode} already exists.");
                    // Return success but notify that the employee already exists
                    return Ok(new { message = "Employee with this EmpCode already exists." });
                }

                // Add employee to the database if not exists
                await DataSeeder.AddEmployeeAsync(new Product
                {
                    EmpCode = employee.EmpCode,
                    EmpName = employee.EmpName,
                    Email = employee.Email,
                    Password = employee.Password,
                    Position = employee.Position,
                    Location = "Default Location", // If not provided, use defaults
                    ProfilePhoto = "default.jpg",
                    Skills = "Not specified",
                    MemberStatus = "Active",
                    MemberWorkingOn = "None",
                    ProjectDesc = "No project assigned"
                });

                Console.WriteLine($"Signup successful for {employee.EmpName}");
                return Ok(new { message = "Signup successful!" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during signup: {ex.Message}");
                return StatusCode(500, new { message = "Signup failed.", error = ex.Message });
            }
        }

        return BadRequest(new { message = "Invalid employee data provided." });
    }

    [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
{
    // Validate request
    if (loginRequest.EmpCode == 0 || string.IsNullOrEmpty(loginRequest.Password))
    {
        return BadRequest(new { message = "Employee Code and Password are required." });
    }

    // Check if the employee exists in the database
    var employee = DataSeeder.GetEmployeeByEmpCode(loginRequest.EmpCode);
    if (employee == null)
    {
        return Unauthorized(new { message = "Employee not found. Please sign up." });
    }

    // Check if the password is correct
    if (employee.Password == loginRequest.Password)
    {
        // Console.WriteLine(employee.Password);
        // Console.WriteLine(loginRequest.Password);
        // In a real application, you would return a token or session information
        return Ok(new { message = "Login successful", employeeId = loginRequest.EmpCode });
    }
    else
    {
        return Unauthorized(new { message = "Invalid credentials. Please try again." });
    }
}



}
