using Application.Core;
using Application.Interfaces;
using Application.Sevices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services
{
    public class List {
        public class Query : IRequest<Result<PagedList<ServiceDto>>>
        {
            public ServiceParams Params { get; set;}
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<ServiceDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }
            public async Task<Result<PagedList<ServiceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _userAccessor.GetUserId();
                var query = _context.Services
                    .Where(s => s.Date > request.Params.StartDate & s.Date <= request.Params.EndDate & s.Car.Client.AppUserId == userId)
                    .OrderByDescending(c => c.Date)
                    .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
                return Result<PagedList<ServiceDto>>.Success(
                    await PagedList<ServiceDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                    );
            }
        }
    }
}
