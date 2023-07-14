﻿using SamsungService.Models;

namespace SamsungService.Services
{
    public interface IServiceTicketService
    {
        ServiceTicket GetTicketById(int ticketId);
        List<ServiceTicket> GetAllTickets();
        List<ServiceTicket> SearchTicketByStatus(string searchText);
        void UpdateTicket(int ticketId, ServiceTicket updatedTicket);
        void AddTicket(ServiceTicket ticket);
        void DeleteTicket(int ticketId);
    }
}
