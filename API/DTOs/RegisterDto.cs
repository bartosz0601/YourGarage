using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        //Hasło musi mieć jedną liczbe, mieć jedną litere a-z, jedną A-Z oraz mieć długość w zakresie 4-8
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        
        [Required]
        public string UserName { get; set; }
    }
}
