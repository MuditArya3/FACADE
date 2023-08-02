using SamsungService.Models;
using SamsungService.Repositories;

namespace SamsungService.Services
{
    public class ServiceIntService:IServiceIntService
    {
        private readonly IServiceIntRepository _serviceIntRepository;

        public ServiceIntService(IServiceIntRepository serviceIntRepository)
        {
            _serviceIntRepository = serviceIntRepository;
        }

        public void AddServiceInt(ServiceIntegration service)
        {
            _serviceIntRepository.AddServiceInt(service);
        }
    }
}
