using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ConcertClientAPI.Data;
using ConcertClientAPI.Models;
using ConcertClientAPI.Services; // Ensure the namespace for EmailService is included

namespace ConcertClientAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailService _emailService; // Declare EmailService correctly

        public ReservationsController(AppDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService; // Assign the emailService parameter to the field
        }

        // GET: api/reservations
        [HttpGet]
        public async Task<IActionResult> GetAllReservations()
        {
            var reservations = await _context.Reservations
                .Include(r => r.Concert)
                .ToListAsync();

            return Ok(reservations);
        }

        // POST: api/reservations
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            var concert = await _context.Concerts.FindAsync(reservation.ConcertId);

            if (concert == null)
            {
                return NotFound("Concert not found.");
            }

            if (concert.AvailableSeats < reservation.ReservedSeats)
            {
                return BadRequest("Not enough seats available.");
            }

            concert.AvailableSeats -= reservation.ReservedSeats;
            _context.Reservations.Add(reservation);

            await _context.SaveChangesAsync();

            // Send email receipt
            var emailMessage = $"Hello {reservation.UserName},\n\n" +
                               $"Thank you for your reservation!\n\n" +
                               $"Concert: {concert.Name}\n" +
                               $"Date: {concert.Date}\n" +
                               $"Seats Reserved: {reservation.ReservedSeats}\n\n" +
                               $"We look forward to seeing you there!\n\n" +
                               $"Best regards,\nConcert Management Team";

            try
            {
                await _emailService.SendEmailAsync(reservation.email, "Your Concert Reservation", emailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }

            return CreatedAtAction(nameof(PostReservation), reservation);
        }

        // GET: api/reservations/concert/{concertId}
        [HttpGet("concert/{concertId}")]
        public async Task<IActionResult> GetReservationsByConcert(int concertId)
        {
            var reservations = await _context.Reservations
                .Where(r => r.ConcertId == concertId)
                .ToListAsync();

            if (!reservations.Any())
            {
                return NotFound(new { Message = "No reservations found for this concert." });
            }

            return Ok(reservations);
        }
    }
}
