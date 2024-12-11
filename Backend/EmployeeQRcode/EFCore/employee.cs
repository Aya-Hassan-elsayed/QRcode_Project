using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeQRcode.EFCore
{
    [Table ("emp") ]
    public class employee
    {
        public int id { get; set; }
        public  string name { get; set; }
        public string? photo { get; set; }
        public string? company_name { get; set; }
        public string? identefy { get; set; }
        public string? adress { get; set; }




    }
}
