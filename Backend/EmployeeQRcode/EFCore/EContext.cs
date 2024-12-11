using Microsoft.EntityFrameworkCore;

namespace EmployeeQRcode.EFCore
{
    public class EContext: DbContext
    {
       public EContext(DbContextOptions<EContext> options) : base(options) { }
    
        public DbSet<employee> Employees { get; set; }
    }
   

}
