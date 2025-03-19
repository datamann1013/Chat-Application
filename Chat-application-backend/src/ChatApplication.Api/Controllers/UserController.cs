using Microsoft.AspNetCore.Mvc;

namespace Chat_application_backend.src.ChatApplication.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        // Constructor for dependency injection of UserService

        // POST: api/users/register
        // Registers a new user with hashed password
        // Validates input, checks for duplicate users

        // POST: api/users/login
        // Authenticates a user with username/password
        // Returns JWT token if successful

        // GET: api/users/{id}
        // Retrieves user profile details
        // Only accessible by authorized users
    }
}