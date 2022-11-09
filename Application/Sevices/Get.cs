using Application.Core;
using Application.Sevices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services
{
    public class Get {
        public class Query : IRequest<Result<ServiceDto>>
        {
            public Guid Id;
        }
        public class Handler : IRequestHandler<Query, Result<ServiceDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<ServiceDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var service = await _context.Services.ProjectTo<ServiceDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(s => s.Id == request.Id);
                return Result<ServiceDto>.Success(service);
            }
        }
    }
}
