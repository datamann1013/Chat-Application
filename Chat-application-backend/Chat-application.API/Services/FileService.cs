using Chat_application.API.Interfaces;
using Chat_application.API.Models;

namespace Chat_application.API.Services;

public class FileService
{
    private readonly IFileRepository _fileRepository;

    public FileService(IFileRepository fileRepository)
    {
        _fileRepository = fileRepository;
    }

    public async Task UploadFile(FileMetadata file)
    {
        // Implementation
        await Task.CompletedTask;
    }

    public async Task<bool> DeleteFile(Guid fileId)
    {
        // Implementation
        return await Task.FromResult(false);
    }
}