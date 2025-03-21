using Microsoft.AspNetCore.Mvc;

namespace Chat_application_backend.src.ChatApplication.Api.Controllers
{
    [ApiController]
    [Route("api/files")]
    public class FileController : ControllerBase
    {
        // Constructor for dependency injection of FileService

        // POST: api/files/upload
        // Allows a user to upload a file
        // Enforces storage limits

        // GET: api/files/download/{fileId}
        // Allows a user to download a file
        // Validates access permissions

        // DELETE: api/files/delete/{fileId}
        // Deletes a file uploaded by the user
        // Ensures proper permission checks
    }
}
