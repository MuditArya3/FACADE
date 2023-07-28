using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SamsungService.Models;

public partial class SamsungContext : DbContext
{
    public SamsungContext()
    {
    }

    public SamsungContext(DbContextOptions<SamsungContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Part> Parts { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ServiceIntegration> ServiceIntegrations { get; set; }

    public virtual DbSet<ServiceRequest> ServiceRequests { get; set; }

    public virtual DbSet<ServiceTicket> ServiceTickets { get; set; }

    public virtual DbSet<Technician> Technicians { get; set; }

    public virtual DbSet<TicketPart> TicketParts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=BHAVNAWKS636;Database=Samsung;User Id=sa;password=Bhavna@123;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.Property(e => e.CustomerId).ValueGeneratedNever();
            entity.Property(e => e.Address).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.Property(e => e.InvoiceId).ValueGeneratedNever();
            entity.Property(e => e.DueDate).HasColumnType("datetime");
            entity.Property(e => e.InvoiceDate).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);


        });

        modelBuilder.Entity<Part>(entity =>
        {
            entity.Property(e => e.PartId).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.Property(e => e.PaymentId).ValueGeneratedNever();
            entity.Property(e => e.PaymentDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);

       
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.ProductId).ValueGeneratedNever();
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<ServiceIntegration>(entity =>
        {
            entity.ToTable("ServiceIntegration");

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.DomainUrl)
                .HasMaxLength(250)
                .HasColumnName("DomainURL");
            entity.Property(e => e.ServiceApiname)
                .HasMaxLength(250)
                .HasColumnName("ServiceAPIName");
            entity.Property(e => e.ServiceJson).HasColumnName("ServiceJSON");
            entity.Property(e => e.ServiceName).HasMaxLength(250);
            entity.Property(e => e.SwaggerFilePath).HasMaxLength(250);
        });

        modelBuilder.Entity<ServiceRequest>(entity =>
        {
            entity.HasKey(e => e.RequestId);

            entity.Property(e => e.RequestId).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.RequestDate).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);

        });

        modelBuilder.Entity<ServiceTicket>(entity =>
        {
            entity.HasKey(e => e.TicketId);

            entity.Property(e => e.TicketId).ValueGeneratedNever();
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.TicketDate).HasColumnType("datetime");
            entity.Property(e => e.TicketNotes).HasMaxLength(50);

        });

        modelBuilder.Entity<Technician>(entity =>
        {
            entity.Property(e => e.TechnicianId).ValueGeneratedNever();
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Specialization).HasMaxLength(50);
        });

        modelBuilder.Entity<TicketPart>(entity =>
        {
            entity.HasNoKey();

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
