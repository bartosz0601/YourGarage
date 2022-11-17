
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Car
    {
        public Guid Id { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public string Vin { get; set; }
        public Guid ClientId { get; set;}
        public Client Client { get; set;}
        public ICollection<Service> Services { get; set;}
    }
}
