using Application.Core;
using Application.Interfaces;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<PagedList<Car>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _userAccessor.GetUserId();
                var query = _context.Cars.Where(c => c.Client.AppUserId == userId).OrderBy(c => c.Brand).AsQueryable();

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
