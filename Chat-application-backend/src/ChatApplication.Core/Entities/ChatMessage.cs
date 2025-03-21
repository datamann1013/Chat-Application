using System;

namespace Chat_application_backend.src.ChatApplication.Core.Entities
{
    /// <summary>
    /// Represents a chat message between users.
    /// </summary>
    public class ChatMessage
    {
        public Guid Id { get; set; } // Unique identifier for the message
        public Guid SenderId { get; set; } // ID of the sender
        public Guid ReceiverId { get; set; } // ID of the receiver
        public string Content { get; set; } // Message content
        public DateTime Timestamp { get; set; } // When the message was sent
    }
}
