

using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Service
    {
        public Guid Id { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int Mileage { get; set; }
        [Required]
        public string Actions { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public double Time { get; set; } // in hours
        public Guid CarId { get; set; }
        public Car Car { get; set; }
    }
}
