using EmployeeQRcode.EFCore;
using Microsoft.AspNetCore.Mvc;
using QRCoder;
using ZXing;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using ZXing.Windows.Compatibility;
using static System.Net.WebRequestMethods;

namespace EmployeeQRcode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EContext _context;

        public EmployeeController(EContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public ActionResult<IEnumerable<object>> GetEmployees()
        {
            var employees = _context.Employees
                .Select(e => new
                {
                    e.id,
                    e.name,
                    photo = $"http://rscapps.edge-pro.com:5467/images/{Path.GetFileName(e.photo)}",
                    e.company_name,
                   


                })
                .ToList();

            var employeesWithQrCodes = employees.Select(e => new
            {
                e.id,
                e.name,
                e.photo,
                e.company_name,
               
                QrCodeBase64 = GenerateQrCode(e.id)
            }).ToList();

            return Ok(employeesWithQrCodes);
        }

        [HttpPost("getEmployeeByQrCode")]
        public ActionResult GetEmployeeByQrCode([FromBody] QrCodeRequest request)
        {
            try
            {
                var qrCodeText = DecodeQrCode(request.QrCodeBase64);  // فك تشفير الـ QR Code
                var employeeId = qrCodeText.Split('/').Last(); // استخدم المعرف الموجود في الـ QR Code

                var employee = _context.Employees
                    .Where(e => e.id.ToString() == employeeId) // استخدام المعرف
                    .Select(e => new
                    {
                        e.id,
                        e.name,
                        e.photo,
                        e.company_name,
                        e.identefy,
                        e.adress

                    })
                    .FirstOrDefault();

                if (employee == null)
                {
                    return NotFound();
                }

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        // إضافة دالة جديدة لاسترجاع بيانات الموظف بناءً على ID
        [HttpGet("{id}")]
        public ActionResult GetEmployeeById(int id)
        {
            var employee = _context.Employees
                .Where(e => e.id == id) // البحث عن الموظف باستخدام المعرف (ID)
                .Select(e => new
                {
                    e.id,
                    e.name,
                    photo = $"http://rscapps.edge-pro.com:5467/images/{Path.GetFileName(e.photo)}",
                    e.company_name,
                    e.identefy,
                    e.adress
                })
                .FirstOrDefault();

            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            // توليد QR Code بعد أن تم جلب البيانات
            var employeeWithQrCode = new
            {
                employee.id,
                employee.name,
                employee.photo,
                employee.company_name,
                employee.identefy,
                employee.adress,
                QrCodeBase64 = GenerateQrCode(employee.id)
            };

            return Ok(employeeWithQrCode);
        }





        // كلاس مخصص لاستقبال qrCodeBase64 فقط
        public class QrCodeRequesta
        {
            public string QrCodeBase64 { get; set; }
        }

        // Generate QR Code as Base64 string
        private string GenerateQrCode(int employeeId)
        {
            string url = $"http://10.100.102.30:8082/generate/{employeeId}"; // تأكد من أن هذا URL صحيح
            var qrGenerator = new QRCodeGenerator();
            var qrCodeData = qrGenerator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new Base64QRCode(qrCodeData);
            return "data:image/png;base64," + qrCode.GetGraphic(20); // Add data type prefix
        }

        // Decode QR Code from Base64 string
        private string DecodeQrCode(string qrCodeBase64)
        {
            try
            {
                byte[] qrCodeBytes = Convert.FromBase64String(qrCodeBase64.Replace("data:image/png;base64,", "")); // إزالة البادئة

                using (var ms = new MemoryStream(qrCodeBytes))
                {
                    using (var bitmap = new Bitmap(ms))
                    {
                        var reader = new BarcodeReader();
                        var result = reader.Decode(bitmap);
                        if (result != null)
                        {
                            return result.Text; // هنا نعيد نص الـ QR code
                        }
                        throw new Exception("Unable to decode QR code.");
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("فشل في فك تشفير QR code.", ex);
            }
        }
    }
}
