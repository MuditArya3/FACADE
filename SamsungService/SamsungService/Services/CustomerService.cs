
using SamsungService.Models;
using SamsungService.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SamsungService.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public Customer GetCustomerById(int customerId)
        {
            return _customerRepository.GetCustomerById(customerId);
        }

        public List<Customer> GetAllCustomers()
        {
            return _customerRepository.GetAllCustomers();
        }

        public List<Customer> SearchCustomers(string searchText)
        {
            return _customerRepository.SearchCustomers(searchText);
        }

        public void AddCustomer(Customer customer)
        {
            _customerRepository.AddCustomer(customer);
        }

        public void UpdateCustomer(Customer existingCustomer, Customer updatedCustomer)
        {
            existingCustomer.Name = updatedCustomer.Name;
            existingCustomer.Email = updatedCustomer.Email;
            existingCustomer.Address = updatedCustomer.Address;
            existingCustomer.PhoneNumber = updatedCustomer.PhoneNumber;

            _customerRepository.UpdateCustomer(existingCustomer);
        }

        public void DeleteCustomer(Customer customer)
        {
            _customerRepository.DeleteCustomer(customer);
        }
    }
}
