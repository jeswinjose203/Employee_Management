using System;
using System.Linq;
using employee_management_backend.Models;

namespace employee_management_backend.Data
{
    public class DataSeeder
    {
        public static void SeedData()
        {
            using (var context = new AppDbContext())
            {
                // Check if the table is empty
                if (!context.Products.Any())
                {
                    var product = new Product
                    {
                        EmpCode = 1,  // Set a unique EmpCode (Primary Key)
                        EmpName = "John Doe",  // Set employee name
                        Location = "New York",  // Set employee location
                        ProfilePhoto = "path/to/photo.jpg",  // Set path to profile photo
                        Skills = "C#, .NET, SQL",  // Set employee skills
                        MemberStatus = "Active",  // Set member status
                        MemberWorkingOn = "Project A",  // Set current project
                        ProjectDesc = "This project involves developing a web application.",  // Set project description
                        Password = "SecurePassword123",  // Set password
                        Email = "john.doe@example.com", // Set email
                        Position = "asfsd"
                    };

                    // Add the product to the context and save changes
                    context.Products.Add(product);
                    context.SaveChanges();
                    Console.WriteLine("Product added successfully!");
                }
                else
                {
                    Console.WriteLine("Table already has data.");
                }
            }
        }


        // 1. Function to get an employee by EmpCode
        public static Product? GetEmployeeByEmpCode(int empCode)
        {
            using (var context = new AppDbContext())
            {
                var employee = context.Products.FirstOrDefault(p => p.EmpCode == empCode);
                return employee;
            }
        }

        // 2. Function to get all employees
        public static List<Product> GetAllEmployees()
        {
            using (var context = new AppDbContext())
            {
                var employees = context.Products.ToList();
                return employees;
            }
        }

        // 3. Function to check if an employee exists by EmpCode
        public static bool EmployeeExists(int empCode)
        {
            using (var context = new AppDbContext())
            {
                return context.Products.Any(p => p.EmpCode == empCode);
            }
        }

        //4. Function to delete a particular employee using EmpCode
         public static bool DeleteEmployeeByEmpCode(int empCode)
        {
            using (var context = new AppDbContext())
            {
                var employee = context.Products.FirstOrDefault(p => p.EmpCode == empCode);

                if (employee != null)
                {
                    context.Products.Remove(employee);  // Remove the employee from the context
                    context.SaveChanges();  // Save changes to persist the removal
                    Console.WriteLine($"Employee with EmpCode {empCode} deleted successfully.");
                    return true;  // Return true to indicate the employee was deleted
                }
                else
                {
                    Console.WriteLine($"Employee with EmpCode {empCode} not found.");
                    return false;  // Return false to indicate no employee was found
                }
            }
        }


        //5.to  add an employee to database
        public static async Task AddEmployeeAsync(Product employee)
        {
            using (var context = new AppDbContext())
            {
                // Check if the employee already exists (optional but recommended)
                if (!EmployeeExists(employee.EmpCode))
                {
                    context.Products.Add(employee);  // Add the new employee to the context
                    await context.SaveChangesAsync();  // Save changes asynchronously
                    Console.WriteLine($"Employee {employee.EmpName} added successfully!");
                }
                else
                {
                    Console.WriteLine($"Employee with EmpCode {employee.EmpCode} already exists.");
                }
            }
        }


        //6. New function to get all billed members
        public static List<Product> GetBilledMembers()
        {
            using (var context = new AppDbContext())
            {
                var billedMembers = context.Products
                                           .Where(emp => emp.MemberStatus == "Billed Member") // Filter by MemberStatus
                                           .ToList(); // Convert to list

                return billedMembers; // Return the list of billed members
            }
        }

        //7. New function to get all Unbilled
        public static List<Product> GetUnBilledMembers()
        {
            using (var context = new AppDbContext())
            {
                var billedMembers = context.Products
                                           .Where(emp => emp.MemberStatus == "Unbilled") // Filter by MemberStatus
                                           .ToList(); // Convert to list

                return billedMembers; // Return the list of billed members
            }
        }


        //8. New function to get all Bench
        public static List<Product> GetBenchMembers()
        {
            using (var context = new AppDbContext())
            {
                var billedMembers = context.Products
                                           .Where(emp => emp.MemberStatus == "Bench") // Filter by MemberStatus
                                           .ToList(); // Convert to list

                return billedMembers; // Return the list of billed members
            }
        }

        //8. New function to get all Unbenched
        public static List<Product> GetUnBenchMembers()
        {
            using (var context = new AppDbContext())
            {
                var billedMembers = context.Products
                                           .Where(emp => emp.MemberStatus == "Unbenched") // Filter by MemberStatus
                                           .ToList(); // Convert to list

                return billedMembers; // Return the list of billed members
            }
        }

        //8. New function to get all Shadow 
        public static List<Product> GetShadowMembers()
        {
            using (var context = new AppDbContext())
            {
                var billedMembers = context.Products
                                           .Where(emp => emp.MemberStatus == "Shadow") // Filter by MemberStatus
                                           .ToList(); // Convert to list

                return billedMembers; // Return the list of billed members
            }
        }


        //8. New function to get all Partially Billable 
        public static List<Product> GetPartiallyBillableMembers()
        {
            using (var context = new AppDbContext())
            {
                var billedMembers = context.Products
                                           .Where(emp => emp.MemberStatus == "Partially Billable") // Filter by MemberStatus
                                           .ToList(); // Convert to list

                return billedMembers; // Return the list of billed members
            }
        }


        //8. New function to get all Project Buffer
        public static List<Product> GetProjectBufferMembers()
        {
            using (var context = new AppDbContext())
            {
                var billedMembers = context.Products
                                           .Where(emp => emp.MemberStatus == "Project Buffer") // Filter by MemberStatus
                                           .ToList(); // Convert to list

                return billedMembers; // Return the list of billed members
            }
        }
    }
}
