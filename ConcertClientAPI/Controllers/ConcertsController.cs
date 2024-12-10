using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ConcertClientAPI.Data;
using ConcertClientAPI.Models;

namespace ConcertClientAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConcertsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConcertsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Concert>>> GetConcerts()
        {
            return await _context.Concerts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Concert>> GetConcert(int id)
        {
            var concert = await _context.Concerts.FindAsync(id);

            if (concert == null)
            {
                return NotFound();
            }

            return concert;
        }

        [HttpPost]
        public async Task<ActionResult<Concert>> PostConcert(Concert concert)
        {
            _context.Concerts.Add(concert);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConcert), new { id = concert.Id }, concert);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutConcert(int id, Concert concert)
        {
            if (id != concert.Id)
            {
                return BadRequest();
            }

            _context.Entry(concert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Concerts.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConcert(int id)
        {
            var concert = await _context.Concerts.FindAsync(id);
            if (concert == null)
            {
                return NotFound();
            }

            _context.Concerts.Remove(concert);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
