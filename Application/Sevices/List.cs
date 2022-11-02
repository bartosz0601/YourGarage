using Application.Core;
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
        public class Query : IRequest<Result<List<ServiceDto>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<List<ServiceDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<ServiceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var services = await _context.Services.OrderByDescending(c => c.Date).ProjectTo<ServiceDto>(_mapper.ConfigurationProvider).ToListAsync();
                return Result<List<ServiceDto>>.Success(services);
            }
        }
    }
}
