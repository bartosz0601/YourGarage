using Application.Core;
using Application.Interfaces;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<int>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _userAccessor.GetUserId();
                var amount = await _context.Cars.Where(c => c.Client.AppUserId == userId).CountAsync();
                return Result<int>.Success(amount);
            }
        }
    }
}
