using SamsungService.Models;

namespace SamsungService.Services
{
    public interface IProductService
    {
        Product GetProductById(int productId);
        IEnumerable<Product> GetProducts();
        IEnumerable<Product> SearchProducts(string searchText);
        void AddProduct(Product product);
        void DeleteProduct(int productId);
    }
}
