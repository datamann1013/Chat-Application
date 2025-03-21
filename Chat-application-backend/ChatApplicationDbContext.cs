using Chat_application_backend.src.ChatApplication.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Chat_application_backend
{
    public class ChatApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } // Assuming you have a User entity

        public ChatApplicationDbContext(DbContextOptions<ChatApplicationDbContext> options) : base(options)
        {
        }

        // Additional DbSets for other entities can be added here
    }
}