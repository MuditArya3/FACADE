using SamsungService.Models;
using SamsungService.Repositories;

namespace SamsungService.Services
{
    public class InvoiceService: IInvoiceService
        {
            private readonly IInvoiceRepository _invoiceRepository;

            public InvoiceService(IInvoiceRepository invoiceRepository)
            {
                _invoiceRepository = invoiceRepository;
            }

            public Invoice GetInvoiceById(int invoiceId)
            {
                return _invoiceRepository.GetInvoiceById(invoiceId);
            }

            public List<Invoice> GetAllInvoices()
            {
                return _invoiceRepository.GetAllInvoices();
            }

            public List<Invoice> SearchInvoicesByStatus(string searchText)
            {
                return _invoiceRepository.SearchInvoicesByStatus(searchText);
            }

            public void UpdateInvoice(int invoiceId, Invoice updatedInvoice)
            {
                _invoiceRepository.UpdateInvoice(invoiceId, updatedInvoice);
            }

            public void AddInvoice(Invoice invoice)
            {
                _invoiceRepository.AddInvoice(invoice);
            }

            public void DeleteInvoice(int invoiceId)
            {
                _invoiceRepository.DeleteInvoice(invoiceId);
            }
        }
    }
