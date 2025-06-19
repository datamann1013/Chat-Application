using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Chat_application.API.Models;
using Chat_application.API.Services;

namespace Chat_application.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet("messages")] // Get all messages
        public async Task<IActionResult> GetMessages()
        {
            var messages = await _chatService.GetAllMessagesAsync();
            return Ok(messages);
        }

        [HttpPost("send")] // Send a message
        public async Task<IActionResult> SendMessage([FromBody] ChatMessage message)
        {
            var result = await _chatService.SendMessageAsync(message);
            return Ok(result);
        }
    }
}
// MARK: Uses native ASP.NET Core Controller and DI
