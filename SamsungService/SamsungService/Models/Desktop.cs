using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class Desktop
{
    public string MemberCode { get; set; } = null!;

    public string? Sitecode { get; set; }

    public int? SiteId { get; set; }

    public string? ResourceName { get; set; }

    public string ResFriendlyName { get; set; } = null!;

    public string? Os { get; set; }

    public string? OsVerSion { get; set; }

    public int? Alive { get; set; }

    public string? SecurityUpdates { get; set; }

    public string? Regtype { get; set; }

    public int? DiskSpace { get; set; }

    public int? Antivirus { get; set; }

    public int? SmartDisk { get; set; }

    public int? Amt { get; set; }

    public string? MemberName { get; set; }

    public string? LoggedInUser { get; set; }

    public string LastLogin { get; set; } = null!;
}
