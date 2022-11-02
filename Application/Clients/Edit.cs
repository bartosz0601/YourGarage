using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class Edit {
        public class Command : IRequest<Result<Unit>>
        {
            public Client Client;
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var client = await _context.Clients.FindAsync(request.Client.Id);
                _mapper.Map(request.Client, client);
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                { 
                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure("Failed to update client");
            }
        }
    }
}
