using Microsoft.AspNetCore.Mvc;
using employee_management_backend.Data;
using employee_management_backend.Models;
using employee_management_backend.Helpers;
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

        // Method to get unbilled members
    [HttpGet("unbilledmembers")] // This will map to /employee/billedmembers
    public ActionResult<List<Product>> GetUnBilledMembers()
    {
        var UnbilledMembers = DataSeeder.GetUnBilledMembers(); // Use the new method to fetch billed members

        if (UnbilledMembers.Count == 0)
        {
            return NotFound("No Unbilled members found."); // Return 404 if no billed members are found
        }

        return Ok(UnbilledMembers); // Return 200 OK with the list of billed members
    }

    // Method to get billed members
    [HttpGet("bench")] // This will map to /employee/billedmembers
    public ActionResult<List<Product>> GetBenchMembers()
    {
        var UnbilledMembers = DataSeeder.GetBenchMembers(); // Use the new method to fetch billed members

        if (UnbilledMembers.Count == 0)
        {
            return NotFound("No Unbilled members found."); // Return 404 if no billed members are found
        }

        return Ok(UnbilledMembers); // Return 200 OK with the list of billed members
    }

    // Method to get billed members
    [HttpGet("unbench")] // This will map to /employee/billedmembers
    public ActionResult<List<Product>> GetUnBenchMembers()
    {
        var UnbilledMembers = DataSeeder.GetUnBenchMembers(); // Use the new method to fetch billed members

        if (UnbilledMembers.Count == 0)
        {
            return NotFound("No Unbilled members found."); // Return 404 if no billed members are found
        }

        return Ok(UnbilledMembers); // Return 200 OK with the list of billed members
    }

    // Method to get billed members
    [HttpGet("shadow")] // This will map to /employee/billedmembers
    public ActionResult<List<Product>> GetShadowMembers()
    {
        var UnbilledMembers = DataSeeder.GetShadowMembers(); // Use the new method to fetch billed members

        if (UnbilledMembers.Count == 0)
        {
            return NotFound("No Unbilled members found."); // Return 404 if no billed members are found
        }

        return Ok(UnbilledMembers); // Return 200 OK with the list of billed members
    }

    // Method to get billed members
    [HttpGet("partiallybillable")] // This will map to /employee/billedmembers
    public ActionResult<List<Product>> GetPartiallyBillableMembers()
    {
        var UnbilledMembers = DataSeeder.GetPartiallyBillableMembers(); // Use the new method to fetch billed members

        if (UnbilledMembers.Count == 0)
        {
            return NotFound("No Unbilled members found."); // Return 404 if no billed members are found
        }

        return Ok(UnbilledMembers); // Return 200 OK with the list of billed members
    }



    [HttpGet("projectbuffer")] // This will map to /employee/billedmembers
    public ActionResult<List<Product>> GetProjectBufferMembers()
    {
        var UnbilledMembers = DataSeeder.GetProjectBufferMembers(); // Use the new method to fetch billed members

        if (UnbilledMembers.Count == 0)
        {
            return NotFound("No Unbilled members found."); // Return 404 if no billed members are found
        }

        return Ok(UnbilledMembers); // Return 200 OK with the list of billed members
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
    var allowedPositions = new List<string> { "Project Manager", "General Manager", "Other Managers" };

    if (ModelState.IsValid)
    {
        if (!allowedPositions.Contains(employee.Position))
        {
            return BadRequest(new { message = "Invalid position. Only Project Manager, General Manager, and Other Managers are allowed." });
        }

        try
        {
            if (await Seeder.EmployeeExists(employee.EmpCode))
            {
                Console.WriteLine($"Employee with EmpCode {employee.EmpCode} already exists.");
                return Ok(new { message = "Employee with this EmpCode already exists." });
            }

            // Hash the password before storing it
            string hashedPassword = PasswordHelper.HashPassword(employee.Password);

            // Add employee to the database with the hashed password
            await Seeder.AddEmployeeAsync(new Signup
            {
                EmpCode = employee.EmpCode,
                EmpName = employee.EmpName,
                Email = employee.Email,
                Password = hashedPassword, // Store hashed password
                Position = employee.Position,
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

    
    // [HttpPost("signup")]
    // public async Task<IActionResult> Signup([FromBody] Signup employee)
    // {
    //     if (ModelState.IsValid)
    //     {
    //         try
    //         {
    //             // Check if the employee already exists by EmpCode
    //             if (DataSeeder.EmployeeExists(employee.EmpCode))
    //             {
    //                 Console.WriteLine($"Employee with EmpCode {employee.EmpCode} already exists.");
    //                 // Return success but notify that the employee already exists
    //                 return Ok(new { message = "Employee with this EmpCode already exists." });
    //             }

    //             // Add employee to the database if not exists
    //             await DataSeeder.AddEmployeeAsync(new Product
    //             {
    //                 EmpCode = employee.EmpCode,
    //                 EmpName = employee.EmpName,
    //                 Email = employee.Email,
    //                 Password = employee.Password,
    //                 Position = employee.Position,
    //                 Location = "Default Location", // If not provided, use defaults
    //                 ProfilePhoto = "default.jpg",
    //                 Skills = "Not specified",
    //                 ResourceStatus = "Active",
    //                 MemberWorkingOn = "None",
    //                 ProjectDesc = "No project assigned",
    //                 ReportingOfficer = "asd",
    //                     TotalExperience = "3",
    //                     Allocation = "sdf",
    //                     PrimarySkill = "234",
    //                     Comments = "afd",
    //                     FreeFromDate = "ds"
    //             });

    //             Console.WriteLine($"Signup successful for {employee.EmpName}");
    //             return Ok(new { message = "Signup successful!" });
    //         }
    //         catch (Exception ex)
    //         {
    //             Console.WriteLine($"Error during signup: {ex.Message}");
    //             return StatusCode(500, new { message = "Signup failed.", error = ex.Message });
    //         }
    //     }

    //     return BadRequest(new { message = "Invalid employee data provided." });
    // }
[HttpGet("checkEmpCode/{empCode}")]
public IActionResult CheckEmpCode(int empCode)
{
    // Retrieve the employee by EmpCode
    var employee = DataSeeder.GetEmployeeByEmpCode(empCode);
    
    // If employee exists, return employee data
    if (employee != null)
    {
        return Ok(new
        {
            exists = true,
            employeeData = new
            {
                employee.EmpCode,
                employee.EmpName,
                // employee.Email,
                employee.Position,
                employee.Location,
                employee.Skills,
                employee.ResourceStatus,
                employee.MemberWorkingOn,
                employee.ProjectDesc,
                employee.ReportingOfficer,
                employee.TotalExperience,
                employee.Allocation,
                employee.PrimarySkill,
                employee.Comments,
                employee.FreeFromDate
            }
        });
    }

    // If employee does not exist, return exists as false
    return Ok(new { exists = false });
}

[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
{
    if (loginRequest.EmpCode == 0 || string.IsNullOrEmpty(loginRequest.Password))
    {
        return BadRequest(new { message = "Employee Code and Password are required." });
    }

    var employee = Seeder.GetEmployeeByEmpCode(loginRequest.EmpCode);
    if (employee == null)
    {
        return Unauthorized(new { message = "Employee not found. Please sign up." });
    }

    // Hash the incoming password and compare it
    string hashedPassword = PasswordHelper.HashPassword(loginRequest.Password);
    if (employee.Password == hashedPassword)
    {
        return Ok(new { message = "Login successful", employeeId = loginRequest.EmpCode });
    }
    else
    {
        return Unauthorized(new { message = "Invalid credentials. Please try again." });
    }
}


//updating already existing data 

 [HttpPost("Profiledata")]
public async Task<IActionResult> Profiledata([FromBody] ProfileDataRequest profileDataRequest)
{
    if (ModelState.IsValid)
    {
        try
        {
            // Check if an employee with the provided EmpCode already exists
            var existingEmployee = DataSeeder.GetEmployeeByEmpCode(profileDataRequest.empCode);
            
            if (existingEmployee == null)
            {
                // If employee with EmpCode does not exist, return a Not Found response
                return NotFound(new { message = "Employee not found." });
            }

            // Update the existing employee's information
            existingEmployee.EmpName = profileDataRequest.name;
            existingEmployee.ResourceStatus = profileDataRequest.memberStatus;
            existingEmployee.Position = profileDataRequest.position;
            existingEmployee.Location = profileDataRequest.location;
            existingEmployee.Skills = string.Join(", ", profileDataRequest.skills); // Converting list to string
            existingEmployee.ReportingOfficer = profileDataRequest.reportingOfficer;
            existingEmployee.TotalExperience = profileDataRequest.totalExperience;
            existingEmployee.Allocation = profileDataRequest.allocation;
            existingEmployee.PrimarySkill = profileDataRequest.primarySkill;
            existingEmployee.Comments = profileDataRequest.comments;
            existingEmployee.FreeFromDate = profileDataRequest.freeFromDate;

            // Save changes (assuming DataSeeder has an UpdateEmployeeAsync method)
            await DataSeeder.UpdateEmployeeAsync(existingEmployee);

            Console.WriteLine($"Profile data updated for {profileDataRequest.name}");
            return Ok(new { message = "Profile data updated successfully!" });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating profile data: {ex.Message}");
            return StatusCode(500, new { message = "Failed to update profile data.", error = ex.Message });
        }
    }

    return BadRequest(new { message = "Invalid profile data provided." });
}



}
