using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SamsungService.Models;
using System.Data;

namespace SamsungService.Controllers
{

    //[Route("v1/enduser/[controller]")]
    [ApiController]
    public class ServerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SamsungContext samsungContext;
        public ServerController(IConfiguration configuration, SamsungContext samsungContext)
        {
            _configuration = configuration;
            this.samsungContext = samsungContext;
        }
        [HttpGet]
        [Route("/v1/enduser/{partnerId}/sites/{siteId}/user/{userId}/servers")]
        public JsonResult Filter(string Type)
        {
            string query1 = $"select * from Servers";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MyConnectionString");
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


