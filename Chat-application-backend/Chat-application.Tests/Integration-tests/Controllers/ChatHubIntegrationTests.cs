using Microsoft.AspNetCore.Mvc.Testing;
using Chat_application.API;
using Microsoft.AspNetCore.SignalR.Client;

namespace Chat_application.Tests.Integration_tests.Controllers
{
    public class ChatHubIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public ChatHubIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task SendMessage_ReceivesMessage()
        {
            var serverUri = new Uri("http://localhost/chathub");
            var connection = new HubConnectionBuilder()
                .WithUrl(serverUri)
                .Build();

            string receivedUser = null;
            string receivedMessage = null;
            connection.On<string, string>("ReceiveMessage", (user, message) =>
            {
                receivedUser = user;
                receivedMessage = message;
            });

            await connection.StartAsync();
            await connection.InvokeAsync("SendMessage", "integrationUser", "Hello from integration test");
            await Task.Delay(500); // Wait for message to be received
            await connection.StopAsync();

            Assert.Equal("integrationUser", receivedUser);
            Assert.Equal("Hello from integration test", receivedMessage);
        }
    }
}
