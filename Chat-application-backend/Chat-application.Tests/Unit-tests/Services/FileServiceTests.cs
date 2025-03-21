using Xunit;
using FluentAssertions;
using Moq;
using System;
using System.Threading.Tasks;

namespace Chat_Application.Tests.Unit_Tests.Services
{
    /// <summary>
    /// Unit tests for FileService, using Moq to mock IFileRepository.
    /// </summary>
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
            var fileMetadata = new FileMetadata
            {
                Id = Guid.NewGuid(),
                FileName = "test.txt",
                OwnerId = Guid.NewGuid()
            };

            _fileRepositoryMock.Setup(repo => repo.SaveFileAsync(It.IsAny<FileMetadata>()))
                .Returns(Task.CompletedTask);

            await _fileService.UploadFile(fileMetadata);

            _fileRepositoryMock.Verify(repo => repo.SaveFileAsync(It.IsAny<FileMetadata>()), Times.Once);
        }

        [Fact]
        public async Task DeleteFile_ShouldSucceed_WhenFileExists()
        {
            _fileRepositoryMock.Setup(repo => repo.DeleteFileAsync(It.IsAny<Guid>()))
                .ReturnsAsync(true);

            var result = await _fileService.DeleteFile(Guid.NewGuid());
            result.Should().BeTrue();
        }
    }
}