// Repository Layer

using Microsoft.EntityFrameworkCore;
using SamsungService.Models;
using System.Collections.Generic;
using System.Linq;

namespace SamsungService.Repositories
{
    public class TechnicianRepository : ITechnicianRepository
    {
        private readonly SamsungContext _samsungContext;

        public TechnicianRepository(SamsungContext samsungContext)
        {
            _samsungContext = samsungContext;
        }

        public Technician GetTechnicianById(int technicianId)
        {
            return _samsungContext.Technicians.FirstOrDefault(c => c.TechnicianId == technicianId);
        }

        public List<Technician> GetAllTechnicians()
        {
            return _samsungContext.Technicians.ToList();
        }

        public List<Technician> SearchTechnicians(string searchText)
        {
            return _samsungContext.Technicians
                .Where(c => c.Specialization.Contains(searchText) || c.Name.Contains(searchText) || c.Email.Contains(searchText))
                .ToList();
        }

        public void UpdateTechnician(Technician technician)
        {
            _samsungContext.Technicians.Update(technician);
            _samsungContext.SaveChanges();
        }

        public void AddTechnician(Technician technician)
        {
            _samsungContext.Technicians.Add(technician);
            _samsungContext.SaveChanges();
        }

        public void DeleteTechnician(Technician technician)
        {
   
                _samsungContext.Technicians.Remove(technician);
                _samsungContext.SaveChanges();
          
        }
    }
}
