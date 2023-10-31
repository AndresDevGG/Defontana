using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.DTO
{
    public record class BrandDTO(long Id, string Name, int TotalAmount);
}
