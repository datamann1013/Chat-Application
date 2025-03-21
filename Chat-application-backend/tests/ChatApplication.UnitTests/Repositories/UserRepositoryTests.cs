using Xunit;
using FluentAssertions;
using System;
using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Infrastructure.Data;
using Chat_application_backend.src.ChatApplication.Infrastructure.Repositories;
using Chat_application_backend.tests.ChatApplication.IntegrationTests.Infrastructure;

namespace Chat_application_backend.tests.ChatApplication.UnitTests.Repositories
{
    public class UserRepositoryIntegrationTests : IClassFixture<DatabaseFixture>
    {
        private readonly ApplicationDbContext _context;
        private readonly UserRepository _userRepository;

        public UserRepositoryIntegrationTests(DatabaseFixture fixture)
        {
            _context = fixture.Context;
            _userRepository = new UserRepository(_context);
        }

        [Fact]
        public async Task AddUser_ShouldPersist_WhenValid()
        {
            // Arrange
            var user = new User { Id = Guid.NewGuid(), Username = "testuser", Email = "test@example.com" };

            // Act
            await _userRepository.AddUserAsync(user);
            var result = await _userRepository.GetUserByUsernameAsync("testuser");

            // Assert
            result.Should().NotBeNull();
            result.Username.Should().Be("testuser");
        }
    }
}
