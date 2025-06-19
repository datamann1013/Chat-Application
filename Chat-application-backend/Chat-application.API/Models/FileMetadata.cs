namespace Chat_application.API.Models;

public class FileMetadata
{
    public Guid Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public Guid OwnerId { get; set; }
}