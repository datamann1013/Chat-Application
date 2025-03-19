using Xunit;
using FluentAssertions;
using Moq;
using System;
using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Infrastructure;
using Chat_application_backend.src.ChatApplication.Infrastructure.Services;

namespace Chat_application_backend.tests.ChatApplication.UnitTests.Services
{
    public class UserServiceTests
    {
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly UserService _userService;

        public UserServiceTests()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _userService = new UserService(_userRepositoryMock.Object);
        }

        [Fact]
        public async Task RegisterUser_ShouldSucceed_WhenUserIsValid()
        {
            // Arrange
            var user = new User { Username = "testuser", Email = "test@example.com" };
            _userRepositoryMock.Setup(repo => repo.AddUserAsync(It.IsAny<User>())).ReturnsAsync(user);

            // Act
            var result = await _userService.RegisterUser(user);

            // Assert
            result.Should().NotBeNull();
            result.Username.Should().Be("testuser");
            _userRepositoryMock.Verify(repo => repo.AddUserAsync(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async Task Login_ShouldFail_WhenIncorrectPassword()
        {
            // Arrange
            var user = new User { Username = "testuser", PasswordHash = "hashedPassword" };
            _userRepositoryMock.Setup(repo => repo.GetUserByUsernameAsync("testuser")).ReturnsAsync(user);

            // Act
            var result = await _userService.Login("testuser", "wrongpassword");

            // Assert
            result.Should().BeNull();
        }
    }
}
