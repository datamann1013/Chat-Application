using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Infrastructure;
using Chat_application_backend.src.ChatApplication.Infrastructure.Data;

namespace Chat_application_backend.src.ChatApplication.Infrastructure.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly ApplicationDbContext _context;

        public FileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SaveFileAsync(FileMetadata file)
        {
            _context.Files.Add(file);
            await _context.SaveChangesAsync();
        }
    }
}
