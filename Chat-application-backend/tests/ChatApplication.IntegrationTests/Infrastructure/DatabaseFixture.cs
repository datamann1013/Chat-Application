using System;
using Microsoft.EntityFrameworkCore;
using ChatApplication.Infrastructure.Data;

namespace Chat_application_backend.tests.ChatApplication.IntegrationTests.Infrastructure
{
    public class DatabaseFixture : IDisposable
    {
        public readonly ApplicationDbContext Context;

        public DatabaseFixture()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("TestDatabase")
                .Options;

            Context = new ApplicationDbContext(options);
            Context.Database.EnsureCreated();
        }

        public void Dispose()
        {
            Context.Database.EnsureDeleted();
            Context.Dispose();
        }
    }
}
