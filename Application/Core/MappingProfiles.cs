using Application.Sevices;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        { 
            CreateMap<Client, Client>();
            CreateMap<Car, Car>();
            CreateMap<Service, Service>();
            CreateMap<Service, ServiceDto>()
                .ForMember(d => d.CarName, s => s.MapFrom(s => (s.Car.Brand + ' ' + s.Car.Model + ' ' + s.Car.Year)))
                .ForMember(d => d.ClientId, s => s.MapFrom(s => s.Car.ClientId))
                .ForMember(d => d.ClientName, s => s.MapFrom(s => (s.Car.Client.FirstName + ' ' + s.Car.Client.LastName)));
        }
    }
}
