using Chat_application.API.Interfaces;
using Chat_application.API.Models;

namespace Chat_application.API.Services;

public class ChatService
{
    private readonly IChatRepository _chatRepository;

    public ChatService(IChatRepository chatRepository)
    {
        _chatRepository = chatRepository;
    }

    public async Task SendMessage(ChatMessage message)
    {
        // Implementation
        await Task.CompletedTask;
    }

    public async Task<List<ChatMessage?>> GetMessages(Guid user1, Guid user2)
    {
        // Implementation
        return await Task.FromResult<List<ChatMessage>?>(null);
    }
}