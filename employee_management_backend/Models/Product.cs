namespace employee_management_backend.Models
{
    public class Product
    {
        public required int EmpCode { get; set; }  // Primary key
        public required string EmpName { get; set; }
        public required string Location { get; set; }
        public  string ProfilePhoto { get; set; }
        public required string Skills { get; set; }
        public required string ResourceStatus { get; set; }
        public required string MemberWorkingOn { get; set; }
        public required string ProjectDesc { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public required string Position { get; set; }

        public required string ReportingOfficer { get; set; }
        public required string TotalExperience { get; set; }
        public required string Allocation { get; set; }
        public required string PrimarySkill { get; set; }
        public required string Comments { get; set; }
        public required string FreeFromDate { get; set; }
    }

    public class Signup
    {
        public required int EmpCode { get; set; }  // Primary key
        public required string EmpName { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public required string Position { get; set; }
    }
public class ProfileDataRequest
{
    public int empCode { get; set; }
    public string name { get; set; }
    public string location { get; set; }
    public string position { get; set; }
    public string memberStatus { get; set; }
    public List<string> skills { get; set; } // Adjusted to a list to handle multiple skills
    public string reportingOfficer { get; set; }
    public string totalExperience { get; set; }
    public string allocation { get; set; }
    public string primarySkill { get; set; }
    public string comments { get; set; }
    public string freeFromDate { get; set; }
}

     public class LoginRequest
    {
        public required int EmpCode { get; set; }  // Primary key
        public required string Password { get; set; }
    }

}
