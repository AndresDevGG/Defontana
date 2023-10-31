using Persistence.SalesRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DefontanaApp.Presentation
{
    public class Menu
    {
        private SalesRepository _repository;
        public Menu()
        {
            _repository = new();
        }

        public void RunMenu()
        {   
            bool showMenu = true;

            while (showMenu)
            {
                showMenu = MainMenu();
            }
        }

        private bool MainMenu()
        {
            Console.Clear();
            Console.WriteLine("Menú Principal");
            Console.WriteLine("1. Total de ventas de los últimos 30 días");
            Console.WriteLine("2. Venta con el monto más alto.");
            Console.WriteLine("3. Producto con mayor monto total de ventas.");
            Console.WriteLine("4. Local con mayor monto de ventas..");
            Console.WriteLine("5. Marca con mayor margen de ganancias");
            Console.WriteLine("6. Producto que mas se vende por local");
            Console.WriteLine("7. Salir");
            Console.Write("Selecciona una opción: ");

            switch (Console.ReadLine())
            {
                case "1":
                    Option1();
                    return true;
                case "2":
                    Option2();
                    return true;
                case "3":
                    Option3();
                    return true;
                case "4":
                    Option4();
                    return true;
                case "5":
                    Option5();
                    return true;
                case "6":
                    Option6();
                    return true;
                case "7":
                    return false;
                default:
                    Console.WriteLine("Opción no válida. Presiona una tecla para continuar.");
                    Console.ReadKey();
                    return true;
            }
        }

        private void Option1()
        {
            ShowTitle("1. Total de ventas de los últimos 30 días.");

            var totalAmountSales = _repository.GetTotalAmountSales();
            var totalSales = _repository.GetTotalSales();

            Console.WriteLine("Monto total: ");
            ShowResult($"$ {totalAmountSales}");
            Console.WriteLine("Total de ventas: ");
            ShowResult(totalSales + "\n");

            ToExit();
        }

        private void Option2()
        {
            ShowTitle("2. El día y hora en que se realizó la venta con el monto más alto.");
            
            var sale = _repository.GetSaleWithHighestValue();

            Console.WriteLine("Día: ");
            ShowResult(sale.Fecha.ToShortDateString());
            Console.WriteLine("Hora: ");
            ShowResult(sale.Fecha.TimeOfDay.ToString());
            Console.WriteLine("Total: ");
            ShowResult("$ "+sale.Total + "\n");

            ToExit();
        }

        private void Option3()
        {
            ShowTitle("3. Producto con mayor monto total de ventas.");
            
            var result = _repository.GetProductWithHighestTotalSales();
            
            Console.WriteLine($"El producto es: ");
            ShowResult($"{result.ProductId} - {result.ProductName}");
            Console.WriteLine($"Monto total de ventas: ");
            ShowResult($"$ {result.TotalAmount} \n");

            ToExit();
        }

        private void Option4()
        {
            ShowTitle("4. Indicar el local con mayor monto de ventas.");

            var local = _repository.GetLocalWithHighestSales();


            Console.WriteLine("Local: " + local.Id);
            ShowResult($"{local.Id} - {local.Name}");

            Console.WriteLine("Monto de Ventas: ");
            ShowResult($"$ {local.TotalAmount} \n");

            ToExit();
        }

        private void Option5() {

            ShowTitle("5. Marca con mayor margen de ganancias.");
            var brand = _repository.GetBrandWithHighestMargin();
            Console.WriteLine("Marca: ");
            ShowResult($"{brand.Id} - {brand.Name}");
            
            Console.WriteLine("Marca: ");
            ShowResult($"$ {brand.TotalAmount} \n");
            ToExit();

        }

        private void Option6() {

            ShowTitle("6. Producto que mas se vende por marca.");

            var products = _repository.GetProductSellingByBrand();

            foreach (var item in products)
            {
                Console.WriteLine("Marca: ");
                ShowResult(item.Brand);
                Console.WriteLine("Producto: ");
                ShowResult($"{item.ProductId} - {item.Product}");
                Console.WriteLine("Total Vendido: ");
                ShowResult(item.TotalSold.ToString()+"\n");

            }


            ToExit();
        }

        private void ShowResult(string result) { 
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(result);
            Console.ForegroundColor = ConsoleColor.White;
        }

        private void ShowTitle(string title)
        {
            Console.Clear();
            Console.WriteLine(title + "\n");
        }
        
        private void ToExit() {
            Console.Write("Presiona cualquier tecla para volver al menú.");
            Console.ReadKey();
        }
    }
}
