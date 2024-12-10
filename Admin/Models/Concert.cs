using System;
using System.ComponentModel.DataAnnotations;

namespace FestivalCarthage.Models
{
    public class Concert
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Artist { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Required]
        [DataType(DataType.Time)]
        public TimeSpan HeureConcert { get; set; }

        [Required]
        public string Place { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        public string Description { get; set; } = "No description available";

        public int AvailableSeats { get; set; } = 0;
        public string Image  { get; set; } = "https://www.amsterdamnow.com/app/uploads/2017/10/festival-1.jpg";
    }
}
