using SamsungService.Models;

namespace SamsungService.Repositories
{
    public class PartRepository: IPartRepository
        {
            private readonly SamsungContext _samsungContext;

            public PartRepository(SamsungContext samsungContext)
            {
                _samsungContext = samsungContext;
            }

            public Part GetPartById(int partId)
            {
                return _samsungContext.Parts.FirstOrDefault(c => c.PartId == partId);
            }

            public List<Part> GetAllParts()
            {
                return _samsungContext.Parts.ToList();
            }

            public List<Part> SearchPartsByNameOrDescription(string searchText)
            {
                return _samsungContext.Parts.Where(c => c.Name.Contains(searchText) || c.Description.Contains(searchText)).ToList();
            }

            public void UpdatePart(int partId, Part updatedPart)
            {
                var part = _samsungContext.Parts.FirstOrDefault(c => c.PartId == partId);

                if (part != null)
                {
                    part.Name = updatedPart.Name;
                    part.Description = updatedPart.Description;
                    part.Price = updatedPart.Price;
                    part.QuantityAvailable = updatedPart.QuantityAvailable;

                    _samsungContext.SaveChanges();
                }
            }

            public void AddPart(Part part)
            {
                _samsungContext.Parts.Add(part);
                _samsungContext.SaveChanges();
            }

            public void DeletePart(int partId)
            {
                var part = _samsungContext.Parts.FirstOrDefault(c => c.PartId == partId);

                if (part != null)
                {
                    _samsungContext.Parts.Remove(part);
                    _samsungContext.SaveChanges();
                }
            }
        }
    }