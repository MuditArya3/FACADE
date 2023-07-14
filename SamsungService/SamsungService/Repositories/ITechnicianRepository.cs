using SamsungService.Models;

namespace SamsungService.Repositories
{
    public interface ITechnicianRepository
    {
        Technician GetTechnicianById(int technicianId);
        List<Technician> GetAllTechnicians();
        List<Technician> SearchTechnicians(string searchText);
        void UpdateTechnician(Technician technician);
        void AddTechnician(Technician technician);
        void DeleteTechnician(Technician technician);
    }
}
