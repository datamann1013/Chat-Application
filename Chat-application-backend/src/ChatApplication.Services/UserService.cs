using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Interfaces;

namespace Chat_application_backend.src.ChatApplication.Services;

/// <summary>
/// Handles user-related operations such as registration and login.
/// </summary>
public class UserService
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserService> _logger;

    public UserService(IUserRepository userRepository, ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    /// <summary>
    /// Registers a new user in the system.
    /// </summary>
    public async Task<User> RegisterUser(User user)
    {
        // Placeholder logic: The real implementation will hash the password
        return await _userRepository.AddUserAsync(user);
    }

    /// <summary>
    /// Handles user login and returns user info if successful.
    /// </summary>
    public async Task<User> Login(string username, string password)
    {
        // Placeholder logic: Validate the password in the actual implementation
        return await _userRepository.GetUserByUsernameAsync(username);
    }
}