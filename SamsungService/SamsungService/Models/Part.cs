using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class Part
{
    public int PartId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? Price { get; set; }

    public int? QuantityAvailable { get; set; }
}
