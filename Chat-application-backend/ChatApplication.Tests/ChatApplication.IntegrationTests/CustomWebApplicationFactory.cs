
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;

namespace Chat_application_backend.Tests.ChatApplication.IntegrationTests
{
    public class CustomWebApplicationFactory : WebApplicationFactory<Program> // Use your entry point class here (e.g., Program)
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Remove the app's DbContext registration
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<ChatApplicationDbContext>));
                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                // Add a test DbContext with in-memory database
                services.AddDbContext<ChatApplicationDbContext>(options =>
                {
                    options.UseInMemoryDatabase("TestDb");
                });

                // You can add more custom services or mocks as needed
            });
        }
    }
}
