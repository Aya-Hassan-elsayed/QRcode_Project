using Microsoft.EntityFrameworkCore;
using EmployeeQRcode.EFCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configure PostgreSQL
builder.Services.AddDbContext<EContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAny",
    builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
               /*.AllowCredentials();*/ //  √ﬂœ „‰ ≈÷«›… Â–Â «·”ÿ—
    });
});



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS middleware
app.UseCors("AllowAny");

app.UseAuthorization();

app.MapControllers();

app.Run();
