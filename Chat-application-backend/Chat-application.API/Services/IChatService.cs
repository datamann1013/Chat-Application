using Chat_application.API.Models;


namespace Chat_application.API.Services
{
    public interface IChatService
    {
        Task<IEnumerable<ChatMessage>> GetAllMessagesAsync();
        Task<ChatMessage> SendMessageAsync(ChatMessage message);
    }
}
// MARK: Uses native ASP.NET Core DI and interface for service abstraction
