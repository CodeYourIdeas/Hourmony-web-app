export interface JobApplicant {
    S: string;
  }

  export interface JobAddress {
    S: string;
  }

  export interface JobLocation {
    S: string;
  }

  export interface UserId {
    S: string;
  }

  export interface Salary {
    S: string;
  }

  export interface JobDescription {
    S: string;
  }

  export interface JobHourLog {
    N: string;
  }

  export interface JobskillRequirements {
    S: string;
  }

  export interface MinWage {
    N: string;
  }

  export interface JobPoster {
    S: string;
  }

  export interface Title {
    S: string;
  }

  export interface JobTitle {
    S: string;
  }

  export interface JobUpdateRequest {
    BOOL: boolean;
  }

  export interface JobWeekdays {
    S: string;
  }

  export interface JobTemplate {
    S: string;
  }

  export interface JobId {
    S: string;
  }

  export interface JobStartTime {
    S: string;
  }

  export interface JobDuration {
    N: string;
  }

  export interface Lang {
    SS: number[];
  }

  export interface Lat {
    SS: number[];
  }

  export interface M {
    lang: Lang;
    lat: Lat;
  }

  export interface JobGeoLocation {
    M: M;
  }

  export interface JobRate {
    N: string;
  }

  export interface JobStartDate {
    S: string;
  }

  export interface JobEndDate {
   S: string;
  }

  export interface Item {
    job_applicant: JobApplicant;
    job_address: JobAddress;
    job_location: JobLocation;
    userId: UserId;
    salary: Salary;
    job_description: JobDescription;
    job_hour_log: JobHourLog;
    jobskill_requirements: JobskillRequirements;
    min_wage: MinWage;
    job_poster: JobPoster;
    title: Title;
    job_title: JobTitle;
    job_update_request: JobUpdateRequest;
    job_weekdays: JobWeekdays;
    job_template: JobTemplate;
    jobId: JobId;
    job_StartTime: JobStartTime;
    job_duration: JobDuration;
    job_geo_location: JobGeoLocation;
    job_rate: JobRate;
    job_StartDate: JobStartDate;
    job_EndDate: JobEndDate;
  }

  export interface CurrentJobs {
    Items: Item[];
    Count: number;
    ScannedCount: number;
  }

