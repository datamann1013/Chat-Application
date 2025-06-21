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
        await _fileRepository.SaveFileAsync(file);
    }

    public async Task<bool> DeleteFile(Guid fileId)
    {
        return await _fileRepository.DeleteFileAsync(fileId);
    }
}