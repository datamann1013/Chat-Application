using Microsoft.AspNetCore.Identity;

namespace Chat_application.API.Models;

public class User : IdentityUser<Guid>
{
    // Add any custom properties here if needed
}