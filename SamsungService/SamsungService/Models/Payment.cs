using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? InvoiceId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public int? Amount { get; set; }

    public string? PaymentMethod { get; set; }

    public int? TransactionId { get; set; }

    public virtual Invoice? Invoice { get; set; }
}
