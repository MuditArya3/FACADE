using SamsungService.Models;

namespace SamsungService.Services
{
    public interface ITechnicianService
    {
        Technician GetTechnicianById(int technicianId);
        List<Technician> GetAllTechnicians();
        List<Technician> SearchTechnicians(string searchText);
        void UpdateTechnician(Technician existingTechnician, Technician updatedTechnician);
        void AddTechnician(Technician technician);
        void DeleteTechnician(Technician technician);
    }
}
