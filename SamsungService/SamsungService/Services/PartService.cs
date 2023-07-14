using SamsungService.Models;
using SamsungService.Repositories;

namespace SamsungService.Services
{
    public class PartService: IPartService
        {
            private readonly IPartRepository _partRepository;

            public PartService(IPartRepository partRepository)
            {
                _partRepository = partRepository;
            }

            public Part GetPartById(int partId)
            {
                return _partRepository.GetPartById(partId);
            }

            public List<Part> GetAllParts()
            {
                return _partRepository.GetAllParts();
            }

            public List<Part> SearchPartsByNameOrDescription(string searchText)
            {
                return _partRepository.SearchPartsByNameOrDescription(searchText);
            }

            public void UpdatePart(int partId, Part updatedPart)
            {
                _partRepository.UpdatePart(partId, updatedPart);
            }

            public void AddPart(Part part)
            {
                _partRepository.AddPart(part);
            }

            public void DeletePart(int partId)
            {
                _partRepository.DeletePart(partId);
            }
        }
    }