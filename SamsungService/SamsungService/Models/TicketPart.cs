using System;
using System.Collections.Generic;

namespace SamsungService.Models;

public partial class TicketPart
{
    public int? TicketId { get; set; }

    public int? PartId { get; set; }

    public int? QuantityUsed { get; set; }

    public virtual Part? Part { get; set; }

    public virtual ServiceTicket? Ticket { get; set; }
}
