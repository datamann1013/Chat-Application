using Chat_application.API.Models;

namespace Chat_application.API.Interfaces;

public interface IChatRepository
{
    Task SaveMessageAsync(ChatMessage message);
    Task<List<ChatMessage>> GetMessagesAsync(Guid user1, Guid user2);
}