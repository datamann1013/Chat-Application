using Chat_application.API.Interfaces;
using Chat_application.API.Models;

namespace Chat_application.API.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<User?> CreateUser(User user)
    {
        // Implementation
        return await Task.FromResult<User?>(null);
    }

    public async Task<User?> Login(string username, string password)
    {
        // Implementation
        return await Task.FromResult<User?>(null);
    }
}