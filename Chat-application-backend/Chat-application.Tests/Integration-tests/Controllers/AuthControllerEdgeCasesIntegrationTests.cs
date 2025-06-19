using System.Net.Http.Json;
using Chat_application.API;
using Chat_application.API.Models;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Chat_Application.Tests.Integration_Tests.Controllers
{
    public class AuthControllerEdgeCasesIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public AuthControllerEdgeCasesIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Register_DuplicateUser_ReturnsBadRequest()
        {
            var register = new RegisterRequest { Username = "dupuser", Email = "dup@test.com", Password = "Password123!" };
            var regResponse1 = await _client.PostAsJsonAsync("/api/auth/register", register);
            regResponse1.EnsureSuccessStatusCode();
            var regResponse2 = await _client.PostAsJsonAsync("/api/auth/register", register);
            Assert.False(regResponse2.IsSuccessStatusCode);
        }

        [Fact]
        public async Task Login_InvalidCredentials_ReturnsUnauthorized()
        {
            var login = new LoginRequest { Username = "notarealuser", Password = "wrongpass" };
            var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", login);
            Assert.Equal(System.Net.HttpStatusCode.Unauthorized, loginResponse.StatusCode);
        }
    }
}

