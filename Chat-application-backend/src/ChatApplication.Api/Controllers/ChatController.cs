using Microsoft.AspNetCore.Mvc;

namespace Chat_application_backend.src.ChatApplication.Api.Controllers
{
    [ApiController]
    [Route("api/chats")]
    public class ChatController : ControllerBase
    {
        // Constructor for dependency injection of ChatService

        // POST: api/chats/send
        // Sends a chat message from one user to another
        // Message is stored in the database and broadcasted

        // GET: api/chats/history/{userId}
        // Retrieves chat history between two users
        // Uses pagination for efficiency
    }
}
