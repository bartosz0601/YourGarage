using Application.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Clients
{
    public class ClientParams : PagingParams
    {
        public string SearchParam { get; set; } = "";
    }
}
