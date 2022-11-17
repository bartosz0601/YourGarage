using Application.Cars;
using Application.Sevices;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;


namespace API.Controllers
{
    public class CarsController : BaseApiController
    {
        private readonly DataContext _context;

        public CarsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] CarParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("amount")]
        public async Task<IActionResult> GetAmount()
        {
            return HandleResult(await Mediator.Send(new Amount.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return HandleResult(await Mediator.Send(new Get.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Car car)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Car = car }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromBody] Car car)
        {
            car.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Car = car }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}