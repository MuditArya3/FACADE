
using SamsungService.Models;

namespace SamsungService.Services
{
    public interface ICustomerService
    {
        Customer GetCustomerById(int customerId);
        List<Customer> GetAllCustomers();
        List<Customer> SearchCustomers(string searchText);
        void AddCustomer(Customer customer);
        void UpdateCustomer(Customer existingCustomer, Customer updatedCustomer);
        void DeleteCustomer(Customer customer);
    }
}
