using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class UpdateDoctorEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ServiceType",
                table: "Appointment");

            migrationBuilder.AddColumn<string>(
                name: "ServiceType",
                table: "Doctor",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ServiceType",
                table: "Doctor");

            migrationBuilder.AddColumn<string>(
                name: "ServiceType",
                table: "Appointment",
                type: "text",
                nullable: true);
        }
    }
}
