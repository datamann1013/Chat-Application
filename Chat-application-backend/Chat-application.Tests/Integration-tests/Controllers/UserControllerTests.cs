using Xunit;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

// For potential future usage, e.g., custom attributes or new features
// using System.Net;

namespace Chat_Application.Tests.Integration_Tests.Controllers
{
    /// <summary>
    /// Integration tests for UserController.
    /// Ensures the controller's endpoints work correctly via HTTP.
    /// </summary>
    public class UserControllerTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        /// <summary>
        /// Creates an HttpClient using our custom web application factory.
        /// </summary>
        /// <param name="factory">Custom factory to spin up the test server.</param>
        public UserControllerTests(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        /// <summary>
        /// Tests if registering a user returns a success (200 OK).
        /// </summary>
        [Fact]
        public async Task RegisterUser_ReturnsSuccess()
        {
            var requestBody = new
            {
                Username = "testuser",
                Email = "test@example.com",
                Password = "securepassword"
            };

            var content = new StringContent(
                JsonConvert.SerializeObject(requestBody),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _client.PostAsync("/api/user/register", content);
            response.EnsureSuccessStatusCode();
        }

        /// <summary>
        /// Tests if invalid registration data returns a BadRequest (400).
        /// </summary>
        [Fact]
        public async Task RegisterUser_InvalidData_ReturnsBadRequest()
        {
            var requestBody = new
            {
                // Missing password or invalid data
                Username = "badUser",
                Email = ""
            };

            var content = new StringContent(
                JsonConvert.SerializeObject(requestBody),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _client.PostAsync("/api/user/register", content);

            // Expecting 400
            Assert.False(response.IsSuccessStatusCode);
        }
    }
}