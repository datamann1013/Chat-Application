using Xunit;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Chat_application_backend.tests.ChatApplication.IntegrationTests;
using Newtonsoft.Json;
using Chat_application_backend.src.ChatApplication.Api;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using FluentAssertions;

namespace Chat_application_backend.tests.ChatApplication.IntegrationTests.Controllers
{
    public class UserControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public UserControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task RegisterUser_ShouldReturnOk_WhenValid()
        {
            // Arrange
            var user = new { Username = "testuser", Email = "test@example.com", Password = "password123" };
            var content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/api/users/register", content);

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}
