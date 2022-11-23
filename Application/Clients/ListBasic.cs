using Application.Core;
using Application.Interfaces;
using Application.Sevices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class ListBasic {
        public class Query : IRequest<Result<List<ClientBasicDto>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<List<ClientBasicDto>>>
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
            public async Task<Result<List<ClientBasicDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _userAccessor.GetUserId();
                var clients = await _context.Clients.Where(c => c.AppUserId == userId).OrderBy(c => c.LastName).ProjectTo<ClientBasicDto>(_mapper.ConfigurationProvider).ToListAsync();
                return Result<List<ClientBasicDto>>.Success(clients);
            }
        }
    }
}
