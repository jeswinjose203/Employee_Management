namespace employee_management_backend.Models
{
    public class Product
    {
        public required int EmpCode { get; set; }  // Primary key
        public required string EmpName { get; set; }
        public required string Location { get; set; }
        public required string ProfilePhoto { get; set; }
        public required string Skills { get; set; }
        public required string MemberStatus { get; set; }
        public required string MemberWorkingOn { get; set; }
        public required string ProjectDesc { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
    }
}
