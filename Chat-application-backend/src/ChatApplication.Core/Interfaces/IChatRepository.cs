using System.Collections.Generic;
using System.Threading.Tasks;
using Chat_application_backend.src.ChatApplication.Core.Entities;

namespace Chat_application_backend.src.ChatApplication.Core.Infrastructure
{
    /// <summary>
    /// Defines operations for chat messages.
    /// </summary>
    public interface IChatRepository
    {
        Task SaveMessageAsync(ChatMessage message);
    }
}
