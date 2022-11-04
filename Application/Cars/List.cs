using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cars
{
    public class List {
        public class Query : IRequest<Result<List<Car>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<List<Car>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Car>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var cars = await _context.Cars.Include(c => c.Client).OrderBy(c => c.Brand).ToListAsync();
                return Result<List<Car>>.Success(cars);
            }
        }
    }
}
