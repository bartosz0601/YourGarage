using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Clients.Any())
            {
                var services = new List<Service>
                { 
                    new Service
                    {
                        Date = DateTime.Now.AddDays(-10),
                        Mileage = 789123,
                        Actions = "brake change",
                        Price = 354.0,
                        Time = 1.5,
                    },
                    new Service
                    {
                        Date = DateTime.Now.AddDays(-5),
                        Mileage = 189123,
                        Actions = "Full repair 1",
                        Price = 230,
                        Time = 3,
                    },
                    new Service
                    {
                        Date = DateTime.Now.AddDays(-4),
                        Mileage = 123456,
                        Actions = "Full repair 2",
                        Price = 330,
                        Time = 4,
                    },
                    new Service
                    {
                        Date = DateTime.Now.AddDays(-3),
                        Mileage = 234567,
                        Actions = "Full repair 3",
                        Price = 456,
                        Time = 5,
                    },
                    new Service
                    {
                        Date = DateTime.Now.AddDays(-2),
                        Mileage = 34567,
                        Actions = "Full repair 4",
                        Price = 100,
                        Time = 1,
                    }
                };

                var cars = new List<Car>
                {
                    new Car
                    {
                        Brand = "Ford",
                        Model = "Focus",
                        Year = 2020,
                        Vin = "asdfgh1223",
                        Services = new List<Service>{services[0], services[1] }
                    },

                    new Car
                    {
                        Brand = "Vw",
                        Model = "Golf",
                        Year = 2010,
                        Vin = "a1231412afgge",
                        Services = new List<Service>{services[2]}
                    },

                    new Car
                    {
                        Brand = "Vw",
                        Model = "Passat",
                        Year = 2015,
                        Vin = "adadadaafgge",
                        Services = new List<Service>{services[3]}
                    },

                    new Car
                    {
                        Brand = "Citroen",
                        Model = "C5",
                        Year = 2005,
                        Vin = "9987969",
                        Services = new List<Service>{services[4]}
                    }
                };

                var clients = new List<Client>
                {
                    new Client
                    {
                        FirstName = "Adam",
                        LastName = "Nowak",
                        Email = "adam@test.com",
                        Phone = "123123123",
                        Details = "abc",
                        Cars =  new List<Car>{ cars[1], cars[2]}
                    },

                    new Client
                    {
                        FirstName = "Ewa",
                        LastName = "Kowalska",
                        Email = "ewa@test.com",
                        Phone = "321321321",
                        Details = "def",
                        Cars =  new List<Car>{ cars[0]}
                    },

                    new Client
                    {
                        FirstName = "Jan",
                        LastName = "Janek",
                        Email = "jan@test.com",
                        Phone = "456456456",
                        Details = "ghi",
                        Cars =  new List<Car>{ cars[3]}
                    }
                };

                await context.Clients.AddRangeAsync(clients);
                await context.SaveChangesAsync();
            }
        }
    }
}
