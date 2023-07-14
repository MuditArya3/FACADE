using SamsungService.Models;
using SamsungService.Repositories;
using System.Collections.Generic;

namespace SamsungService.Services
{
    public class TechnicianService : ITechnicianService
    {
        private readonly ITechnicianRepository _technicianRepository;

        public TechnicianService(ITechnicianRepository technicianRepository)
        {
            _technicianRepository = technicianRepository;
        }

        public Technician GetTechnicianById(int technicianId)
        {
            return _technicianRepository.GetTechnicianById(technicianId);
        }

        public List<Technician> GetAllTechnicians()
        {
            return _technicianRepository.GetAllTechnicians();
        }

        public List<Technician> SearchTechnicians(string searchText)
        {
            return _technicianRepository.SearchTechnicians(searchText);
        }

        public void UpdateTechnician(Technician existingTechnician, Technician updatedTechnician)
        {
            existingTechnician.Name = updatedTechnician.Name;
            existingTechnician.Email = updatedTechnician.Email;
            existingTechnician.Specialization = existingTechnician.Specialization;
            existingTechnician.PhoneNumber = existingTechnician.PhoneNumber;

            _technicianRepository.UpdateTechnician(existingTechnician);
        }

        public void AddTechnician(Technician technician)
        {
            _technicianRepository.AddTechnician(technician);
        }

        public void DeleteTechnician(Technician technician)
        {
            _technicianRepository.DeleteTechnician(technician);
        }
    }
}

