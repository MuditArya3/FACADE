using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamsungService.Models;
using SamsungService.Services;

namespace SamsungService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceIntController : ControllerBase
    {
        private readonly IServiceIntService _serviceIntService;

        public ServiceIntController(IServiceIntService serviceIntService)
        {
            _serviceIntService = serviceIntService;
        }

        [HttpPost]
        public IActionResult PostServiceInt([FromBody] ServiceIntegration service)
        {
            _serviceIntService.AddServiceInt(service);
            return Ok();
        }
    }
}
