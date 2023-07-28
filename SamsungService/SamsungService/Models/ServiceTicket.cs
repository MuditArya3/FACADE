using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class ServiceTicket
{
    public int TicketId { get; set; }

    public int? RequestId { get; set; }

    public int? TechnicianId { get; set; }

    public DateTime? TicketDate { get; set; }

    public string? TicketNotes { get; set; }

    public string? Status { get; set; }
}
