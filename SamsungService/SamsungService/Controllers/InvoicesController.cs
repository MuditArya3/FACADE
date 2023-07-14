using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamsungService.Models;
using SamsungService.Services;
using System;
using System.Collections.Generic;

namespace SamsungService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoicesController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet]
        [Route("Invoice/{invoiceId}")]
        public ActionResult<Invoice> GetInvoiceById(int invoiceId)
        {
            try
            {
                var invoice = _invoiceService.GetInvoiceById(invoiceId);

                if (invoice != null)
                {
                    return Ok(invoice);
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
        [Route("Invoices")]
        public ActionResult<IEnumerable<Invoice>> GetInvoices()
        {
            try
            {
                var invoices = _invoiceService.GetAllInvoices();

                if (invoices != null)
                {
                    return Ok(invoices);
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
        [Route("Invoices/search")]
        public IActionResult SearchInvoices([FromQuery] string searchText)
        {
            try
            {
                var invoices = _invoiceService.SearchInvoicesByStatus(searchText);

                if (invoices.Count > 0)
                {
                    return Ok(invoices);
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
        [Route("Invoices/{invoiceId}")]
        public IActionResult UpdateInvoice(int invoiceId, [FromBody] Invoice updatedInvoice)
        {
            try
            {
                _invoiceService.UpdateInvoice(invoiceId, updatedInvoice);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("Invoices")]
        public IActionResult PostInvoices([FromBody] Invoice invoice)
        {
            try
            {
                _invoiceService.AddInvoice(invoice);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        [Route("Invoices/{invoiceId}")]
        public IActionResult DeleteInvoice(int invoiceId)
        {
            try
            {
                _invoiceService.DeleteInvoice(invoiceId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
