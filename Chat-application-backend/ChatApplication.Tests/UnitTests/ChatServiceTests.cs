using Xunit;
using Moq;
using ChatApplication.Services;

namespace Chat_application_backend.ChatApplication.Tests.UnitTests
{
    /// <summary>
    /// Unit tests for ChatService.
    /// </summary>
    public class ChatServiceTests
    {
        private readonly ChatService _chatService;

        public ChatServiceTests()
        {
            _chatService = new ChatService();
        }

        [Fact]
        public void SendMessage_ShouldReturnTrue_WhenMessageIsValid()
        {
            // Arrange
            var senderId = 1;
            var receiverId = 2;
            var messageContent = "Hello, world!";

            // Act
            var result = _chatService.SendMessage(senderId, receiverId, messageContent);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void GetChatHistory_ShouldReturnMessages_WhenConversationExists()
        {
            // Arrange
            var user1Id = 1;
            var user2Id = 2;

            // Act
            var chatHistory = _chatService.GetChatHistory(user1Id, user2Id);

            // Assert
            Assert.NotNull(chatHistory);
        }
    }
}