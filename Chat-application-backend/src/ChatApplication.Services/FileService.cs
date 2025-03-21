using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Interfaces;
namespace Chat_application_backend.src.ChatApplication.Services;

/// <summary>
/// Handles file-related operations such as uploads.
/// </summary>
public class FileService
{
    private readonly IFileRepository _fileRepository;

    public FileService(IFileRepository fileRepository)
    {
        _fileRepository = fileRepository;
    }

    /// <summary>
    /// Uploads a file and saves its metadata.
    /// </summary>
    public async Task UploadFile(FileMetadata file)
    {
        var fileMetadata = new FileMetadata
        {
            Id = file.Id,
            FileName = file.FileName,
            OwnerId = file.OwnerId
        };

        await _fileRepository.SaveFileAsync(fileMetadata);
    }
}