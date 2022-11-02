

namespace Domain
{
    public class Service
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public int Mileage { get; set; }
        public string Actions { get; set; }
        public double Price { get; set; }
        public double Time { get; set; } // in hours
        public Guid CarId { get; set; }
        public Car Car { get; set; }
    }
}
