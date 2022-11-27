using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public  class UserOwnerRequirement: IAuthorizationRequirement
    {

    }

    public class UserOwnerHandler : AuthorizationHandler<UserOwnerRequirement>
    {

        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserOwnerHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserOwnerRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var routeData =  _httpContextAccessor.HttpContext.GetRouteData();
            var itemId = Guid.Parse(routeData.Values.SingleOrDefault(x => x.Key == "id").Value?.ToString());
            var controllerName = routeData.Values.SingleOrDefault(x => x.Key == "controller").Value.ToString();

            switch (controllerName)
            {
                case "Clients":
                    var client = _dbContext.Clients.AsNoTracking().Where(x => x.Id == itemId && x.AppUserId == userId).SingleOrDefaultAsync().Result;
                    if (client == null) return Task.CompletedTask;
                    context.Succeed(requirement);
                    break;
                case "Cars":
                    var car = _dbContext.Cars.AsNoTracking().Where(x => x.Id == itemId && x.Client.AppUserId == userId).SingleOrDefaultAsync().Result;
                    if (car == null) return Task.CompletedTask;
                    context.Succeed(requirement);
                    break;
                case "Services":
                    var service = _dbContext.Services.AsNoTracking().Where(x => x.Id == itemId && x.Car.Client.AppUserId == userId).SingleOrDefaultAsync().Result;
                    if (service == null) return Task.CompletedTask;
                    context.Succeed(requirement);
                    break;
            }
            return Task.CompletedTask;
        }
    }
}
