using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class Technician
{
    public int TechnicianId { get; set; }

    public string? Name { get; set; }

    public decimal? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public string? Specialization { get; set; }

}
