using SamsungService.Models;

namespace SamsungService.Services
{
    public interface IPaymentService
    {
        Payment GetPaymentById(int paymentId);
        IEnumerable<Payment> GetAllPayments();
        IEnumerable<Payment> SearchPaymentsByKeyword(string searchText);
        void UpdatePayment(int paymentId, Payment updatedPayment);
        void AddPayment(Payment payment);
        void DeletePayment(int paymentId);
    }
}
