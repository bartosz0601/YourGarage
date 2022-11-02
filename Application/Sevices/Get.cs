using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services
{
    public class Get {
        public class Query : IRequest<Result<Service>>
        {
            public Guid Id;
        }
        public class Handler : IRequestHandler<Query, Result<Service>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Service>> Handle(Query request, CancellationToken cancellationToken)
            {
                var service = await _context.Services.FirstOrDefaultAsync(c => c.Id == request.Id);
                return Result<Service>.Success(service);
            }
        }
    }
}
