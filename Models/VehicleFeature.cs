using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models
{
     [Table("VehicleFeatures")]
    public class VehicleFeature
    {
        [Key]
        public int VehicleId { get; set; }
        [Key]
        public int FeatureId { get; set; }
        public Vehicle Vehicle { get; set; }
        public Feature Feature { get; set; }
    }
}