using Application.Cars;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class List {
        public class Query : IRequest<Result<PagedList<Client>>>
        {
            public ClientParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<Client>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<PagedList<Client>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Clients.OrderBy(c => c.LastName).Include(c => c.Cars).AsQueryable();

                if (request.Params.SearchParam != null)
                {
                    var searchParam = "%" + request.Params.SearchParam + "%";
                    query = query.Where(c => EF.Functions.Like(c.FirstName, searchParam) | EF.Functions.Like(c.LastName, searchParam) | EF.Functions.Like(c.Phone, searchParam) | EF.Functions.Like(c.Email, searchParam));
                }

                return Result<PagedList<Client>>.Success(
                    await PagedList<Client>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                    );
            }
        }
    }
}
