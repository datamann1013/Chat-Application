using Xunit;
using System.Text;
using Chat_application_backend.Tests.ChatApplication.IntegrationTests;
using Newtonsoft.Json;


namespace Chat_application.Tests.Integration_tests.Controllers
{
    /// <summary>
    /// Integration tests for UserController.
    /// </summary>
    public class UserControllerTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public UserControllerTests(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task RegisterUser_ReturnsSuccess()
        {
            var requestBody = new
                { Username = "testuser", Email = "test@example.com", Password = "securepassword" };
            var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8,
                "application/json");

            var response = await _client.PostAsync("/api/user/register", content);

            response.EnsureSuccessStatusCode();
        }
    }
       
}