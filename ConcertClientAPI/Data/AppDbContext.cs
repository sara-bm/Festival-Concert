using Microsoft.EntityFrameworkCore;
using ConcertClientAPI.Models;

namespace ConcertClientAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Concert> Concerts { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
