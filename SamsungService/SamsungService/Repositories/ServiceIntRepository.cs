using SamsungService.Models;

namespace SamsungService.Repositories
{
    public class ServiceIntRepository:IServiceIntRepository
    {
        private readonly SamsungContext _samsungContext;

        public ServiceIntRepository(SamsungContext samsungContext)
        {
            _samsungContext = samsungContext;
        }

        public void AddServiceInt(ServiceIntegration service)
        {
            _samsungContext.ServiceIntegrations.Add(service);
            _samsungContext.SaveChanges();
        }
    }
}
