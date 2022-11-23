using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cars
{
    public class Create {
        public class Command : IRequest<Result<Unit>>
        {
            public Car Car;
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
                await _context.Cars.AddAsync(request.Car);
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure("Failed to create car");
            }
        }
    }
}
