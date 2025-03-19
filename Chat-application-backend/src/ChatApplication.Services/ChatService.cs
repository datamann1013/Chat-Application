using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;
using Chat_application_backend.src.ChatApplication.Core.Interfaces;
using Renci.SshNet.Messages;

namespace Chat_application_backend.src.ChatApplication.Services
{
    /// <summary>
    /// Manages chat-related functionalities.
    /// </summary>
    public class ChatService
    {
        private readonly IChatRepository _chatRepository;

        public ChatService(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        /// <summary>
        /// Sends a chat message from one user to another.
        /// </summary>
        public async Task SendMessage(ChatMessage obj)
        {
            var message = new ChatMessage
            {
                SenderId = obj.SenderId,
                ReceiverId = obj.ReceiverId,
                Content = obj.Content,
                Timestamp = DateTime.UtcNow
            };

            await _chatRepository.SaveMessageAsync(message);
        }
    }
}