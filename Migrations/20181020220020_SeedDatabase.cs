using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES('Make1')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES('Make2')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES('Make3')");
 
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make1-ModelA',(SELECT ID from Makes WHERE Name='Make1'))"); 
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make1-ModelB',(SELECT ID from Makes WHERE Name='Make1'))"); 
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make1-ModelC',(SELECT ID from Makes WHERE Name='Make1'))"); 

            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make2-ModelA',(SELECT ID from Makes WHERE Name='Make2'))"); 
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make2-ModelB',(SELECT ID from Makes WHERE Name='Make2'))"); 
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make2-ModelC',(SELECT ID from Makes WHERE Name='Make2'))"); 

            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make3-ModelA',(SELECT ID from Makes WHERE Name='Make3'))"); 
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make3-ModelB',(SELECT ID from Makes WHERE Name='Make3'))"); 
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make3-ModelC',(SELECT ID from Makes WHERE Name='Make3'))"); 
            
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('ABS Brakes')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Passenger AirBag')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Driver AirBag')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Heated Seats')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Setelite Radio')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Navigation System')");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE from MAkes");
            migrationBuilder.Sql("DELETE from Features");
        }
    }
}
