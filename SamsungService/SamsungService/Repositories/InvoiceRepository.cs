using SamsungService.Models;
using SamsungService.Models;

namespace SamsungService.Repositories
{
    public class InvoiceRepository:IInvoiceRepository
        {
            private readonly SamsungContext _samsungContext;

            public InvoiceRepository(SamsungContext samsungContext)
            {
                _samsungContext = samsungContext;
            }

            public Invoice GetInvoiceById(int invoiceId)
            {
                return _samsungContext.Invoices.FirstOrDefault(c => c.InvoiceId == invoiceId);
            }

            public List<Invoice> GetAllInvoices()
            {
                return _samsungContext.Invoices.ToList();
            }

            public List<Invoice> SearchInvoicesByStatus(string searchText)
            {
                return _samsungContext.Invoices.Where(c => c.Status.Contains(searchText)).ToList();
            }

            public void UpdateInvoice(int invoiceId, Invoice updatedInvoice)
            {
                var invoice = _samsungContext.Invoices.FirstOrDefault(c => c.InvoiceId == invoiceId);

                if (invoice != null)
                {
                    invoice.Status = updatedInvoice.Status;
                    invoice.CustomerId = updatedInvoice.CustomerId;
                    invoice.InvoiceDate = updatedInvoice.InvoiceDate;
                    invoice.DueDate = updatedInvoice.DueDate;
                    invoice.TotalAmount = updatedInvoice.TotalAmount;

                    _samsungContext.SaveChanges();
                }
            }

            public void AddInvoice(Invoice invoice)
            {
                _samsungContext.Invoices.Add(invoice);
                _samsungContext.SaveChanges();
            }

            public void DeleteInvoice(int invoiceId)
            {
                var invoice = _samsungContext.Invoices.FirstOrDefault(c => c.InvoiceId == invoiceId);

                if (invoice != null)
                {
                    _samsungContext.Invoices.Remove(invoice);
                    _samsungContext.SaveChanges();
                }
            }
        }
    }
