
using SamsungService.Models;

namespace SamsungService.Services
{
    public interface IInvoiceService
    {
        Invoice GetInvoiceById(int invoiceId);
        List<Invoice> GetAllInvoices();
        List<Invoice> SearchInvoicesByStatus(string searchText);
        void UpdateInvoice(int invoiceId, Invoice updatedInvoice);
        void AddInvoice(Invoice invoice);
        void DeleteInvoice(int invoiceId);
    }
}
