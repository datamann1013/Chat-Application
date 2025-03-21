using System;

namespace Chat_application_backend.src.ChatApplication.Core.Entities
{
    /// <summary>
    /// Represents metadata for a shared file.
    /// </summary>
    public class FileMetadata
    {
        public Guid Id { get; set; } // Unique file ID
        public string FileName { get; set; } // Name of the file
        public Guid OwnerId { get; set; } // User who uploaded it

        // Path to the file in storage
        // public string FilePath { get; set; }

        // File upload date
        // public DateTime UploadedAt { get; set; }
    }
}
