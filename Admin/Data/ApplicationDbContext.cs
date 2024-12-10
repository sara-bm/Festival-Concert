using Microsoft.EntityFrameworkCore;
using FestivalCarthage.Models;

namespace FestivalCarthage.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Concert> Concerts { get; set; }
    }
}
