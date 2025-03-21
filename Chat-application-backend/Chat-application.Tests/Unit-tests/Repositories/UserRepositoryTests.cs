using Xunit;
using FluentAssertions;    
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Chat_application.API.Data;
using Chat_application.API.Models;
using Chat_application.API.Repositories;


namespace Chat_Application.Tests.Unit_Tests.Repositories
{
    /// <summary>
    /// Tests for UserRepository using an in-memory EF Core database.
    /// </summary>
    public class UserRepositoryTests
    {
        [Fact]
        public async Task AddUserAsync_ShouldPersist_WhenValid()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("UserRepoTestDB")
                .Options;

            // In a real test, you'd re-create context per test or use a fixture
            using var context = new ApplicationDbContext(options);
            var repo = new UserRepository(context);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = "TestUser",
                Email = "test@example.com"
            };

            // Act
            await repo.AddUserAsync(user);
            var result = await repo.GetUserByUsernameAsync("TestUser");

            // Assert
            result.Should().NotBeNull();
            result.Email.Should().Be("test@example.com");
        }

        [Fact]
        public async Task GetUserByUsernameAsync_ShouldReturnNull_WhenNotFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("UserRepoTestDB2")
                .Options;

            using var context = new ApplicationDbContext(options);
            var repo = new UserRepository(context);

            // Act
            var result = await repo.GetUserByUsernameAsync("MissingUser");

            // Assert
            result.Should().BeNull();
        }
    }
}