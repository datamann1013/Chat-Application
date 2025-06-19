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
    /// Unit tests for UserService, mocking IUserRepository.
    /// </summary>
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
        public async Task CreateUser_ShouldReturnUser_WhenValid()
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                UserName = "testuser",
                Email = "test@example.com"
            };

            _userRepositoryMock.Setup(repo => repo.AddUserAsync(It.IsAny<User>()))
                .ReturnsAsync(user); // user is not null, so this is fine

            _userRepositoryMock.Setup(repo => repo.GetUserByUsernameAsync("testuser"))
                .ReturnsAsync((User?)null); // explicitly nullable

            var result = await _userService.CreateUserAsync(user);

            result.Should().NotBeNull();
            result.UserName.Should().Be("testuser");
        }

        [Fact]
        public async Task Login_ShouldReturnNull_WhenInvalidCredentials()
        {
            _userRepositoryMock.Setup(repo => repo.GetUserByUsernameAsync("testuser"))
                .ReturnsAsync((User?)null);

            var result = await _userService.LoginAsync("testuser", "wrongpassword");
            result.Should().BeNull();
        }
    }
}