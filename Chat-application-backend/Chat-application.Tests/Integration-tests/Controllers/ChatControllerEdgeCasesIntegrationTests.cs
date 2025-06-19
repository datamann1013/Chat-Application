using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using Chat_application.API.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using Chat_application.API;

namespace Chat_application.Tests.Integration_tests.Controllers
{
    public class ChatControllerEdgeCasesIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public ChatControllerEdgeCasesIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task SendMessage_InvalidPayload_ReturnsBadRequest()
        {
            // Missing required fields
            var message = new { }; // empty object
            var response = await _client.PostAsJsonAsync("/api/chat/send", message);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task SendMessage_Unauthorized_ReturnsUnauthorized()
        {
            // Simulate no auth header if your API requires auth
            var unauthClient = new WebApplicationFactory<Program>().CreateClient();
            var message = new ChatMessage
            {
                SenderId = System.Guid.NewGuid(),
                ReceiverId = System.Guid.NewGuid(),
                Content = "Should not be sent"
            };
            var response = await unauthClient.PostAsJsonAsync("/api/chat/send", message);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
