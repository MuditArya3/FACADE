using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string? Name { get; set; }

    public string? Category { get; set; }

    public string? Description { get; set; }

    public int? Price { get; set; }

    public virtual ICollection<ServiceRequest> ServiceRequests { get; set; } = new List<ServiceRequest>();
}
