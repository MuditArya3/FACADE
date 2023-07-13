using SamsungService.Models;

namespace SamsungService.Services
{
    public interface IServiceRequestService
    {
        ServiceRequest GetRequestById(int requestId);
        IEnumerable<ServiceRequest> GetAllRequests();
        IEnumerable<ServiceRequest> SearchRequestsByKeyword(string searchText);
        void UpdateRequest(int requestId, ServiceRequest updatedRequest);
        void AddRequest(ServiceRequest serviceRequest);
        void DeleteRequest(int requestId);
    }
}
