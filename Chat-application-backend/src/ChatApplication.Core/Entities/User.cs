using System;

namespace Chat_application_backend.src.ChatApplication.Core.Entities
{
    /// <summary>
    /// Represents a user in the system.
    /// </summary>
    public class User
    {
        public Guid Id { get; set; } // Unique identifier for the user
        public string Username { get; set; } // Username for login
        public string Email { get; set; } // Email address
        public string PasswordHash { get; set; } // Hashed password
    }
}
