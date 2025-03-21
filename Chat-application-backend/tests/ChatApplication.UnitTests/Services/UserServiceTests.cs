using System.ComponentModel.DataAnnotations;
using Xunit;
using Moq;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Interfaces;
using Chat_application_backend.src.ChatApplication.Services;
using FluentAssertions;

namespace Chat_application_backend.tests.ChatApplication.UnitTests.Services
{
    public class UserServiceTests
    {
        private readonly Mock<IUserRepository> _mockUserRepo;
        private readonly Mock<ILogger<UserService>> _mockLogger;
        private readonly UserService _userService;

        public UserServiceTests()
        {
            _mockUserRepo = new Mock<IUserRepository>();
            _mockLogger = new Mock<ILogger<UserService>>();
            _userService = new UserService(_mockUserRepo.Object, _mockLogger.Object);
        }

        [Fact]
        public async Task RegisterUser_ShouldSucceed_WhenUserIsValid()
        {
            // Arrange
            var user = new User { Username = "testuser", Email = "test@example.com", PasswordHash = "xyz"};
            
            _mockUserRepo .Setup(repo => repo.AddUserAsync(It.IsAny<User>())).ReturnsAsync(user);

            // Act
            var result = await _userService.RegisterUser(user);

            // Assert
            result.Should().NotBeNull();
            result.Username.Should().Be("testuser");
            _mockUserRepo .Verify(repo => repo.AddUserAsync(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async Task Login_ShouldFail_WhenIncorrectPassword()
        {
            // Arrange
            var user = new User { Username = "testuser", PasswordHash = "hashedPassword" };
            _mockUserRepo .Setup(repo => repo.GetUserByUsernameAsync("testuser")).ReturnsAsync(user);

            // Act
            var result = await _userService.Login("testuser", "wrongpassword");

            // Assert
            result.Should().BeNull();
        }
    }
}
