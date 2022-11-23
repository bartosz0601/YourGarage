using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyModel;
using Persistence;
using System.Net;

namespace Application.Sevices
{
    public class Statistics
    {
        public class Query : IRequest<Result<List<int>>>
        {
            public IEnumerable<DateTime> DateTimes;
        }
        public class Handler : IRequestHandler<Query, Result<List<int>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<List<int>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _userAccessor.GetUserId();
                var response = new List<int>();
                var query = _context.Services.Where(s => s.Car.Client.AppUserId == userId).AsQueryable();
                response.Add(await query.CountAsync());

                foreach (var date in request.DateTimes)
                {
                    response.Add(await query.Where(s => s.Date >= date).CountAsync());
                }
                return Result<List<int>>.Success(response);
            }
        }
    }
}
