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
            var store = new Mock<IUserStore<User>>();
            var userManager = new Mock<UserManager<User>>(
                store.Object,
                null, null, null, null, null, null, null, null);
            var contextAccessor = new Mock<Microsoft.AspNetCore.Http.IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<User>>();
            var signInManager = new Mock<SignInManager<User>>(
                userManager.Object,
                contextAccessor.Object,
                userPrincipalFactory.Object,
                null, null, null, null, null);
            userManager.Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            var controller = new AuthController(userManager.Object, signInManager.Object);
            var result = await controller.Register(new RegisterRequest { Username = "test", Email = "test@test.com", Password = "Password123!" });
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task Login_ReturnsOk_WhenLoginSucceeds()
        {
            var store = new Mock<IUserStore<User>>();
            var userManager = new Mock<UserManager<User>>(
                store.Object,
                null, null, null, null, null, null, null, null);
            var contextAccessor = new Mock<Microsoft.AspNetCore.Http.IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<User>>();
            var options = new Mock<Microsoft.Extensions.Options.IOptions<IdentityOptions>>();
            var logger = new Mock<Microsoft.Extensions.Logging.ILogger<SignInManager<User>>>();
            var schemes = new Mock<Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider>();
            var confirmation = new Mock<IUserConfirmation<User>>();
            var signInManager = new SignInManager<User>(
                userManager.Object,
                contextAccessor.Object,
                userPrincipalFactory.Object,
                options.Object,
                logger.Object,
                schemes.Object,
                confirmation.Object);
            var signInManagerMock = new Mock<SignInManager<User>>(
                userManager.Object,
                contextAccessor.Object,
                userPrincipalFactory.Object,
                options.Object,
                logger.Object,
                schemes.Object,
                confirmation.Object);
            signInManagerMock.Setup(x => x.PasswordSignInAsync(It.IsAny<string>(), It.IsAny<string>(), false, false))
                .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success);
            var controller = new AuthController(userManager.Object, signInManagerMock.Object);
            var result = await controller.Login(new LoginRequest { Username = "test", Password = "Password123!" });
            Assert.IsType<OkResult>(result);
        }
    }
}
