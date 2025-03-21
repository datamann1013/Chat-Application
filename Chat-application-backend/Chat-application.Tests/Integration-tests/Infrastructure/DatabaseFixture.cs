using System;
using Chat_application_backend.src.ChatApplication.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Chat_application.Tests.Integration_tests.Infrastructure
{
    /// <summary>
    /// Provides an in-memory database fixture for integration tests.
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