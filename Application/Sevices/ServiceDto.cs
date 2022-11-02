using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Sevices
{
    public class ServiceDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public int Mileage { get; set; }
        public string Actions { get; set; }
        public double Price { get; set; }
        public double Time { get; set; }
        public Guid CarId { get; set; }
        public string CarName { get; set; }
        public Guid ClientId { get; set; }
        public string ClientName { get; set; }
    }
}
