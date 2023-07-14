using SamsungService.Models;
using SamsungService.Models;

namespace SamsungService.Repositories
{
    public interface ICustomerRepository
    {
        Customer GetCustomerById(int customerId);
        List<Customer> GetAllCustomers();
        List<Customer> SearchCustomers(string searchText);
        void AddCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        void DeleteCustomer(Customer customer);
    }
}
