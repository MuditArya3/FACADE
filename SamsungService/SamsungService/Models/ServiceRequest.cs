using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class ServiceRequest
{
    public int RequestId { get; set; }

    public int? CustomerId { get; set; }

    public int? ProductId { get; set; }

    public DateTime? RequestDate { get; set; }

    public string? Description { get; set; }

    public string? Status { get; set; }

}
