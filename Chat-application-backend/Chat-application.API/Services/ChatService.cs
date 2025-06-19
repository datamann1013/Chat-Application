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
        await _chatRepository.SaveMessageAsync(message);
    }

    public async Task<List<ChatMessage>?> GetMessages(Guid user1, Guid user2)
    {
        return await _chatRepository.GetMessagesAsync(user1, user2);
    }
}