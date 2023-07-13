using SamsungService.Models;

namespace SamsungService.Repositories
{
    public class ServiceTicketRepository:IServiceTicketRepository
    {
        private readonly SamsungContext _samsungContext;

        public ServiceTicketRepository(SamsungContext samsungContext)
        {
            _samsungContext = samsungContext;
        }

        public ServiceTicket GetTicketById(int ticketId)
        {
            return _samsungContext.ServiceTickets.FirstOrDefault(c => c.TicketId == ticketId);
        }

        public List<ServiceTicket> GetAllTickets()
        {
            return _samsungContext.ServiceTickets.ToList();
        }

        public List<ServiceTicket> SearchTicketByStatus(string searchText)
        {
            return _samsungContext.ServiceTickets.Where(c => c.Status.Contains(searchText)).ToList();
        }

        public void UpdateTicket(int ticketsId, ServiceTicket updatedTicket)
        {
            var tickets = _samsungContext.ServiceTickets.FirstOrDefault(c => c.TicketId == ticketsId);

            if (tickets != null)
            {
                tickets.Status = updatedTicket.Status;
                tickets.RequestId = updatedTicket.RequestId;
                tickets.TechnicianId = updatedTicket.TechnicianId;
                tickets.TicketDate = updatedTicket.TicketDate;
                tickets.TicketNotes = updatedTicket.TicketNotes;
            

                _samsungContext.SaveChanges();
            }
        }

        public void AddTicket(ServiceTicket ticket)
        {
            _samsungContext.ServiceTickets.Add(ticket);
            _samsungContext.SaveChanges();
        }

        public void DeleteTicket(int ticketId)
        {
            var ticket = _samsungContext.ServiceTickets.FirstOrDefault(c => c.TicketId == ticketId);

            if (ticket != null)
            {
                _samsungContext.ServiceTickets.Remove(ticket);
                _samsungContext.SaveChanges();
            }
        }
    }
}
