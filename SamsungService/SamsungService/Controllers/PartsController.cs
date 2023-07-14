using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamsungService.Services;
using SamsungService.Models;
using System;
using System.Collections.Generic;

namespace SamsungService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IPartService _partService;

        public PartsController(IConfiguration configuration, IPartService partService)
        {
            _configuration = configuration;
            _partService = partService;
        }

        [HttpGet]
        [Route("Parts/{partId}")]
        public ActionResult<IEnumerable<Part>> GetPartById(int partId)
        {
            try
            {
                var part = _partService.GetPartById(partId);

                if (part != null)
                {
                    return Ok(part);
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
        [Route("Parts")]
        public ActionResult<IEnumerable<Part>> GetParts()
        {
            try
            {
                var parts = _partService.GetAllParts();

                if (parts != null)
                {
                    return Ok(parts);
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
        [Route("Parts/search")]
        public IActionResult SearchParts([FromQuery] string searchText)
        {
            try
            {
                var parts = _partService.SearchPartsByNameOrDescription(searchText);

                if (parts.Count > 0)
                {
                    return Ok(parts);
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
        [Route("Parts/{partId}")]
        public IActionResult UpdatePart(int partId, [FromBody] Part updatedPart)
        {
            try
            {
                _partService.UpdatePart(partId, updatedPart);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("Parts")]
        public IActionResult PostParts([FromBody] Part part)
        {
            try
            {
                _partService.AddPart(part);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        [Route("Parts/{partId}")]
        public IActionResult DeletePart(int partId)
        {
            try
            {
                _partService.DeletePart(partId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
