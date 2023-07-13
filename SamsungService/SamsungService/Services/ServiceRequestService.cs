using SamsungService.Models;
using SamsungService.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace SamsungService.Services
{
    public class ServiceRequestService : IServiceRequestService
    {
        private readonly IServiceRequestRepository _serviceRequestRepository;

        public ServiceRequestService(IServiceRequestRepository serviceRequestRepository)
        {
            _serviceRequestRepository = serviceRequestRepository;
        }

        public ServiceRequest GetRequestById(int requestId)
        {
            return _serviceRequestRepository.GetRequestById(requestId);
        }

        public IEnumerable<ServiceRequest> GetAllRequests()
        {
            return _serviceRequestRepository.GetAllRequests();
        }

        public IEnumerable<ServiceRequest> SearchRequestsByKeyword(string searchText)
        {
            return _serviceRequestRepository.SearchRequestsByKeyword(searchText);
        }

        public void UpdateRequest(int requestId, ServiceRequest updatedRequest)
        {
            _serviceRequestRepository.UpdateRequest(requestId, updatedRequest);
        }

        public void AddRequest(ServiceRequest serviceRequest)
        {
            _serviceRequestRepository.AddRequest(serviceRequest);
        }

        public void DeleteRequest(int requestId)
        {
            _serviceRequestRepository.DeleteRequest(requestId);
        }
    }
}

