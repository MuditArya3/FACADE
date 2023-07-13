using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamsungService.Models;
using SamsungService.Services;

namespace SamsungService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceTicketController : ControllerBase
    {

        private readonly IServiceTicketService _serviceticketService;

        public ServiceTicketController(IServiceTicketService serviceticketService)
        {
            _serviceticketService = serviceticketService;
        }

        [HttpGet]
        [Route("ServiceTicket/{ticketId}")]
        public ActionResult<ServiceTicket> GetTicketById(int ticketId)
        {
            try
            {
                var ticket = _serviceticketService.GetTicketById(ticketId);

                if (ticket != null)
                {
                    return Ok(ticket);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("ServiceTickets")]
        public ActionResult<IEnumerable<ServiceTicket>> GetTicket()
        {
            try
            {
                var tickets = _serviceticketService.GetAllTickets();

                if (tickets != null)
                {
                    return Ok(tickets);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("ServiceTicket/search")]
        public IActionResult SearchTickets([FromQuery] string searchText)
        {
            try
            {
                var tickets = _serviceticketService.SearchTicketByStatus(searchText);

                if (tickets.Count > 0)
                {
                    return Ok(tickets);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        [Route("ServiceTicket/{ticketId}")]
        public IActionResult UpdateTicket(int ticketId, [FromBody] ServiceTicket updatedTicket)
        {
            try
            {
                _serviceticketService.UpdateTicket(ticketId, updatedTicket);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("ServiceTicket")]
        public IActionResult PostTickets([FromBody] ServiceTicket ticket)
        {
            try
            {
                _serviceticketService.AddTicket(ticket);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        [Route("ServiceTicket/{ticketId}")]
        public IActionResult DeleteTicket(int ticketId)
        {
            try
            {
                _serviceticketService.DeleteTicket(ticketId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
