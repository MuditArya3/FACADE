using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamsungService.Models;
using SamsungService.Services;
using System;

namespace SamsungService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TechnicianController : ControllerBase
    {
        private readonly ITechnicianService _technicianService;

        public TechnicianController(ITechnicianService technicianService)
        {
            _technicianService = technicianService;
        }

        [HttpGet]
        [Route("Technician/{technicianId}")]
        public IActionResult GetTechnicianById(int technicianId)
        {
            try
            {
                var technician = _technicianService.GetTechnicianById(technicianId);

                if (technician != null)
                {
                    return Ok(technician);
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
        [Route("Technician")]
        public ActionResult<IEnumerable<Technician>> GetAllTechnicians()
        {
            var technician = _technicianService.GetAllTechnicians();

            if (technician.Count > 0)
            {
                return Ok(technician);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("Technician/search")]
        public IActionResult SearchTechnicians([FromQuery] string searchText)
        {
            var technician = _technicianService.SearchTechnicians(searchText);

            if (technician.Count > 0)
            {
                return Ok(technician);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("Technicians")]
        public IActionResult PostTechnician([FromBody] Technician technician)
        {
            try
            {
                _technicianService.AddTechnician(technician);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPut]
        [Route("Technician/{technicianId}")]
        public IActionResult UpdateTechnician(int technicianId, [FromBody] Technician updatedTechnician)
        {
            var technician = _technicianService.GetTechnicianById(technicianId);

            if (technician != null)
            {
                _technicianService.UpdateTechnician(technician, updatedTechnician);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("Technician/{technicianId}")]
        public IActionResult DeleteTechnician(int technicianId)
        {
            var technician = _technicianService.GetTechnicianById(technicianId);

            if (technician != null)
            {
                _technicianService.DeleteTechnician(technician);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
