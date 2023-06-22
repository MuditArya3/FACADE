using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NSwag;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SwaggerJson.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpPost]
        [Route("getendpoints")]
        public async Task<List<string>> GetAllEndpoints([FromBody] string jsonString)
        {
            var document = await OpenApiDocument.FromJsonAsync(jsonString);
            var endpoints = fetchAllEnpoints(document);
            return endpoints;
        }
        [HttpPost]
        [Route("getendpointservice")]
        public async Task<List<string>> GetAllEndpointsService([FromBody] string jsonString)
        {
            var document = await OpenApiDocument.FromJsonAsync(jsonString);
            var service = fetchAllEnpointsService(document);
            return service;
        }
        [HttpPost]
        [Route("getapitype")]
        public async Task<List<string>> GetApiType([FromHeader] string endPoint, [FromBody] string jsonString)
        {
            var document = await OpenApiDocument.FromJsonAsync(jsonString);
            var endpointsTypes = fetchAllEnpointType(endPoint, document);
            return endpointsTypes;
        }
        [HttpPost]
        [Route("getrequestbody")]
        public async Task<string> GetRequestBody([FromHeader] string endpoint, [FromHeader] string endpointType, [FromBody] string jsonString)
        {
            var document = await OpenApiDocument.FromJsonAsync(jsonString);
            var endpointsTypes = fetchRequestBody(endpoint, document, endpointType);
            return endpointsTypes;
        }

        [HttpPost]
        [Route("getresponce")]
        public async Task<string> GetResponce([FromHeader] string endpoint, [FromHeader] string endpointType, [FromBody] string jsonString)
        {
            var document = await OpenApiDocument.FromJsonAsync(jsonString);
            var endpointsTypes = fetchResponse(endpoint, document, endpointType, jsonString);
            return endpointsTypes;
        }
        [HttpPost]
        [Route("getparameters")]
        public async Task<string> GetParameters([FromHeader] string endpoint, [FromHeader] string endpointType, [FromBody] string jsonString)
        {
            var jsonData = (JObject)JsonConvert.DeserializeObject(jsonString);
            var document = await OpenApiDocument.FromJsonAsync(jsonString);
            var endpointsTypes = GetStringParameers(endpoint, document, endpointType, jsonData);
            return endpointsTypes;
        }

        public List<string> fetchAllEnpoints(OpenApiDocument document)
        {
            var paths = document.Paths.Select(p => p.Key).ToList();
            var pathList = new List<string>();
            foreach (var path in paths)
            {
                var types = fetchAllEnpointType(path, document);
                foreach (var type in types)
                {
                    var values = document.Paths.Where(x => x.Key == path).FirstOrDefault();
                    var apiOperations = values.Value.Where(x => x.Key == type).Select(x => x.Value).ToList();
                    var apiOperation = apiOperations?.ToArray()[0];
                    var extensionData = apiOperation?.ExtensionData;
                    if (extensionData != null && extensionData.ContainsKey("x_cw_operation"))
                    {
                        var x_cw_operation = extensionData["x_cw_operation"];
                        if (x_cw_operation is string operation)
                        {
                            pathList.Add(path + "--" + type + "--" + operation);
                        }
                    }
                }
            }
            return pathList;
        }

        public List<string> fetchAllEnpointsService(OpenApiDocument document)
        {
            var paths = document.Paths.Select(p => p.Key).ToList();
            var pathList = new List<string>();
            foreach (var path in paths)
            {
                var types = fetchAllEnpointType(path, document);
                foreach (var type in types)
                {
                    var values = document.Paths.Where(x => x.Key == path).FirstOrDefault();
                    var apiOperations = values.Value.Where(x => x.Key == type).Select(x => x.Value).ToList();
                    var apiOperation = apiOperations?.ToArray()[0];
                    var extensionData = apiOperation?.ExtensionData;
                    if (extensionData != null && extensionData.ContainsKey("x_cw_service"))
                    {
                        var x_cw_operation = extensionData["x_cw_service"];
                        if (x_cw_operation is string operation)
                        {
                            pathList.Add(operation);
                        }
                    }
                }
            }
            return pathList;
        }
        public List<string> fetchAllEnpointType(string key, OpenApiDocument document)
        {
            var values = document.Paths.Where(x => x.Key == key).FirstOrDefault();
            return values.Value?.Keys.Select(x => x).ToList();
        }

        public string fetchRequestBody(string endPoint, OpenApiDocument document, string endpointType)
        {
            var values = document.Paths.Where(x => x.Key == endPoint).FirstOrDefault();
            var apiOperations = values.Value.Where(x => x.Key == endpointType).Select(x => x.Value).ToList();
            var apiOperation = apiOperations.ToArray()[0];
            var key = apiOperation?.RequestBody?.Content.Keys.ToList()[0];
            var content = apiOperation.RequestBody?.Content.Where(x => x.Key == key).Select(x => x.Value).FirstOrDefault();
            var responceItem = content?.Schema.ActualSchema.ActualProperties;
            return JsonConvert.SerializeObject(responceItem);
        }
        public string fetchResponse(string endPoint, OpenApiDocument document, string endpointType, string val = null)
        {
            var jsonData = (JObject)JsonConvert.DeserializeObject(val);
            var mm = jsonData["paths"][endPoint][endpointType];
            var values = document.Paths.Where(x => x.Key == endPoint).FirstOrDefault();
            var apiOperations = values.Value.Where(x => x.Key == endpointType).Select(x => x.Value).ToList();
            var apiOperation = apiOperations?.ToArray()[0];
            var response = apiOperation.ActualResponses.Where(x => x.Key == "200").Select(x => x.Value).FirstOrDefault();
            var key = response?.ActualResponse.Content.Keys.Count() > 0 ? response.ActualResponse.Content.Keys.ToList()[0] : "";
            var content = response?.ActualResponse.Content.Where(x => x.Key == key).Select(x => x.Value).ToList();
            var responceItem = content?.Select(x => x.Schema).Select(x => x.Item);
            var responces = responceItem?.SingleOrDefault() == null ? content?.Select(x => x.Schema).Select(x => x.ActualSchema).Select(x => x.ActualProperties).ToList() : responceItem?.Select(x => x.ActualSchema).Select(x => x.ActualProperties).ToList();
            var getResponse = responces?.Count() > 0 ? responces?[0].Values?.Select(x => new Parameter { Name = x.Name, IsRequired = x.IsRequired, Type = x.Type.ToString(), In = "" }).ToList() : null;
            return JsonConvert.SerializeObject(getResponse);
        }
        private string GetStringParameers(string endPoint, OpenApiDocument document, string endpointType, JObject val = null)
        {
            var message = val["paths"][endPoint][endpointType].Children().ToList().Select(x => x.Path.Split(".")?[x.Path.Split(".").Count() - 1]).ToList().Where(x => x.Contains("x_cw")).FirstOrDefault();
            if (!string.IsNullOrEmpty(message))
            {
                var message3 = val["paths"][endPoint][endpointType][message];
            }
            var kk = val.Properties();

            var parameters = new List<Parameter>();
            GetParametersByApiType(endPoint, document, parameters, endpointType, val);
            return JsonConvert.SerializeObject(parameters);
        }

        private void GetParametersByApiType(string endPoint, OpenApiDocument document, List<Parameter> parameters, string endpointType, JObject val = null)
        {
            var parameterNames = fetchAllParameterTypes(endPoint, document, endpointType);
            if (parameterNames != null)
            {
                foreach (OpenApiParameterKind parameterName in parameterNames)
                {
                    if (parameterName.ToString() == "Body")
                    {
                        var myVal = fetchParameterByBodyType(endPoint, document, endpointType, parameterName.ToString());
                        parameters.AddRange(myVal);
                    }
                    else
                    {
                        var myVal = fetchParameterByType(endPoint, document, endpointType, parameterName.ToString());
                        parameters.AddRange(myVal);
                    }
                }
            }
        }
        public List<OpenApiParameterKind> fetchAllParameterTypes(string endPoint, OpenApiDocument document, string endpointType)
        {
            var values = document.Paths.Where(x => x.Key == endPoint).FirstOrDefault();
            var apiOperations = values.Value.Where(x => x.Key == endpointType).Select(x => x.Value).ToList();
            var openApiParameters = apiOperations.Select(x => x.Parameters).ToList();
            var parameterTypes = openApiParameters.Count() > 0 ? openApiParameters[0].GroupBy(x => x.Kind).ToList().Select(x => x.Key).ToList() : null;
            return parameterTypes;
        }
        public List<Parameter> fetchParameterByBodyType(string key, OpenApiDocument document, string endpointType, string parameterType)
        {
            List<OpenApiParameter> getParameters = GetParameters(key, document, endpointType, parameterType);
            var requestSchema = getParameters.Select(x => x.ActualSchema).ToList();
            var actualProperties = requestSchema.Select(x => x.ActualProperties).ToList();
            var parameters = actualProperties[0].Values.Select(x => new Parameter { Name = x.Name, IsRequired = x.IsRequired, Type = x.Type.ToString(), In = parameterType });
            return parameters.ToList();

        }

        public List<Parameter> fetchParameterByType(string endPoint, OpenApiDocument document, string endpointType, string parameterType)
        {
            List<OpenApiParameter> parameters = GetParameters(endPoint, document, endpointType, parameterType);
            var allParameter = parameters.Select(x => new Parameter { Name = x.Name, IsRequired = x.IsRequired, Type = x.Type.ToString(), In = parameterType }).ToList();
            return allParameter;
        }

        private static List<OpenApiParameter> GetParameters(string endPoint, OpenApiDocument document, string endpointType, string parameterType)
        {
            var values = document.Paths.Where(x => x.Key == endPoint).FirstOrDefault();
            var apiOperations = values.Value.Where(x => x.Key == endpointType).Select(x => x.Value).ToList();
            var openApiParameters = apiOperations.Select(x => x.Parameters).ToList();
            var parameters = openApiParameters[0].Where(x => x.Kind.ToString() == parameterType).ToList();
            return parameters;

        }
    }
    public class Parameter
    {
        public string Name { get; set; }
        public bool IsRequired { get; set; }
        public string Type { get; set; }
        public string In { get; set; }
    }
    public class Responce
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
