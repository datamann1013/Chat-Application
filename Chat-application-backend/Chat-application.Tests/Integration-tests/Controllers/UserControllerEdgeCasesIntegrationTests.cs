using Chat_application.API;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Chat_Application.Tests.Integration_Tests.Controllers
{
    public class UserControllerEdgeCasesIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public UserControllerEdgeCasesIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetUserById_NotFound_ReturnsNotFound()
        {
            var response = await _client.GetAsync($"/api/user/{System.Guid.NewGuid()}");
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}

