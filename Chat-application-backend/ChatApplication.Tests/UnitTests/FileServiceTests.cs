using Xunit;
using Moq;
using ChatApplication.Services;

namespace Chat_application_backend.ChatApplication.Tests.UnitTests
{
    /// <summary>
    /// Unit tests for FileService.
    /// </summary>
    public class FileServiceTests
    {
        private readonly FileService _fileService;

        public FileServiceTests()
        {
            _fileService = new FileService();
        }

        [Fact]
        public void UploadFile_ShouldReturnFileId_WhenSuccessful()
        {
            // Arrange
            var userId = 1;
            var fileData = new byte[] { 1, 2, 3, 4 };

            // Act
            var fileId = _fileService.UploadFile(userId, fileData);

            // Assert
            Assert.NotNull(fileId);
        }

        [Fact]
        public void DeleteFile_ShouldReturnTrue_WhenFileExists()
        {
            // Arrange
            var fileId = "testFile123";

            // Act
            var result = _fileService.DeleteFile(fileId);

            // Assert
            Assert.True(result);
        }
    }
}