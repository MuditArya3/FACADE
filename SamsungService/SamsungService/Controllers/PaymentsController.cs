using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamsungService.Models;

namespace SamsungService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SamsungContext samsungContext;

        public PaymentsController(IConfiguration configuration, SamsungContext samsungContext)
        {
            _configuration = configuration;
            this.samsungContext = samsungContext;
        }

        [HttpGet]
        [Route("Payment/{paymentId}")]
        public ActionResult<IEnumerable<Payment>> GetPaymentById(int paymentId)
        {
            try
            {
                var payment = samsungContext.Payments.FirstOrDefault(c => c.PaymentId == paymentId);

                if (payment != null)
                {
                    return Ok(payment);
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
        [Route("Payments")]
        public ActionResult <IEnumerable<Payment>> GetPayments()
        {
            try
            {
                var payment = samsungContext.Payments.ToList();

                if (payment != null)
                {
                    return Ok(payment);
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
        [Route("Patments/search")]
        public IActionResult SearchPayments([FromQuery] int searchText)
        {
            try
            {
                var payment = samsungContext.Payments
                    .Where(c => c.PaymentId.ToString().Contains(searchText.ToString()) || c.TransactionId.ToString().Contains(searchText.ToString()) || c.InvoiceId.ToString().Contains(searchText.ToString()))
                    .ToList();

                if (payment.Count > 0)
                {
                    return Ok(payment);
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
        [Route("Payments/{paymentId}")]
        public IActionResult UpdatePayment(int paymenId, [FromBody] Payment updatedPayment)
        {
            try
            {
                var payment = samsungContext.Payments.FirstOrDefault(c => c.PaymentId == paymenId);

                if (payment != null)
                {
                    payment.InvoiceId = updatedPayment.InvoiceId;
                    payment.PaymentDate = updatedPayment.PaymentDate;
                    payment.Amount = updatedPayment.Amount;
                    payment.PaymentMethod = updatedPayment.PaymentMethod;
                    payment.TransactionId = updatedPayment.TransactionId;

                    samsungContext.SaveChanges();
                    return Ok();
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
        [HttpPost]
        [Route("Payments")]
        public IActionResult PostPayments([FromBody] Payment payment)
        {
            try
            {
                samsungContext.Payments.Add(payment);
                samsungContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        [Route("Payments/{paymentId}")]
        public IActionResult DeletePayment(int paymentId)
        {
            try
            {
                var payment = samsungContext.Payments.FirstOrDefault(c => c.PaymentId == paymentId);

                if (payment != null)
                {
                    samsungContext.Payments.Remove(payment);
                    samsungContext.SaveChanges();
                    return Ok();
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
    }
}
