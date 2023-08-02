using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SamsungService.Models;
using SamsungService.Services;
using System.Data;

namespace SamsungService.Controllers
{
    //[Route("")]
    [ApiController]
    public class DesktopController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SamsungContext samsungContext;
        public DesktopController(IConfiguration configuration, SamsungContext samsungContext)
        {
            _configuration = configuration;
            this.samsungContext = samsungContext;
        }

        [HttpGet]
        [Route("Desktops")]
        public JsonResult Get()
        {
            string query1 = $"select * from Desktops";
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

        [HttpGet]
        [Route("/v1/enduser/{partnerId}/sites/{siteId}/user/{userId}/desktops")]
        public JsonResult Filter(string Type)
        {
            string query1 = $"select * from Desktops";
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


//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Data.SqlClient;
//using Microsoft.Extensions.Configuration;
//using SamsungService.Models;
//using SamsungService.Services;
//using System.Data;



//namespace SamsungService.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DesktopController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;
//        private readonly SamsungContext samsungContext;
//        public DesktopController(IConfiguration configuration, SamsungContext samsungContext)
//        {
//            _configuration = configuration;
//            this.samsungContext = samsungContext;
//        }
//        [HttpGet]
//        [Route("Desktops")]
//        public JsonResult Get()
//        {
//            string query1 = $"select * from Desktops";
//            DataTable table = new DataTable();
//            string sqlDataSource = _configuration.GetConnectionString("MyConnectionString");
//            SqlDataReader myReader;
//            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
//            {
//                myCon.Open();
//                using (SqlCommand myCommand = new SqlCommand(query1, myCon))
//                {
//                    myReader = myCommand.ExecuteReader();
//                    table.Load(myReader); ;
//                    myReader.Close();
//                    myCon.Close();
//                }
//            }
//            return new JsonResult(table);
//        }
//    }
//}