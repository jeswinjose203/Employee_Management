using System;
using System.Linq;
using System.Threading.Tasks;
using employee_management_backend.Data;
using employee_management_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace employee_management_backend.Data
{
    public static class Seeder
    {
        // Static method to check if an employee exists by EmpCode
        public static async Task<bool> EmployeeExists(int empCode)
        {
            using (var context = new AppDbContext())
            {
                return await context.Signups.AnyAsync(e => e.EmpCode == empCode);
            }
        }

        // Static method to add a new employee if they don't already exist
        public static async Task AddEmployeeAsync(Signup employee)
        {
            using (var context = new AppDbContext())
            {
                // Add the employee to the Signups table
                await context.Signups.AddAsync(employee);
                await context.SaveChangesAsync();
            }
        }


        public static Signup? GetEmployeeByEmpCode(int empCode)
        {
            using (var context = new AppDbContext())
            {
                var employee = context.Signups.FirstOrDefault(e => e.EmpCode == empCode);
                return employee;
            }
        }
    }
}
