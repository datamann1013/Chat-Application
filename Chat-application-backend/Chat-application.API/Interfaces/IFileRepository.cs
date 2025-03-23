using Chat_application.API.Models;

namespace Chat_application.API.Interfaces;

public interface IFileRepository
{
    Task SaveFileAsync(FileMetadata file);
    Task<bool> DeleteFileAsync(Guid fileId);
}