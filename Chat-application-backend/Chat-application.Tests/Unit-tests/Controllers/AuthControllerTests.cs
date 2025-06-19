using Xunit;
using Moq;
using Microsoft.AspNetCore.Identity;
using Chat_application.API.Controllers;
using Chat_application.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Chat_application.Tests.Controllers
{
    public class AuthControllerTests
    {
        [Fact]
        public async Task Register_ReturnsOk_WhenRegistrationSucceeds()
        {
            var userManager = new Mock<UserManager<User>>(MockBehavior.Default, null, null, null, null, null, null, null, null);
            var signInManager = new Mock<SignInManager<User>>(userManager.Object, null, null, null, null, null, null, null);
            userManager.Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            var controller = new AuthController(userManager.Object, signInManager.Object);
            var result = await controller.Register(new RegisterRequest { Username = "test", Email = "test@test.com", Password = "Password123!" });
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task Login_ReturnsOk_WhenLoginSucceeds()
        {
            var userManager = new Mock<UserManager<User>>(MockBehavior.Default, null, null, null, null, null, null, null, null);
            var signInManager = new Mock<SignInManager<User>>(userManager.Object, null, null, null, null, null, null, null);
            signInManager.Setup(x => x.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), false, false))
                .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success);
            var controller = new AuthController(userManager.Object, signInManager.Object);
            var result = await controller.Login(new LoginRequest { Username = "test", Password = "Password123!" });
            Assert.IsType<OkResult>(result);
        }
    }
}

