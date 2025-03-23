using Chat_application.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Chat_application.API.Data;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
    }

    // For example, a DbSet of users
    public DbSet<User> Users { get; set; }
}