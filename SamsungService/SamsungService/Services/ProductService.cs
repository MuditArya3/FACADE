using SamsungService.Models;
using SamsungService.Repositories;

namespace SamsungService.Services
{
    public class ProductService: IProductService
        {
            private readonly IProductRepository _productRepository;

            public ProductService(IProductRepository productRepository)
            {
                _productRepository = productRepository;
            }

            public Product GetProductById(int productId)
            {
                return _productRepository.GetProductById(productId);
            }

            public IEnumerable<Product> GetProducts()
            {
                return _productRepository.GetProducts();
            }

            public IEnumerable<Product> SearchProducts(string searchText)
            {
                return _productRepository.SearchProducts(searchText);
            }

            public void AddProduct(Product product)
            {
                _productRepository.AddProduct(product);
            }

            public void DeleteProduct(int productId)
            {
                _productRepository.DeleteProduct(productId);
            }
        }
    }
