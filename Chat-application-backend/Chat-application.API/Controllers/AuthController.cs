using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Chat_application.API.Models;

namespace Chat_application.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = new User { UserName = request.Username, Email = request.Email };
            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);
                if (!result.Succeeded)
                    return Unauthorized();
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login exception: {ex.Message}\n{ex.StackTrace}");
                return Unauthorized();
            }
        }
    }
}
// MARK: Uses native ASP.NET Core Identity for authentication
