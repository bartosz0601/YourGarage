using Application.Clients;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Diagnostics;
using System.Linq;

namespace API.Controllers
{
    [Authorize]
    public class ClientsController : BaseApiController
    {
        private readonly DataContext _context;

        public ClientsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ClientParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("basic")]
        public async Task<IActionResult> GetBasic()
        {
            return HandleResult(await Mediator.Send(new ListBasic.Query { }));
        }


        [HttpGet("amount")]
        public async Task<IActionResult> GetAmount()
        {
            return HandleResult(await Mediator.Send(new Amount.Query { }));
        }

        [Authorize(Policy = "UserOwner")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return HandleResult(await Mediator.Send(new Get.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Client client)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Client = client }));
        }

        [Authorize(Policy = "UserOwner")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromBody] Client client)
        {
            client.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Client = client }));
        }

        [Authorize(Policy = "UserOwner")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
