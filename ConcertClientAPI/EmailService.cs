using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace ConcertClientAPI.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string recipientEmail, string subject, string message)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["SenderEmail"]));
            email.To.Add(MailboxAddress.Parse(recipientEmail));
            email.Subject = subject;

            email.Body = new TextPart("plain")
            {
                Text = message
            };

            using var smtp = new SmtpClient();

            try
            {
                // Connect using STARTTLS on port 587
              //  await smtp.ConnectAsync(emailSettings["SmtpServer"], 587, SecureSocketOptions.StartTls);
await smtp.ConnectAsync(emailSettings["SmtpServer"], 465, SecureSocketOptions.SslOnConnect);

                // Authenticate with the server
                await smtp.AuthenticateAsync(emailSettings["SenderEmail"], emailSettings["SenderPassword"]);

                // Send the email
                await smtp.SendAsync(email);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw;
            }
            finally
            {
                // Disconnect cleanly
                await smtp.DisconnectAsync(true);
            }
        }
    }
}
