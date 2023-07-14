using SamsungService.Models;
using System.Collections.Generic;
using System.Linq;

namespace SamsungService.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly SamsungContext _samsungContext;

        public ProductRepository(SamsungContext samsungContext)
        {
            _samsungContext = samsungContext;
        }

        public Product GetProductById(int productId)
        {
            return _samsungContext.Products.FirstOrDefault(c => c.ProductId == productId);
        }

        public IEnumerable<Product> GetProducts()
        {
            return _samsungContext.Products.ToList();
        }

        public IEnumerable<Product> SearchProducts(string searchText)
        {
            return _samsungContext.Products
                .Where(c => c.Name.Contains(searchText) || c.Category.Contains(searchText) || c.Description.Contains(searchText))
                .ToList();
        }

        public void AddProduct(Product product)
        {
            _samsungContext.Products.Add(product);
            _samsungContext.SaveChanges();
        }

        public void DeleteProduct(int productId)
        {
            var product = _samsungContext.Products.FirstOrDefault(c => c.ProductId == productId);
            if (product != null)
            {
                _samsungContext.Products.Remove(product);
                _samsungContext.SaveChanges();
            }
        }
    }
}

