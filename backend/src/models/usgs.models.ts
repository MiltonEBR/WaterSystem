export interface DailyValuesResponse {
  name: string,
  declaredType: string,
  scope: string,
  value: {
    queryInfo: QueryInfo,
    timeSeries: TimeSeries[]
  },
  nil: boolean,
  globalScope: true,
  typeSubstituded: boolean
}

interface QueryInfo {
  queryUrl: string,
  criteria: {
    locationParam: string,
    variableParam: string,
    parameter: {name:string, value:string}[]
  },
  note: {value:string, title:string}[]
}

interface TimeSeries {
  sourceInfo: SourceInfo,
  variable: Variable,
  values: Values[],
  name:string
}

interface SourceInfo {
  siteName: string,
  siteCode: {value: string, network: string, agencyCode: string}[],
  timeZoneInfo: {
    defaultTimeZone: {
      zoneOffset: string,
      zoneAbbreviation: string
    },
    daylightSavingsTimeZone: {
      zoneOffset: string,
      zoneAbbreviation: string
    },
    siteUsesDaylightSavingsTime: boolean
  },
  geoLocation: {
    geoLocation: {
      srs: string,
      latitude: number,
      longitude: number
    },
    localSiteXY: any[]
  }
  note: any[],
  siteType: any[],
  siteProperty: {value:string, name:string}[]
}

interface Variable {
  variableCode: {value:string, network:string, vocabulary:string, variableID: number, default:boolean}[],
  variableName: string,
  variableDescription: string,
  valueType: string,
  unit: {
    unitCode: string
  },
  options: {
    option: {value:string, name:string, optionCode: string}[]
  },
  note: any[],
  noDataValue: number,
  variableProperty: any[]
  oid: string
}

interface Values {
  value: {value:string,qualifiers:string[],dateTime: string}[],
  qualifier: {qualifierCode: string, qualifierDescription: string, qualifierID: number, network: string, vocabulary: string}[],
  qualityControlLevel: any[],
  method: {methodDescription: string, methodID: number}[],
  source: any[],
  offset: any[],
  sample: any[],
  censorCode: any[]
}