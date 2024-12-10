using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FestivalCarthage.Migrations
{
    /// <inheritdoc />
    public partial class AddImageColumnToConcert : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Concerts",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Concerts");
        }
    }
}
