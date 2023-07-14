
using SamsungService.Models;
using System.Collections.Generic;

namespace SamsungService.Repositories
{
    public interface IPaymentRepository
    {
        Payment GetPaymentById(int paymentId);
        IEnumerable<Payment> GetAllPayments();
        IEnumerable<Payment> SearchPaymentsByKeyword(string searchText);
        void UpdatePayment(int paymentId, Payment updatedPayment);
        void AddPayment(Payment payment);
        void DeletePayment(int paymentId);
    }
}

