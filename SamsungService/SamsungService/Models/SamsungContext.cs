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

    public virtual DbSet<Desktop> Desktops { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Part> Parts { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ServiceRequest> ServiceRequests { get; set; }

    public virtual DbSet<ServiceTicket> ServiceTickets { get; set; }

    public virtual DbSet<Technician> Technicians { get; set; }

    public virtual DbSet<TicketPart> TicketParts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=BHAVNAWKS706;Database=Samsung;User Id=sa;password=Bhavna@123;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.Property(e => e.CustomerId).ValueGeneratedNever();
            entity.Property(e => e.Address).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Desktop>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Alive).HasColumnName("alive");
            entity.Property(e => e.Amt).HasColumnName("amt");
            entity.Property(e => e.Antivirus).HasColumnName("antivirus");
            entity.Property(e => e.DiskSpace).HasColumnName("diskSpace");
            entity.Property(e => e.LastLogin)
                .HasMaxLength(50)
                .HasColumnName("lastLogin");
            entity.Property(e => e.LoggedInUser)
                .HasMaxLength(50)
                .HasColumnName("loggedInUser");
            entity.Property(e => e.MemberCode)
                .HasMaxLength(50)
                .HasColumnName("memberCode");
            entity.Property(e => e.MemberName)
                .HasMaxLength(50)
                .HasColumnName("memberName");
            entity.Property(e => e.Os)
                .HasMaxLength(50)
                .HasColumnName("os");
            entity.Property(e => e.OsVerSion)
                .HasMaxLength(50)
                .HasColumnName("osVerSion");
            entity.Property(e => e.Regtype)
                .HasMaxLength(50)
                .HasColumnName("regtype");
            entity.Property(e => e.ResFriendlyName)
                .HasMaxLength(50)
                .HasColumnName("resFriendlyName");
            entity.Property(e => e.ResourceName)
                .HasMaxLength(50)
                .HasColumnName("resourceName");
            entity.Property(e => e.SecurityUpdates)
                .HasMaxLength(50)
                .HasColumnName("securityUpdates");
            entity.Property(e => e.SiteId).HasColumnName("siteId");
            entity.Property(e => e.Sitecode)
                .HasMaxLength(50)
                .HasColumnName("sitecode");
            entity.Property(e => e.SmartDisk).HasColumnName("smartDisk");
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.Property(e => e.InvoiceId).ValueGeneratedNever();
            entity.Property(e => e.DueDate).HasColumnType("datetime");
            entity.Property(e => e.InvoiceDate).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.HasOne(d => d.Customer).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK_Invoices_Customers");
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

            entity.HasOne(d => d.Invoice).WithMany(p => p.Payments)
                .HasForeignKey(d => d.InvoiceId)
                .HasConstraintName("FK_Payments_Invoices");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.ProductId).ValueGeneratedNever();
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<ServiceRequest>(entity =>
        {
            entity.HasKey(e => e.RequestId);

            entity.Property(e => e.RequestId).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.RequestDate).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.HasOne(d => d.Customer).WithMany(p => p.ServiceRequests)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK_ServiceRequests_Customers");

            entity.HasOne(d => d.Product).WithMany(p => p.ServiceRequests)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_ServiceRequests_Products");
        });

        modelBuilder.Entity<ServiceTicket>(entity =>
        {
            entity.HasKey(e => e.TicketId);

            entity.Property(e => e.TicketId).ValueGeneratedNever();
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.TicketDate).HasColumnType("datetime");
            entity.Property(e => e.TicketNotes).HasMaxLength(50);

            entity.HasOne(d => d.Request).WithMany(p => p.ServiceTickets)
                .HasForeignKey(d => d.RequestId)
                .HasConstraintName("FK_ServiceTickets_ServiceRequests");

            entity.HasOne(d => d.Technician).WithMany(p => p.ServiceTickets)
                .HasForeignKey(d => d.TechnicianId)
                .HasConstraintName("FK_ServiceTickets_Technicians");
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

            entity.HasOne(d => d.Part).WithMany()
                .HasForeignKey(d => d.PartId)
                .HasConstraintName("FK_TicketParts_Parts");

            entity.HasOne(d => d.Ticket).WithMany()
                .HasForeignKey(d => d.TicketId)
                .HasConstraintName("FK_TicketParts_ServiceTickets");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
