using Xunit;
using FluentAssertions;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Interfaces;
using Chat_application_backend.src.ChatApplication.Services;

namespace Chat_application.Tests.Unit_tests.Services
{
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
            // Arrange
            var message = new ChatMessage { SenderId = Guid.NewGuid(), ReceiverId = Guid.NewGuid(), Content = "Hello" };
            _chatRepositoryMock.Setup(repo => repo.SaveMessageAsync(It.IsAny<ChatMessage>())).Returns(Task.CompletedTask);

            // Act
            await _chatService.SendMessage(message);

            // Assert
            _chatRepositoryMock.Verify(repo => repo.SaveMessageAsync(It.IsAny<ChatMessage>()), Times.Once);
        }
    }
}