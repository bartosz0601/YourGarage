using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class Delete {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id;
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var client = await _context.Clients.FindAsync(request.Id);
                
                if (client == null) {
                    return null;
                }

                _context.Remove(client);

                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure("Failed to delete client");
            }
        }
    }
}
