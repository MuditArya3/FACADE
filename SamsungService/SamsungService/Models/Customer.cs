using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class Customer
{
    public int CustomerId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public int? PhoneNumber { get; set; }

    public string? Address { get; set; }

}
