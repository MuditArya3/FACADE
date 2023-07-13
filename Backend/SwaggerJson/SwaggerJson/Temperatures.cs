namespace SwaggerJson
{
    using System;
    using System.Collections.Generic;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class Temperatures
    {
        [JsonProperty("consumes")]
        public string[] Consumes { get; set; }

        [JsonProperty("produces")]
        public string[] Produces { get; set; }

        [JsonProperty("schemes")]
        public string[] Schemes { get; set; }

        [JsonProperty("swagger")]
        public string Swagger { get; set; }

        [JsonProperty("info")]
        public Info Info { get; set; }

        [JsonProperty("host")]
        public string Host { get; set; }

        [JsonProperty("basePath")]
        public string BasePath { get; set; }

        [JsonProperty("paths")]
        public Paths Paths { get; set; }

        [JsonProperty("definitions")]
        public Definitions Definitions { get; set; }

        [JsonProperty("responses")]
        public Responses Responses { get; set; }

        internal static object FromJson(string jsonString)
        {
            throw new NotImplementedException();
        }
    }

    public partial class Definitions
    {
        [JsonProperty("alertsyncreset")]
        public Alertsyncreset Alertsyncreset { get; set; }

        [JsonProperty("maintenanceResource")]
        public MaintenanceResource MaintenanceResource { get; set; }

        [JsonProperty("MaintenanceRespSchCollection")]
        public MaintenanceRespSchCollection MaintenanceRespSchCollection { get; set; }

        [JsonProperty("MaintenanceRespSch")]
        public DesktopResp MaintenanceRespSch { get; set; }

        [JsonProperty("OSPatchPolicyDetailsResponse")]
        public AuthZErrorResponseClass OsPatchPolicyDetailsResponse { get; set; }

        [JsonProperty("OSPatchPolicyDetails")]
        public OsPatchPolicyDetails OsPatchPolicyDetails { get; set; }

        [JsonProperty("OSPatchPolicyMigratePayload")]
        public OsPatchPolicyMigratePayload OsPatchPolicyMigratePayload { get; set; }

        [JsonProperty("OSPatchPolicyMigrateResponse")]
        public OsPatchPolicyMigrateResponseClass OsPatchPolicyMigrateResponse { get; set; }

        [JsonProperty("errorResponse")]
        public OsPatchPolicyMigrateResponseClass ErrorResponse { get; set; }

        [JsonProperty("GetEmailsVsUserIdsPayload")]
        public GetEmailsVsUserIdsPayload GetEmailsVsUserIdsPayload { get; set; }

        [JsonProperty("GetEmailsVsUserIdsResponse")]
        public AuthZErrorResponseClass GetEmailsVsUserIdsResponse { get; set; }

        [JsonProperty("EmailIdsAndFnameDetails")]
        public EmailIdsAndFnameDetails EmailIdsAndFnameDetails { get; set; }

        [JsonProperty("CWUserIdAndUserIdResponse")]
        public CwUserIdAndUserIdResponse CwUserIdAndUserIdResponse { get; set; }

        [JsonProperty("CWIdMappingsResponse")]
        public AuthZErrorResponseClass CwIdMappingsResponse { get; set; }

        [JsonProperty("CWIdMappings")]
        public CwIdMappings CwIdMappings { get; set; }

        [JsonProperty("AuthZErrorResponse")]
        public AuthZErrorResponseClass AuthZErrorResponse { get; set; }

        [JsonProperty("AuthZError")]
        public AuthZError AuthZError { get; set; }

        [JsonProperty("RebootScheduleDetailsResponse")]
        public RebootScheduleDetailsResponse RebootScheduleDetailsResponse { get; set; }

        [JsonProperty("RebootScheduleErrResponse")]
        public ErrResponse RebootScheduleErrResponse { get; set; }

        [JsonProperty("PartnerNotificationsDetailsResponse")]
        public DesktopResponseClass PartnerNotificationsDetailsResponse { get; set; }

        [JsonProperty("PartnerNotifications")]
        public PartnerNotifications PartnerNotifications { get; set; }

        [JsonProperty("PartnerNotificationsErrResponse")]
        public ErrResponse PartnerNotificationsErrResponse { get; set; }

        [JsonProperty("DesktopResponse")]
        public DesktopResponseClass DesktopResponse { get; set; }

        [JsonProperty("DesktopResp")]
        public DesktopResp DesktopResp { get; set; }
    }

    public partial class Alertsyncreset
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("required")]
        public string[] AlertsyncresetRequired { get; set; }

        [JsonProperty("properties")]
        public AlertsyncresetProperties Properties { get; set; }
    }

    public partial class AlertsyncresetProperties
    {
        [JsonProperty("resetall")]
        public CwPartnerId Resetall { get; set; }

        [JsonProperty("alertid")]
        public UserIds Alertid { get; set; }
    }

    public partial class UserIds
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("items")]
        public UserIdsItems Items { get; set; }
    }

    public partial class UserIdsItems
    {
    }

    public partial class CwPartnerId
    {
        [JsonProperty("type")]
        public TypeEnum Type { get; set; }
    }

    public partial class AuthZError
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public AuthZErrorProperties Properties { get; set; }
    }

    public partial class AuthZErrorProperties
    {
        [JsonProperty("error")]
        public Error Error { get; set; }
    }

    public partial class Error
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public ErrorProperties Properties { get; set; }
    }

    public partial class ErrorProperties
    {
        [JsonProperty("code")]
        public CwPartnerId Code { get; set; }

        [JsonProperty("message")]
        public CwPartnerId Message { get; set; }
    }

    public partial class AuthZErrorResponseClass
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public AuthZErrorResponseProperties Properties { get; set; }
    }

    public partial class AuthZErrorResponseProperties
    {
        [JsonProperty("outdata")]
        public ValuesClass Outdata { get; set; }

        [JsonProperty("status")]
        public Status Status { get; set; }
    }

    public partial class ValuesClass
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("items")]
        public OutdataValue Items { get; set; }
    }

    public partial class OutdataValue
    {
        [JsonProperty("$ref")]
        public string Ref { get; set; }
    }

    public partial class Status
    {
        [JsonProperty("type")]
        public TypeEnum Type { get; set; }

        [JsonProperty("format")]
        public Format Format { get; set; }
    }

    public partial class CwIdMappings
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public CwIdMappingsProperties Properties { get; set; }
    }

    public partial class CwIdMappingsProperties
    {
        [JsonProperty("CWPartnerId")]
        public CwPartnerId CwPartnerId { get; set; }

        [JsonProperty("CWUserId")]
        public CwPartnerId CwUserId { get; set; }
    }

    public partial class CwUserIdAndUserIdResponse
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public CwUserIdAndUserIdResponseProperties Properties { get; set; }
    }

    public partial class CwUserIdAndUserIdResponseProperties
    {
        [JsonProperty("CWUserId")]
        public CwPartnerId CwUserId { get; set; }

        [JsonProperty("UserID")]
        public CwPartnerId UserId { get; set; }
    }

    public partial class DesktopResp
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public Dictionary<string, CwPartnerId> Properties { get; set; }
    }

    public partial class DesktopResponseClass
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public DesktopResponseProperties Properties { get; set; }
    }

    public partial class DesktopResponseProperties
    {
        [JsonProperty("values")]
        public ValuesClass Values { get; set; }
    }

    public partial class EmailIdsAndFnameDetails
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public EmailIdsAndFnameDetailsProperties Properties { get; set; }
    }

    public partial class EmailIdsAndFnameDetailsProperties
    {
        [JsonProperty("email")]
        public CwPartnerId Email { get; set; }

        [JsonProperty("name")]
        public CwPartnerId Name { get; set; }
    }

    public partial class OsPatchPolicyMigrateResponseClass
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public OsPatchPolicyMigrateResponseProperties Properties { get; set; }
    }

    public partial class OsPatchPolicyMigrateResponseProperties
    {
        [JsonProperty("outdata")]
        public PurpleOutdata Outdata { get; set; }

        [JsonProperty("status")]
        public Status Status { get; set; }
    }

    public partial class PurpleOutdata
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("x-nullable")]
        public bool XNullable { get; set; }
    }

    public partial class GetEmailsVsUserIdsPayload
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public GetEmailsVsUserIdsPayloadProperties Properties { get; set; }
    }

    public partial class GetEmailsVsUserIdsPayloadProperties
    {
        [JsonProperty("type")]
        public CwPartnerId Type { get; set; }

        [JsonProperty("userIds")]
        public UserIds UserIds { get; set; }
    }

    public partial class MaintenanceResource
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public MaintenanceResourceProperties Properties { get; set; }
    }

    public partial class MaintenanceResourceProperties
    {
        [JsonProperty("resourceID")]
        public UserIds ResourceId { get; set; }
    }

    public partial class MaintenanceRespSchCollection
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public MaintenanceRespSchCollectionProperties Properties { get; set; }
    }

    public partial class MaintenanceRespSchCollectionProperties
    {
        [JsonProperty("outdata")]
        public OutdataValue Outdata { get; set; }

        [JsonProperty("status")]
        public CwPartnerId Status { get; set; }
    }

    public partial class OsPatchPolicyDetails
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public OsPatchPolicyDetailsProperties Properties { get; set; }
    }

    public partial class OsPatchPolicyDetailsProperties
    {
        [JsonProperty("ConfigString")]
        public ConfigString ConfigString { get; set; }

        [JsonProperty("DcDtime")]
        public ConfigString DcDtime { get; set; }

        [JsonProperty("PolicyId")]
        public Status PolicyId { get; set; }

        [JsonProperty("PolicyName")]
        public CwPartnerId PolicyName { get; set; }

        [JsonProperty("UpdcdTime")]
        public UpdcdTime UpdcdTime { get; set; }
    }

    public partial class ConfigString
    {
        [JsonProperty("type")]
        public TypeEnum Type { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }

    public partial class UpdcdTime
    {
        [JsonProperty("type")]
        public TypeEnum Type { get; set; }

        [JsonProperty("x-nullable")]
        public bool XNullable { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }

    public partial class OsPatchPolicyMigratePayload
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public OsPatchPolicyMigratePayloadProperties Properties { get; set; }
    }

    public partial class OsPatchPolicyMigratePayloadProperties
    {
        [JsonProperty("partnerid")]
        public CwPartnerId Partnerid { get; set; }

        [JsonProperty("resourceids")]
        public CwPartnerId Resourceids { get; set; }

        [JsonProperty("action")]
        public CwPartnerId Action { get; set; }

        [JsonProperty("useremailid")]
        public CwPartnerId Useremailid { get; set; }
    }

    public partial class PartnerNotifications
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public PartnerNotificationsProperties Properties { get; set; }
    }

    public partial class PartnerNotificationsProperties
    {
        [JsonProperty("id")]
        public CwPartnerId Id { get; set; }

        [JsonProperty("value")]
        public CwPartnerId Value { get; set; }
    }

    public partial class ErrResponse
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public PartnerNotificationsErrResponseProperties Properties { get; set; }
    }

    public partial class PartnerNotificationsErrResponseProperties
    {
        [JsonProperty("status")]
        public Status Status { get; set; }

        [JsonProperty("errmsg")]
        public CwPartnerId Errmsg { get; set; }
    }

    public partial class RebootScheduleDetailsResponse
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("items")]
        public RebootScheduleDetailsResponseItems Items { get; set; }
    }

    public partial class RebootScheduleDetailsResponseItems
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public ItemsProperties Properties { get; set; }
    }

    public partial class ItemsProperties
    {
        [JsonProperty("memberId")]
        public CwPartnerId MemberId { get; set; }

        [JsonProperty("templateId")]
        public CwPartnerId TemplateId { get; set; }

        [JsonProperty("name")]
        public CwPartnerId Name { get; set; }

        [JsonProperty("daysOfWeek")]
        public DaysOfWeek DaysOfWeek { get; set; }

        [JsonProperty("startTime")]
        public CwPartnerId StartTime { get; set; }

        [JsonProperty("endTime")]
        public CwPartnerId EndTime { get; set; }

        [JsonProperty("every")]
        public Status Every { get; set; }

        [JsonProperty("frequency")]
        public CwPartnerId Frequency { get; set; }
    }

    public partial class DaysOfWeek
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("items")]
        public Status Items { get; set; }
    }

    public partial class Info
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("version")]
        public string Version { get; set; }
    }

    public partial class Paths
    {
        [JsonProperty("/v1/partners/{partnerID}/sites/{siteID}/resources/{resourceID}/alerts")]
        public V1PartnersPartnerId V1PartnersPartnerIdSitesSiteIdResourcesResourceIdAlerts { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/sites/{siteID}/resources/{resourceID}/tickets")]
        public V1PartnersPartnerId V1PartnersPartnerIdSitesSiteIdResourcesResourceIdTickets { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/users/{userID}/mAuth")]
        public V1PartnersPartnerId V1PartnersPartnerIdUsersUserIdMAuth { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/migrateEntitlement")]
        public V1PartnersPartnerId V1PartnersPartnerIdMigrateEntitlement { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/clients/{clientID}/migrateEntitlement")]
        public V1PartnersPartnerId V1PartnersPartnerIdClientsClientIdMigrateEntitlement { get; set; }

        [JsonProperty("/version")]
        public Version Version { get; set; }

        [JsonProperty("/v1/alerts")]
        public V1Alerts V1Alerts { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/clients/{clientID}/sites/{siteID}/GetScheduleDetails")]
        public V1AuthzClass V1PartnersPartnerIdClientsClientIdSitesSiteIdGetScheduleDetails { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/sites/{siteID}/resources/{resourceID}/conditions/{conditionID}validatePassword")]
        public V1PartnersPartnerIdSitesSiteId V1PartnersPartnerIdSitesSiteIdResourcesResourceIdConditionsConditionIdValidatePassword { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/sites/{siteID}/conditions/{conditionID}validatePassword")]
        public V1PartnersPartnerIdSitesSiteId V1PartnersPartnerIdSitesSiteIdConditionsConditionIdValidatePassword { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/sites/{siteID}/resources/{resourceID}/ValidatePasswordVault")]
        public V1PartnersPartnerIdSitesSiteId V1PartnersPartnerIdSitesSiteIdResourcesResourceIdValidatePasswordVault { get; set; }

        [JsonProperty("/v1/resources/{resourceID}/ospatchpolicy")]
        public V1EnduserPartnerIdSiteIdSiteIdUsersUserIdDesktopsClass V1ResourcesResourceIdOspatchpolicy { get; set; }

        [JsonProperty("/v1/ospatchpolicymigrate")]
        public V1Ospatchpolicymigrate V1Ospatchpolicymigrate { get; set; }

        [JsonProperty("/v1/authz")]
        public V1AuthzClass V1Authz { get; set; }

        [JsonProperty("/v1/emails/{emailId}/authz")]
        public V1EmailsEmailIdAuthz V1EmailsEmailIdAuthz { get; set; }

        [JsonProperty("/v1/partners/{partnerId}/users/{userId}/authz")]
        public V1PartnersPartnerIdUsersUserIdAuthz V1PartnersPartnerIdUsersUserIdAuthz { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/rebootschedules")]
        public V1EnduserPartnerIdSiteIdSiteIdUsersUserIdDesktopsClass V1PartnersPartnerIdRebootschedules { get; set; }

        [JsonProperty("/v1/partners/{partnerID}/notifications")]
        public V1EnduserPartnerIdSiteIdSiteIdUsersUserIdDesktopsClass V1PartnersPartnerIdNotifications { get; set; }

        [JsonProperty("/v1/enduser/{partnerId}/siteId/{siteId}/users/{userId}/desktops")]
        public V1EnduserPartnerIdSiteIdSiteIdUsersUserIdDesktopsClass V1EnduserPartnerIdSiteIdSiteIdUsersUserIdDesktops { get; set; }
    }

    public partial class V1Alerts
    {
        [JsonProperty("put")]
        public Put Put { get; set; }
    }

    public partial class Put
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("consumes")]
        public string[] Consumes { get; set; }

        [JsonProperty("produces")]
        public string[] Produces { get; set; }

        [JsonProperty("parameters")]
        public PutParameter[] Parameters { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, OutdataValue> Responses { get; set; }
    }

    public partial class PutParameter
    {
        [JsonProperty("in")]
        public string In { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("type", NullValueHandling = NullValueHandling.Ignore)]
        public TypeEnum? Type { get; set; }

        [JsonProperty("description", NullValueHandling = NullValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty("required", NullValueHandling = NullValueHandling.Ignore)]
        public bool? ParameterRequired { get; set; }

        [JsonProperty("schema", NullValueHandling = NullValueHandling.Ignore)]
        public OutdataValue Schema { get; set; }
    }

    public partial class V1AuthzClass
    {
        [JsonProperty("post")]
        public V1AuthzPost Post { get; set; }
    }

    public partial class V1AuthzPost
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("operationId")]
        public string OperationId { get; set; }

        [JsonProperty("parameters")]
        public PutParameter[] Parameters { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, PostResponse> Responses { get; set; }
    }

    public partial class PostResponse
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("schema")]
        public OutdataValue Schema { get; set; }
    }

    public partial class V1EmailsEmailIdAuthz
    {
        [JsonProperty("get")]
        public V1EmailsEmailIdAuthzGet Get { get; set; }
    }

    public partial class V1EmailsEmailIdAuthzGet
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("operationId")]
        public string OperationId { get; set; }

        [JsonProperty("parameters")]
        public GetParameter[] Parameters { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, PostResponse> Responses { get; set; }
    }

    public partial class GetParameter
    {
        [JsonProperty("type")]
        public TypeEnum Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("in")]
        public In In { get; set; }

        [JsonProperty("required")]
        public bool ParameterRequired { get; set; }

        [JsonProperty("description", NullValueHandling = NullValueHandling.Ignore)]
        public string Description { get; set; }
    }

    public partial class V1EnduserPartnerIdSiteIdSiteIdUsersUserIdDesktopsClass
    {
        [JsonProperty("get")]
        public V1EnduserPartnerIdSiteIdSiteIdUsersUserIdDesktopsGet Get { get; set; }
    }

    public partial class V1EnduserPartnerIdSiteIdSiteIdUsersUserIdDesktopsGet
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("operationId", NullValueHandling = NullValueHandling.Ignore)]
        public string OperationId { get; set; }

        [JsonProperty("parameters")]
        public GetParameter[] Parameters { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, PostResponse> Responses { get; set; }
    }

    public partial class V1Ospatchpolicymigrate
    {
        [JsonProperty("post")]
        public V1OspatchpolicymigratePost Post { get; set; }
    }

    public partial class V1OspatchpolicymigratePost
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("parameters")]
        public PurpleParameter[] Parameters { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, PostResponse> Responses { get; set; }
    }

    public partial class PurpleParameter
    {
        [JsonProperty("in")]
        public string In { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("schema")]
        public OutdataValue Schema { get; set; }
    }

    public partial class V1PartnersPartnerId
    {
        [JsonProperty("get")]
        public V1PartnersPartnerIdClientsClientIdMigrateEntitlementGet Get { get; set; }
    }

    public partial class V1PartnersPartnerIdClientsClientIdMigrateEntitlementGet
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("operationId")]
        public string OperationId { get; set; }

        [JsonProperty("parameters")]
        public GetParameter[] Parameters { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, OutdataValue> Responses { get; set; }

        [JsonProperty("x_cw_operation", NullValueHandling = NullValueHandling.Ignore)]
        public string XCwOperation { get; set; }
    }

    public partial class V1PartnersPartnerIdSitesSiteId
    {
        [JsonProperty("get")]
        public V1PartnersPartnerIdSitesSiteIdConditionsConditionIdValidatePasswordGet Get { get; set; }
    }

    public partial class V1PartnersPartnerIdSitesSiteIdConditionsConditionIdValidatePasswordGet
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("operationId")]
        public string OperationId { get; set; }

        [JsonProperty("parameters")]
        public GetParameter[] Parameters { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, PurpleResponse> Responses { get; set; }
    }

    public partial class PurpleResponse
    {
        [JsonProperty("description")]
        public string Description { get; set; }
    }

    public partial class V1PartnersPartnerIdUsersUserIdAuthz
    {
        [JsonProperty("get")]
        public V1PartnersPartnerIdUsersUserIdAuthzGet Get { get; set; }
    }

    public partial class V1PartnersPartnerIdUsersUserIdAuthzGet
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("parameters")]
        public GetParameter[] Parameters { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, PostResponse> Responses { get; set; }
    }

    public partial class Version
    {
        [JsonProperty("get")]
        public VersionGet Get { get; set; }
    }

    public partial class VersionGet
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("operationId")]
        public string OperationId { get; set; }

        [JsonProperty("responses")]
        public Dictionary<string, OutdataValue> Responses { get; set; }
    }

    public partial class Responses
    {
        [JsonProperty("apiResp")]
        public ApiResp ApiResp { get; set; }

        [JsonProperty("versionResp")]
        public VersionResp VersionResp { get; set; }

        [JsonProperty("apiRespSch")]
        public ApiRespSch ApiRespSch { get; set; }
    }

    public partial class ApiResp
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("headers")]
        public ApiRespHeaders Headers { get; set; }
    }

    public partial class ApiRespHeaders
    {
        [JsonProperty("data")]
        public CwPartnerId Data { get; set; }

        [JsonProperty("status")]
        public Status Status { get; set; }
    }

    public partial class ApiRespSch
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("headers")]
        public ApiRespSchHeaders Headers { get; set; }
    }

    public partial class ApiRespSchHeaders
    {
        [JsonProperty("outdata")]
        public CwPartnerId Outdata { get; set; }

        [JsonProperty("status")]
        public Status Status { get; set; }
    }

    public partial class VersionResp
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("headers")]
        public VersionRespHeaders Headers { get; set; }
    }

    public partial class VersionRespHeaders
    {
        [JsonProperty("Build")]
        public CwPartnerId Build { get; set; }

        [JsonProperty("Major")]
        public CwPartnerId Major { get; set; }

        [JsonProperty("Minor")]
        public CwPartnerId Minor { get; set; }

        [JsonProperty("Patch")]
        public CwPartnerId Patch { get; set; }

        [JsonProperty("ServiceName")]
        public CwPartnerId ServiceName { get; set; }

        [JsonProperty("ServiceProvider")]
        public CwPartnerId ServiceProvider { get; set; }

        [JsonProperty("SolutionName")]
        public CwPartnerId SolutionName { get; set; }
    }

    public enum TypeEnum { Boolean, Integer, String };

    public enum Format { Int64 };

    public enum In { Path, Query };

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                TypeEnumConverter.Singleton,
                FormatConverter.Singleton,
                InConverter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }

    internal class TypeEnumConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(TypeEnum) || t == typeof(TypeEnum?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "boolean":
                    return TypeEnum.Boolean;
                case "integer":
                    return TypeEnum.Integer;
                case "string":
                    return TypeEnum.String;
            }
            throw new Exception("Cannot unmarshal type TypeEnum");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (TypeEnum)untypedValue;
            switch (value)
            {
                case TypeEnum.Boolean:
                    serializer.Serialize(writer, "boolean");
                    return;
                case TypeEnum.Integer:
                    serializer.Serialize(writer, "integer");
                    return;
                case TypeEnum.String:
                    serializer.Serialize(writer, "string");
                    return;
            }
            throw new Exception("Cannot marshal type TypeEnum");
        }

        public static readonly TypeEnumConverter Singleton = new TypeEnumConverter();
    }

    internal class FormatConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(Format) || t == typeof(Format?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            if (value == "int64")
            {
                return Format.Int64;
            }
            throw new Exception("Cannot unmarshal type Format");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (Format)untypedValue;
            if (value == Format.Int64)
            {
                serializer.Serialize(writer, "int64");
                return;
            }
            throw new Exception("Cannot marshal type Format");
        }

        public static readonly FormatConverter Singleton = new FormatConverter();
    }

    internal class InConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(In) || t == typeof(In?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "path":
                    return In.Path;
                case "query":
                    return In.Query;
            }
            throw new Exception("Cannot unmarshal type In");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (In)untypedValue;
            switch (value)
            {
                case In.Path:
                    serializer.Serialize(writer, "path");
                    return;
                case In.Query:
                    serializer.Serialize(writer, "query");
                    return;
            }
            throw new Exception("Cannot marshal type In");
        }

        public static readonly InConverter Singleton = new InConverter();
    }
}
