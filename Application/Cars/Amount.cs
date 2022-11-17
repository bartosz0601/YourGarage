using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cars
{
    public class Amount
    {
        public class Query : IRequest<Result<int>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<int>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<int>> Handle(Query request, CancellationToken cancellationToken)
            {
                var amount = await _context.Cars.CountAsync();
                return Result<int>.Success(amount);
            }
        }
    }
}
