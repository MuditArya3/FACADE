using SamsungService.Models;
using SamsungService.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace SamsungService.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public Payment GetPaymentById(int paymentId)
        {
            return _paymentRepository.GetPaymentById(paymentId);
        }

        public IEnumerable<Payment> GetAllPayments()
        {
            return _paymentRepository.GetAllPayments();
        }

        public IEnumerable<Payment> SearchPaymentsByKeyword(string searchText)
        {
            return _paymentRepository.SearchPaymentsByKeyword(searchText);
        }

        public void UpdatePayment(int paymentId, Payment updatedPayment)
        {
            _paymentRepository.UpdatePayment(paymentId, updatedPayment);
        }

        public void AddPayment(Payment payment)
        {
            _paymentRepository.AddPayment(payment);
        }

        public void DeletePayment(int paymentId)
        {
            _paymentRepository.DeletePayment(paymentId);
        }
    }
}
