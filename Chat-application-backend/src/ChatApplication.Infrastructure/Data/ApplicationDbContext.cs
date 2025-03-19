using Microsoft.EntityFrameworkCore;
using Chat_application_backend.src.ChatApplication.Core.Entities;

namespace Chat_application_backend.src.ChatApplication.Infrastructure.Data;
/// <summary>
/// Database context for the application.
/// </summary>
public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<ChatMessage> ChatMessages { get; set; }
    public DbSet<FileMetadata> Files { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
}