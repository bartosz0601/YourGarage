using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class Get {
        public class Query : IRequest<Result<Client>>
        {
            public Guid Id;
        }
        public class Handler : IRequestHandler<Query, Result<Client>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Client>> Handle(Query request, CancellationToken cancellationToken)
            {
                var client = await _context.Clients.Include(c => c.Cars).FirstOrDefaultAsync(c => c.Id == request.Id);
                return Result<Client>.Success(client);
            }
        }
    }
}
