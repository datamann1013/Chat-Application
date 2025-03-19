using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;

namespace Chat_application_backend.src.ChatApplication.Core.Infrastructure
{
    /// <summary>
    /// Defines operations for file storage.
    /// </summary>
    public interface IFileRepository
    {
        Task SaveFileAsync(FileMetadata file);
    }
}