using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SamsungService.Models;
using System.Data;

namespace SamsungService.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SamsungContext samsungContext;
        public EmailController(IConfiguration configuration, SamsungContext samsungContext)
        {
            _configuration = configuration;
            this.samsungContext = samsungContext;
        }
        [HttpGet]
        [Route("/v1/enduser/{emailId}/details")]
        public JsonResult GetResult() 
        {
            string query1 = $"select * from UserInfo";
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
