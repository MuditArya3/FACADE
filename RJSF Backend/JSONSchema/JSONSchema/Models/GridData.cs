using System;
using System.Collections.Generic;

namespace JSONSchema.Models;

public partial class GridData
{
    public int? Id { get; set; }

    public int? PostId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Body { get; set; }
}
