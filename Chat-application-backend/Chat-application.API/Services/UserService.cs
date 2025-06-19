using Chat_application.API.Interfaces;
using Chat_application.API.Models;

namespace Chat_application.API.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        // Implementation
        return await Task.FromResult<IEnumerable<User>>(new List<User>());
    }

    public async Task<User?> GetUserByIdAsync(string id)
    {
        // Implementation
        return await Task.FromResult<User?>(null);
    }

    public async Task<User?> CreateUserAsync(User user)
    {
        var existingUser = await _userRepository.GetUserByUsernameAsync(user.UserName);
        if (existingUser != null)
            return null;
        return await _userRepository.AddUserAsync(user);
    }

    public async Task<User?> LoginAsync(string username, string password)
    {
        // Implementation
        return await Task.FromResult<User?>(null);
    }
}