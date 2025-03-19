using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;

namespace Chat_application_backend.src.ChatApplication.Core.Infrastructure
{
    /// <summary>
    /// Defines operations for user management.
    /// </summary>
    public interface IUserRepository
    {
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> AddUserAsync(User user);
    }
}
