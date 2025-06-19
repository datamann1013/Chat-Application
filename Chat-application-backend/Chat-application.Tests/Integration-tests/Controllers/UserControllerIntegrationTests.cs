using Chat_application.API;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Chat_application.Tests.Integration_tests.Controllers
{
    public class UserControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public UserControllerIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetAllUsers_ReturnsSuccess()
        {
            var response = await _client.GetAsync("/api/user");
            response.EnsureSuccessStatusCode();
        }
    }
}

