using SamsungService.Models;
using System.Collections.Generic;
using System.Linq;

namespace SamsungService.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly SamsungContext _samsungContext;

        public PaymentRepository(SamsungContext samsungContext)
        {
            _samsungContext = samsungContext;
        }

        public Payment GetPaymentById(int paymentId)
        {
            return _samsungContext.Payments.FirstOrDefault(c => c.PaymentId == paymentId);
        }

        public IEnumerable<Payment> GetAllPayments()
        {
            return _samsungContext.Payments.ToList();
        }

        public IEnumerable<Payment> SearchPaymentsByKeyword(string searchText)
        {
            return _samsungContext.Payments
                .Where(c => c.PaymentId.ToString().Contains(searchText) || c.TransactionId.ToString().Contains(searchText) || c.InvoiceId.ToString().Contains(searchText))
                .ToList();
        }

        public void UpdatePayment(int paymentId, Payment updatedPayment)
        {
            var payment = _samsungContext.Payments.FirstOrDefault(c => c.PaymentId == paymentId);

            if (payment != null)
            {
                payment.InvoiceId = updatedPayment.InvoiceId;
                payment.PaymentDate = updatedPayment.PaymentDate;
                payment.Amount = updatedPayment.Amount;
                payment.PaymentMethod = updatedPayment.PaymentMethod;
                payment.TransactionId = updatedPayment.TransactionId;

                _samsungContext.SaveChanges();
            }
        }

        public void AddPayment(Payment payment)
        {
            _samsungContext.Payments.Add(payment);
            _samsungContext.SaveChanges();
        }

        public void DeletePayment(int paymentId)
        {
            var payment = _samsungContext.Payments.FirstOrDefault(c => c.PaymentId == paymentId);

            if (payment != null)
            {
                _samsungContext.Payments.Remove(payment);
                _samsungContext.SaveChanges();
            }
        }
    }
}
