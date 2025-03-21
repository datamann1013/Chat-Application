using System;
using Chat_application.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Chat_Application.Tests.Integration_Tests.Infrastructure
{
    /// <summary>
    /// Provides an in-memory database fixture for integration tests.
    /// Use this fixture to avoid collisions between tests.
    /// </summary>
    public class DatabaseFixture : IDisposable
    {
        public ApplicationDbContext Context { get; private set; }

        public DatabaseFixture()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("TestDatabase")
                .Options;

            Context = new ApplicationDbContext(options);
        }

        public void Dispose()
        {
            Context.Database.EnsureDeleted();
            Context.Dispose();
        }
    }
}