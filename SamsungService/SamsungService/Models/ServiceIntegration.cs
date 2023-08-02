using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class ServiceIntegration
{
    public int Id { get; set; }

    public string? ServiceApiname { get; set; }

    public string? SwaggerFilePath { get; set; }

    public string? DomainUrl { get; set; }

    public string? ServiceName { get; set; }

    public string? Description { get; set; }

    public string? ServiceJson { get; set; }

    public int? AudienceType { get; set; }
}
