using Persistence.Model;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Persistence.DTO;

namespace Persistence.SalesRepository
{
    public class SalesRepository
    {
        private List<Ventum> _ventas;
        public SalesRepository()
        {
            LoadSales();
        }

        private void LoadSales() {
            using (var dbContext = new PruebaContext()) 
            {
                DateTime minDate = DateTime.Now.AddDays(-30);
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("Cargando datos iniciales desde base de datos \n" +
                    "un momento por favor...");
                Console.ForegroundColor = ConsoleColor.White;

                this._ventas = dbContext.Venta
                    .Include(x => x.VentaDetalles)
                        .ThenInclude(x => x.IdProductoNavigation)
                            .ThenInclude(x => x.IdMarcaNavigation)
                    .Include(x => x.IdLocalNavigation)
                    .Where(venta => venta.Fecha >= minDate)
                    .ToList();
                Console.Clear();
            }

        }

        public int GetTotalSales() => _ventas.Count;

        public int GetTotalAmountSales() => _ventas.Sum(x => x.Total);

        public Ventum GetSaleWithHighestValue() => _ventas.OrderByDescending(x => x.Total).First();

        public ProductHighestTotalSalesDto GetProductWithHighestTotalSales()
        {
            var product = _ventas
            .SelectMany(sale => sale.VentaDetalles)
            .GroupBy(sale => sale.IdProductoNavigation)
            .Select(g => new ProductHighestTotalSalesDto(
                g.Key.IdProducto,
                g.Key.Nombre,
                g.Sum(detail => detail.TotalLinea)
            ))
            .OrderByDescending(item => item.TotalAmount)
            .FirstOrDefault();

            return product;
        }

        public LocalDTO GetLocalWithHighestSales() {


            var local = _ventas
                .GroupBy(x => x.IdLocalNavigation)
                .Select(g => new LocalDTO(
                        g.Key.IdLocal,
                        g.Key.Nombre,
                        g.Key.Direccion,
                        g.Sum(v => v.Total)
                    )
                )
                .OrderByDescending(l => l.TotalAmount)
                .FirstOrDefault();

            return local;
        }

        public BrandDTO GetBrandWithHighestMargin() {

            var brand = _ventas
            .SelectMany(sale => sale.VentaDetalles)
            .GroupBy(sale => sale.IdProductoNavigation.IdMarcaNavigation)
            .Select(g => new BrandDTO(
                g.Key.IdMarca,
                g.Key.Nombre,
                g.Sum(detail => (detail.Cantidad * detail.PrecioUnitario) - (detail.Cantidad * detail.IdProductoNavigation.CostoUnitario))
            ))
            .OrderByDescending(item => item.TotalAmount)
            .FirstOrDefault();

            return brand;
        }

        public List<ProductSellingBrandDTO> GetProductSellingByBrand() {


            var productsSellingByBrand = _ventas
            .SelectMany(sale => sale.VentaDetalles)
            .GroupBy(vp => new { BrandName = vp.IdProductoNavigation.IdMarcaNavigation.Nombre, vp.IdProductoNavigation.IdProducto, ProductName = vp.IdProductoNavigation.Nombre })
            .Select(g => new ProductSellingBrandDTO(
                    g.Key.BrandName,
                    g.Key.IdProducto,
                    g.Key.ProductName,
                    g.Sum(vp => vp.Cantidad)
                )
            )
            .GroupBy(g => g.Brand)
            .Select(g => g.OrderByDescending(item => item.TotalSold).FirstOrDefault())
            .OrderByDescending(o => o.TotalSold)
            .ToList();

            return productsSellingByBrand;

        }


    }
}
