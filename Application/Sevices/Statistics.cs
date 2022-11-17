using Application.Core;
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
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<int>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var response = new List<int>();
                response.Add(await _context.Services.CountAsync());

                foreach (var date in request.DateTimes)
                {
                    response.Add(await _context.Services.Where(s => s.Date >= date).CountAsync());
                }
                return Result<List<int>>.Success(response);
            }
        }
    }
}
