using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class List {
        public class Query : IRequest<Result<List<Client>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<List<Client>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Client>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var clients = await _context.Clients.OrderBy(c => c.LastName).Include(c => c.Cars).ToListAsync();
                return Result<List<Client>>.Success(clients);
            }
        }
    }
}
