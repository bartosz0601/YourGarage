using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cars
{
    public class Get {
        public class Query : IRequest<Result<Car>>
        {
            public Guid Id;
            public class Handler : IRequestHandler<Query, Result<Car>>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;
                }
                public async Task<Result<Car>> Handle(Query request, CancellationToken cancellationToken)
                {
                    var car = await _context.Cars.Include(c => c.Services).Include(c => c.Client).FirstOrDefaultAsync(c => c.Id == request.Id);
                    return Result<Car>.Success(car);
                }
            }
        }
    }
}
