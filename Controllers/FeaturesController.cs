using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    public class FeaturesController
    {
        private readonly VegaDbContext context;
        public FeaturesController(VegaDbContext context)
        {
            this.context = context;

        }
        [HttpGet("/api/features")]
       
        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            return await context.Features.ToListAsync();

        }

    }
}