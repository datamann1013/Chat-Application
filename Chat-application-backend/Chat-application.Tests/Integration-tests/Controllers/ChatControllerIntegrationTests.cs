using System.Net.Http.Json;
using Chat_application.API;
using Chat_application.API.Models;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Chat_Application.Tests.Integration_Tests.Controllers
{
    public class ChatControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public ChatControllerIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task SendMessage_And_GetMessages_Success()
        {
            // Arrange: create a message
            var message = new ChatMessage
            {
                SenderId = System.Guid.NewGuid(),
                ReceiverId = System.Guid.NewGuid(),
                Content = "Integration test message"
            };
            // Act: send message
            var sendResponse = await _client.PostAsJsonAsync("/api/chat/send", message);
            sendResponse.EnsureSuccessStatusCode();

            // Act: get messages
            var getResponse = await _client.GetAsync("/api/chat/messages");
            getResponse.EnsureSuccessStatusCode();
            var messages = await getResponse.Content.ReadFromJsonAsync<ChatMessage[]>();
            Assert.Contains(messages, m => m.Content == "Integration test message");
        }
    }
}

