//using SamsungService.Models;

//namespace SamsungService.Repositories
//{
//    public class DesktopRepository: IDesktopRepository
//    {
//        private readonly SamsungContext _samsungContext;

//        public DesktopRepository(SamsungContext samsungContext)
//        {
//            _samsungContext = samsungContext;
//        }

//        //public Desktop GetDesktopById(int desktopId)
//        //{
//        //    return _samsungContext.Desktops.FirstOrDefault(c => c.DesktopId == desktopId);
//        //}

//        public List<Desktop> GetAllDesktops()
//        {
//            return _samsungContext.Desktops.ToList();
//        }

//        //public List<Desktop> SearchDesktops(string searchText)
//        //{
//        //    return _samsungContext.Desktops
//        //        .Where(c => c.Alive.Contains(searchText) || c.Amt.Contains(searchText) || c.Antivirus.Contains(searchText) || c.DiskSpace.Contains(searchText))
//        //        .ToList();
//        //}

//        //public void AddDesktop(Desktop desktop)
//        //{
//        //    _samsungContext.Desktops.Add(desktop);
//        //    _samsungContext.SaveChanges();
//        //}

//        //public void UpdateDesktop(Desktop desktop)
//        //{
//        //    _samsungContext.SaveChanges();
//        //}

//        //public void DeleteDesktop (Desktop desktop)
//        //{
//        //    _samsungContext.Desktops.Remove(desktop);
//        //    _samsungContext.SaveChanges();
//        //}
//    }
//}
