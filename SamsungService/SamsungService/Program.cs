using Microsoft.EntityFrameworkCore;
using SamsungService.Models;
using SamsungService.Repositories;
using SamsungService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
object value = builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddCors(policyBuilder =>
 policyBuilder.AddDefaultPolicy(policy =>
 policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader())
);


builder.Services.AddDbContext<SamsungContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyConnectionString"));

});
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IInvoiceRepository, InvoiceRepository>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();
builder.Services.AddScoped<IPartService, PartService>();
builder.Services.AddScoped<IPartRepository, PartRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IServiceRequestRepository, ServiceRequestRepository>();
builder.Services.AddScoped<IServiceRequestService, ServiceRequestService>();
builder.Services.AddScoped<IServiceTicketRepository, ServiceTicketRepository>();
builder.Services.AddScoped<IServiceTicketService, ServiceTicketService>();
builder.Services.AddScoped<IServiceIntService, ServiceIntService>();
builder.Services.AddScoped<IServiceIntRepository, ServiceIntRepository>();
//builder.Services.AddScoped<IDesktopService, DesktopService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
