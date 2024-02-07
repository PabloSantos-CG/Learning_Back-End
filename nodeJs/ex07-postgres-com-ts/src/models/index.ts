import { Candidate } from "./candidates";
import { Company } from "./companies";
import { Job } from "./jobs";

Company.hasMany(Job);
Job.belongsTo(Company);

export {
  Candidate,
  Company,
  Job
};