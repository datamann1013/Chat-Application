using Chat_application.API.Data;
using Chat_application.API.Interfaces;
using Chat_application.API.Models;

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
        // Implementation
        return await Task.FromResult<User?>(null);

    }

    public async Task<User?> GetUserByUsernameAsync(string username)
    {
       // Implementation
       return await Task.FromResult<User?>(null);

    }
    public async Task<bool> DeleteUserAsync(Guid userId)
    {
        // Implementation
        return await Task.FromResult(false);
    }
}