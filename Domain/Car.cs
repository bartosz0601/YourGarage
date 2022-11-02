
namespace Domain
{
    public class Car
    {
        public Guid Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public string Vin { get; set; }
        public Guid ClientId { get; set;}
        public Client Client { get; set;}
        public ICollection<Service> Services { get; set;}
    }
}
