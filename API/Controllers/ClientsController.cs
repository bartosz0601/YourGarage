﻿using Application.Clients;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Diagnostics;
using System.Linq;

namespace API.Controllers
{
    public class ClientsController : BaseApiController
    {
        private readonly DataContext _context;

        public ClientsController(DataContext context)
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
        public async Task<IActionResult> Create([FromBody] Client client)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Client = client }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromBody] Client client)
        {
            client.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Client = client }));
        }
    }
}
