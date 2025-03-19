using Xunit;
using Moq;
using ChatApplication.Services;

namespace Chat_application_backend.ChatApplication.Tests.UnitTests
{
    /// <summary>
    /// Unit tests for UserService.
    /// </summary>
    public class UserServiceTests
    {
        private readonly UserService _userService;

        public UserServiceTests()
        {
            // Mock dependencies here if needed
            _userService = new UserService();
        }

        [Fact]
        public void RegisterUser_ShouldReturnTrue_WhenUserIsValid()
        {
            // Arrange
            var username = "testUser";
            var password = "SecurePassword123";

            // Act
            var result = _userService.RegisterUser(username, password);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void AuthenticateUser_ShouldReturnToken_WhenCredentialsAreValid()
        {
            // Arrange
            var username = "testUser";
            var password = "SecurePassword123";

            // Act
            var token = _userService.AuthenticateUser(username, password);

            // Assert
            Assert.NotNull(token);
        }
    }
}