using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class Server
{
    public string? MemberName { get; set; }

    public string? MemberCode { get; set; }

    public string? SiteName { get; set; }

    public string? SiteCode { get; set; }

    public int? SiteId { get; set; }

    public string? ResourceName { get; set; }

    public string? ResourceFriendlyName { get; set; }

    public string? Os { get; set; }

    public string? OsVersion { get; set; }

    public string ServiceIdServer { get; set; } = null!;

    public int Antivirus { get; set; }

    public bool? IsNas { get; set; }

    public bool? IsSso { get; set; }

    public string LastDownTime { get; set; } = null!;

    public bool? IsBdronly { get; set; }

    public int? Ssomc { get; set; }

    public int IsDormant { get; set; }

    public int? CriticalUpdates { get; set; }

    public int SecUpdatesNx { get; set; }

    public string? SecurityUpdates { get; set; }

    public int? AddedToLmifavourite { get; set; }

    public int? RegId { get; set; }

    public string ResType { get; set; } = null!;

    public string? SiteSubCode { get; set; }

    public string? LowDiskSpace { get; set; }

    public string? ApplicationMonitoring { get; set; }
}
