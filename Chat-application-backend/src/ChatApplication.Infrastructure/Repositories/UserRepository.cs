using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Interfaces;
using Chat_application_backend.src.ChatApplication.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Chat_application_backend.src.ChatApplication.Infrastructure.Repositories

{// <summary>
    /// Implements user repository using Entity Framework.
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}