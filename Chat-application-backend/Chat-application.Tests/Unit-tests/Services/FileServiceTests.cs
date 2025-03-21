using Xunit;
using FluentAssertions;
using Moq;
using System;
using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Interfaces;
using Chat_application_backend.src.ChatApplication.Services;

namespace Chat_application.Tests.Unit_tests.Services
{
    public class FileServiceTests
    {
        private readonly Mock<IFileRepository> _fileRepositoryMock;
        private readonly FileService _fileService;

        public FileServiceTests()
        {
            _fileRepositoryMock = new Mock<IFileRepository>();
            _fileService = new FileService(_fileRepositoryMock.Object);
        }

        [Fact]
        public async Task UploadFile_ShouldSucceed_WhenFileIsValid()
        {
            // Arrange
            var fileMetadata = new FileMetadata { Id = Guid.NewGuid(), FileName = "test.txt", OwnerId = Guid.NewGuid() };
            _fileRepositoryMock.Setup(repo => repo.SaveFileAsync(It.IsAny<FileMetadata>())).Returns(Task.CompletedTask);

            // Act
            await _fileService.UploadFile(fileMetadata);

            // Assert
            _fileRepositoryMock.Verify(repo => repo.SaveFileAsync(It.IsAny<FileMetadata>()), Times.Once);
        }
    }
}