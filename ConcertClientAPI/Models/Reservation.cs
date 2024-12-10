using System;
using System.ComponentModel.DataAnnotations;

namespace ConcertClientAPI.Models
{
    public class Reservation
    {
        [Key] 
         public int Id { get; set; }
    public string UserName { get; set; }
        public string email { get; set; }
    public int ConcertId { get; set; }
    public int ReservedSeats { get; set; }

    // Navigation property
  public Concert? Concert { get; set; }
    }
}
