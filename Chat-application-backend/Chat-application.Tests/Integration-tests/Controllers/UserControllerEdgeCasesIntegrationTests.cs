using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using Chat_application.API.Models;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Chat_application.Tests.Integration_tests.Controllers
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

