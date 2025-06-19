using Xunit;
using FluentAssertions;
using Moq;
using System;
using System.Threading.Tasks;
using Chat_application.API.Interfaces;
using Chat_application.API.Models;
using Chat_application.API.Services;

namespace Chat_Application.Tests.Unit_Tests.Services
{
    /// <summary>
    /// Unit tests for ChatService, using Moq to mock IChatRepository.
    /// </summary>
    public class ChatServiceTests
    {
        private readonly Mock<IChatRepository> _chatRepositoryMock;
        private readonly ChatService _chatService;

        public ChatServiceTests()
        {
            _chatRepositoryMock = new Mock<IChatRepository>();
            _chatService = new ChatService(_chatRepositoryMock.Object);
        }

        [Fact]
        public async Task SendMessage_ShouldSucceed_WhenValid()
        {
            var message = new ChatMessage
            {
                SenderId = Guid.NewGuid(),
                ReceiverId = Guid.NewGuid(),
                Content = "Hello"
            };

            _chatRepositoryMock.Setup(repo => repo.SaveMessageAsync(It.IsAny<ChatMessage>()))
                .Returns(Task.CompletedTask);

            await _chatService.SendMessage(message);

            _chatRepositoryMock.Verify(repo => repo.SaveMessageAsync(It.IsAny<ChatMessage>()), Times.Once);
        }

        [Fact]
        public async Task GetMessages_ShouldReturnList_WhenExists()
        {
            // Example test for retrieving messages
            _chatRepositoryMock.Setup(repo => repo.GetMessagesAsync(It.IsAny<Guid>(), It.IsAny<Guid>()))
                .ReturnsAsync(new List<ChatMessage> {
                    new ChatMessage { Content = "Hi" }
                });

            var messages = await _chatService.GetMessages(Guid.NewGuid(), Guid.NewGuid());
            messages.Should().HaveCount(1);
        }
    }
}