using Microsoft.EntityFrameworkCore;
using employee_management_backend.Models;

namespace employee_management_backend.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(@"Server=localhost;Database=new_schema;User=root;Password=Jenbros@23;",
    new MySqlServerVersion(new Version(8, 0, 21)));
        }
         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasKey(p => p.EmpCode);  // Set EmpCode as the primary key

            base.OnModelCreating(modelBuilder);
        }
    }
}
