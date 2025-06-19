using Xunit;
using Moq;
using Chat_application.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chat_application.API.Controllers;
using Chat_application.API.Services;

namespace Chat_application.Tests.Controllers
{
    public class ChatControllerTests
    {
        [Fact]
        public async Task GetMessages_ReturnsOkWithMessages()
        {
            var mockService = new Mock<IChatService>();
            mockService.Setup(s => s.GetAllMessagesAsync())
                .ReturnsAsync(new List<ChatMessage> { new ChatMessage { Content = "Hello" } });
            var controller = new ChatController(mockService.Object);
            var result = await controller.GetMessages();
            var okResult = Assert.IsType<OkObjectResult>(result);
            var messages = Assert.IsAssignableFrom<IEnumerable<ChatMessage>>(okResult.Value);
            Assert.Single(messages);
        }

        [Fact]
        public async Task SendMessage_ReturnsOkWithMessage()
        {
            var mockService = new Mock<IChatService>();
            var message = new ChatMessage { Content = "Hi" };
            mockService.Setup(s => s.SendMessageAsync(message)).ReturnsAsync(message);
            var controller = new ChatController(mockService.Object);
            var result = await controller.SendMessage(message);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returned = Assert.IsType<ChatMessage>(okResult.Value);
            Assert.Equal("Hi", returned.Content);
        }
    }
}
