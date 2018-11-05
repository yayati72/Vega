using Microsoft.EntityFrameworkCore;
using Vega.Models;

namespace Vega.Persistence
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options) 
            :base(options)
            {
                
            }
             protected override void OnModelCreating(ModelBuilder builder)
            {
                builder.Entity<VehicleFeature>().HasKey(table => new {
                table.FeatureId, table.VehicleId
                });
            }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Photo> Photos { get; set; }
           


            
    }
}