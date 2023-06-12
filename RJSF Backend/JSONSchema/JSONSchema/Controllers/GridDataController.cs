using JSONSchema.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace JSONSchema.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GridDataController : Controller
    {
            private readonly IConfiguration _configuration;
            private readonly JsonschemaContext jsonSchemaContext;
            public GridDataController(IConfiguration configuration, JsonschemaContext jsonSchemaContext)
            {
                _configuration = configuration;
                this.jsonSchemaContext = jsonSchemaContext;
            }

            [HttpGet]
            public JsonResult Get()
            {
                string query1 = $"select * from GridData";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("Default");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query1, myCon))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader); ;
                        myReader.Close();
                        myCon.Close();
                    }
                }
                return new JsonResult(table);
            }

        [HttpGet]
        [Route("search")]
        public JsonResult GetSearch([FromQuery] string searchText)
        {
            Console.WriteLine(searchText.ToString());
            string query1 = $"SELECT * FROM GridData WHERE id like '%" + searchText + "%' or post_id like '%" + searchText + "%' or name like '%" + searchText + "%' or email like '%" + searchText + "%' or body like '%" + searchText + "%'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query1, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
