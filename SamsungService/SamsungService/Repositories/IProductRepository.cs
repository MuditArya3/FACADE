using SamsungService.Models;

namespace SamsungService.Repositories
{
    public interface IProductRepository
    {
        Product GetProductById(int productId);
        IEnumerable<Product> GetProducts();
        IEnumerable<Product> SearchProducts(string searchText);
        void AddProduct(Product product);
        void DeleteProduct(int productId);
    }
}
