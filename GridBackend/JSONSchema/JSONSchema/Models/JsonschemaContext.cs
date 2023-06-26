using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace JSONSchema.Models;

public partial class JsonschemaContext : DbContext
{
    public JsonschemaContext()
    {
    }

    public JsonschemaContext(DbContextOptions<JsonschemaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<GridData> GridData { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=BHAVNAWKS755;Database=JSONSchema;User Id=sa;password=Bhavna@123;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GridData>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Body)
                .HasMaxLength(50)
                .HasColumnName("body");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.PostId).HasColumnName("post_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
