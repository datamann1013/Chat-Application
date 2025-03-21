using Xunit;
using FluentAssertions;
using System;
using System.Threading.Tasks;
using Chat_Application.Tests.Integration_Tests.Infrastructure;

namespace Chat_Application.Tests.Integration_Tests.Repositories
{
    /// <summary>
    /// Integration tests for UserRepository with in-memory DB.
    /// </summary>
    public class UserRepositoryIntegrationTests : IClassFixture<DatabaseFixture>
    {
        private readonly ApplicationDbContext _context;
        private readonly UserRepository _userRepository;

        public UserRepositoryIntegrationTests(DatabaseFixture fixture)
        {
            _context = fixture.Context;
            _userRepository = new UserRepository(_context);
        }

        /// <summary>
        /// Tests that adding a user persists it in the DB.
        /// </summary>
        [Fact]
        public async Task AddUser_ShouldPersist_WhenValid()
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = "testuser",
                Email = "test@example.com"
            };

            await _userRepository.AddUserAsync(user);
            var result = await _userRepository.GetUserByUsernameAsync("testuser");

            result.Should().NotBeNull();
            result.Username.Should().Be("testuser");
        }

        /// <summary>
        /// Tests retrieving a user that doesn't exist returns null.
        /// </summary>
        [Fact]
        public async Task GetUser_NonExistentUser_ReturnsNull()
        {
            var result = await _userRepository.GetUserByUsernameAsync("missingUser");
            result.Should().BeNull();
        }
    }
}