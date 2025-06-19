using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Chat_application.API.Models;

namespace Chat_application.API.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
// MARK: Uses native ASP.NET Core SignalR
