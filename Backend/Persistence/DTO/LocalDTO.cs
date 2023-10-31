using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.DTO
{
    public record class LocalDTO(long Id, string Name, string Addreess, int TotalAmount);
}
