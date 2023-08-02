using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class UserInfo
{
    public int? UserId { get; set; }

    public int? MemberId { get; set; }

    public string MemberName { get; set; } = null!;

    public string? MemberCode { get; set; }

    public string? Fname { get; set; }

    public string? EmailId { get; set; }

    public string? Mcountry { get; set; }

    public int? FreezeStatus { get; set; }

    public bool? IsSso { get; set; }

    public int? SiteId { get; set; }

    public string Locked { get; set; } = null!;

    public DateTime ExpDate { get; set; }

    public int? ExpDays { get; set; }

    public int? RemainingDays { get; set; }
}
