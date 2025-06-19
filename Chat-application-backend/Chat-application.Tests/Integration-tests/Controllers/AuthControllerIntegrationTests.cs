using System.Net.Http.Json;
using System.Threading.Tasks;
using Chat_application.API;
using Xunit;
using Chat_application.API.Models;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Chat_application.Tests.Integration_tests.Controllers
{
    public class AuthControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public AuthControllerIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Register_And_Login_Success()
        {
            var register = new RegisterRequest { Username = "integrationuser", Email = "integration@test.com", Password = "Password123!" };
            var regResponse = await _client.PostAsJsonAsync("/api/auth/register", register);
            regResponse.EnsureSuccessStatusCode();

            var login = new LoginRequest { Username = "integrationuser", Password = "Password123!" };
            var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", login);
            loginResponse.EnsureSuccessStatusCode();
        }
    }
}

