using Chat_application.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chat_application.API.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(string id);
        Task<User?> CreateUserAsync(User user);
        Task<User?> LoginAsync(string username, string password);
    }
}
// MARK: Service abstraction for user operations
