using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.DTO
{
    public record class ProductHighestTotalSalesDto(long ProductId, string ProductName, int TotalAmount);
}
