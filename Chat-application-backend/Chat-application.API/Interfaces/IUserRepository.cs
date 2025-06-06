using Chat_application.API.Models;

namespace Chat_application.API.Interfaces;

public interface IUserRepository
{
    Task<User> AddUserAsync(User user);
    Task<User> GetUserByUsernameAsync(string username);
    // Task<bool> DeleteUserAsync(Guid userId);
    Task<User?> AddUserAsync(User user);
    Task<User?> GetUserByUsernameAsync(string username);
    // ... other methods
}