using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class ADD_PATIENT_DATA : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Appointment");

            migrationBuilder.AddColumn<string>(
                name: "PatientEmail",
                table: "Appointment",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PatientName",
                table: "Appointment",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PatientPhone",
                table: "Appointment",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PatientEmail",
                table: "Appointment");

            migrationBuilder.DropColumn(
                name: "PatientName",
                table: "Appointment");

            migrationBuilder.DropColumn(
                name: "PatientPhone",
                table: "Appointment");

            migrationBuilder.AddColumn<Guid>(
                name: "PatientId",
                table: "Appointment",
                type: "uuid",
                nullable: true);
        }
    }
}
