using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class Invoice
{
    public int InvoiceId { get; set; }

    public int? CustomerId { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public DateTime? DueDate { get; set; }

    public int? TotalAmount { get; set; }

    public string? Status { get; set; }


}
