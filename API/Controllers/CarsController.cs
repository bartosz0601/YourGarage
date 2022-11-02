﻿using Application.Cars;
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
        public async Task<IActionResult> Create([FromBody] Car car)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Car = car }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Create(Guid id, [FromBody] Car car)
        {
            car.Id = id;
            return HandleResult(await Mediator.Send(new Create.Command { Car = car }));
        }
    }
}
