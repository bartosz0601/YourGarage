
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Client
    {
        public Guid Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        public string Details { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public ICollection<Car> Cars { get; set; }
    }
}
