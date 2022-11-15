using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cars
{
    public class List {
        public class Query : IRequest<Result<PagedList<Car>>>
        {
            public CarParams Params { get; set;}
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<Car>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<PagedList<Car>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Cars.OrderBy(c => c.Brand).AsQueryable();

                if (request.Params.SearchParam != null)
                {
                    var searchParam = "%" + request.Params.SearchParam + "%";
                    query = query.Where(c => EF.Functions.Like(c.Brand, searchParam) | EF.Functions.Like(c.Model, searchParam) | EF.Functions.Like(c.Vin, searchParam));
                }

                return Result<PagedList<Car>>.Success(
                    await PagedList<Car>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                    );
            }
        }
    }
}
