using Chat_application.API.Data;
using Chat_application.API.Interfaces;
using Chat_application.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Chat_application.API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;
    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User?> AddUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User?> GetUserByUsernameAsync(string username)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
    }
    public async Task<bool> DeleteUserAsync(Guid userId)
    {
        // Implementation
        return await Task.FromResult(false);
    }
}