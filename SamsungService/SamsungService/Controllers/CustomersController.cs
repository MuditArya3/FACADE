using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamsungService.Models;
using SamsungService.Services;

namespace SamsungService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        [Route("Customers/{customerId}")]
        public ActionResult<Customer> GetCustomerById(int customerId)
        {
            var customer = _customerService.GetCustomerById(customerId);

            if (customer != null)
            {
                return Ok(customer);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("Customers")]
        public ActionResult<IEnumerable<Customer>> GetAllCustomers()
        {
            var customers = _customerService.GetAllCustomers();

            if (customers.Count > 0)
            {
                return Ok(customers);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("Customers/search")]
        public IActionResult SearchCustomers([FromQuery] string searchText)
        {
            var customers = _customerService.SearchCustomers(searchText);

            if (customers.Count > 0)
            {
                return Ok(customers);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("Customers")]
        public IActionResult PostCustomer([FromBody] Customer customer)
        {
            _customerService.AddCustomer(customer);
            return Ok();
        }

        [HttpPut]
        [Route("Customers/{customerId}")]
        public IActionResult UpdateCustomer(int customerId, [FromBody] Customer updatedCustomer)
        {
            var customer = _customerService.GetCustomerById(customerId);

            if (customer != null)
            {
                _customerService.UpdateCustomer(customer, updatedCustomer);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("Customers/{customerId}")]
        public IActionResult DeleteCustomer(int customerId)
        {
            var customer = _customerService.GetCustomerById(customerId);

            if (customer != null)
            {
                _customerService.DeleteCustomer(customer);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
