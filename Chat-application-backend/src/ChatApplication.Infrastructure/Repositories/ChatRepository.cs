using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Infrastructure;
using Chat_application_backend.src.ChatApplication.Infrastructure.Data;

namespace Chat_application_backend.src.ChatApplication.Infrastructure.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly ApplicationDbContext _context;

        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SaveMessageAsync(ChatMessage message)
        {
            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();
        }
    }
}
