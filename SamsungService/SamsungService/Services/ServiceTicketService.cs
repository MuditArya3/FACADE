using SamsungService.Models;
using SamsungService.Repositories;

namespace SamsungService.Services
{
    public class ServiceTicketService: IServiceTicketService
    {
        private readonly IServiceTicketRepository _ticketRepository;

        public ServiceTicketService(IServiceTicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public ServiceTicket GetTicketById(int ticketId)
        {
            return _ticketRepository.GetTicketById(ticketId);
        }

        public List<ServiceTicket> GetAllTickets()
        {
            return _ticketRepository.GetAllTickets();
        }

        public List<ServiceTicket> SearchTicketByStatus(string searchText)
        {
            return _ticketRepository.SearchTicketByStatus(searchText);
        }

        public void UpdateTicket(int ticketId, ServiceTicket updatedTicket)
        {
            _ticketRepository.UpdateTicket(ticketId, updatedTicket);
        }

        public void AddTicket(ServiceTicket ticket)
        {
            _ticketRepository.AddTicket(ticket);
        }

        public void DeleteTicket(int ticketId)
        {
            _ticketRepository.DeleteTicket(ticketId);
        }
    }
}
