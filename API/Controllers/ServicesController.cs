using Application.Services;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;


namespace API.Controllers
{
    public class ServicesController : BaseApiController
    {
        private readonly DataContext _context;

        public ServicesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return HandleResult(await Mediator.Send(new Get.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Service service)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Service = service }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromBody] Service service)
        {
            service.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Service = service }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
