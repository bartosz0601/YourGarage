using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Application.Clients
{
    public class Create {
        public class Command : IRequest<Result<Unit>>
        {
            public Client Client;
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var userId = _userAccessor.GetUserId();
                request.Client.AppUserId = userId;
                await _context.Clients.AddAsync(request.Client);
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure("Failed to create client");
            }
        }
    }
}
