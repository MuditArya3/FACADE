
using SamsungService.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SamsungService.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly SamsungContext _samsungContext;

        public CustomerRepository(SamsungContext samsungContext)
        {
            _samsungContext = samsungContext;
        }

        public Customer GetCustomerById(int customerId)
        {
            return _samsungContext.Customers.FirstOrDefault(c => c.CustomerId == customerId);
        }

        public List<Customer> GetAllCustomers()
        {
            return _samsungContext.Customers.ToList();
        }

        public List<Customer> SearchCustomers(string searchText)
        {
            return _samsungContext.Customers
                .Where(c => c.Name.Contains(searchText) || c.Email.Contains(searchText) || c.Address.Contains(searchText))
                .ToList();
        }

        public void AddCustomer(Customer customer)
        {
            _samsungContext.Customers.Add(customer);
            _samsungContext.SaveChanges();
        }

        public void UpdateCustomer(Customer customer)
        {
            _samsungContext.SaveChanges();
        }

        public void DeleteCustomer(Customer customer)
        {
            _samsungContext.Customers.Remove(customer);
            _samsungContext.SaveChanges();
        }
    }
}
