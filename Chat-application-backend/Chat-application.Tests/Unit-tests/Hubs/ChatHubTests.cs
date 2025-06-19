using Xunit;
using Moq;
using Microsoft.AspNetCore.SignalR;
using Chat_application.API.Hubs;
using System.Threading.Tasks;

namespace Chat_application.Tests.Unit_tests.Hubs
{
    public class ChatHubTests
    {
        [Fact]
        public async Task SendMessage_CallsClientsAllSendAsync()
        {
            // Arrange
            var mockClients = new Mock<IHubCallerClients>();
            var mockClientProxy = new Mock<IClientProxy>();
            mockClients.Setup(clients => clients.All).Returns(mockClientProxy.Object);
            var hub = new ChatHub
            {
                Clients = mockClients.Object
            };

            // Act
            await hub.SendMessage("user1", "Hello");

            // Assert
            mockClients.Verify(clients => clients.All, Times.Once);
            mockClientProxy.Verify(proxy => proxy.SendCoreAsync(
                "ReceiveMessage",
                It.Is<object[]>(o => (string)o[0] == "user1" && (string)o[1] == "Hello"),
                default), Times.Once);
        }
    }
}
