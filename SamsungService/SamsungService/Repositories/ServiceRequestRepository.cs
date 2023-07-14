using SamsungService.Models;
using System.Collections.Generic;
using System.Linq;

namespace SamsungService.Repositories
{
    public class ServiceRequestRepository : IServiceRequestRepository
    {
        private readonly SamsungContext _samsungContext;

        public ServiceRequestRepository(SamsungContext samsungContext)
        {
            _samsungContext = samsungContext;
        }

        public ServiceRequest GetRequestById(int requestId)
        {
            return _samsungContext.ServiceRequests.FirstOrDefault(c => c.RequestId == requestId);
        }

        public IEnumerable<ServiceRequest> GetAllRequests()
        {
            return _samsungContext.ServiceRequests.ToList();
        }

        public IEnumerable<ServiceRequest> SearchRequestsByKeyword(string searchText)
        {
            return _samsungContext.ServiceRequests
                .Where(c => c.Description.Contains(searchText) || c.Status.Contains(searchText))
                .ToList();
        }

        public void UpdateRequest(int requestId, ServiceRequest updatedRequest)
        {
            var request = _samsungContext.ServiceRequests.FirstOrDefault(c => c.RequestId == requestId);

            if (request != null)
            {
                request.CustomerId = updatedRequest.CustomerId;
                request.ProductId = updatedRequest.ProductId;
                request.RequestDate = updatedRequest.RequestDate;
                request.Description = updatedRequest.Description;
                request.Status = updatedRequest.Status;

                _samsungContext.SaveChanges();
            }
        }

        public void AddRequest(ServiceRequest serviceRequest)
        {
            _samsungContext.ServiceRequests.Add(serviceRequest);
            _samsungContext.SaveChanges();
        }

        public void DeleteRequest(int requestId)
        {
            var request = _samsungContext.ServiceRequests.FirstOrDefault(c => c.RequestId == requestId);

            if (request != null)
            {
                _samsungContext.ServiceRequests.Remove(request);
                _samsungContext.SaveChanges();
            }
        }
    }
}

