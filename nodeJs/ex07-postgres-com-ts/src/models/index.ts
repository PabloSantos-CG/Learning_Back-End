import { Candidate } from "./candidates";
import { Company } from "./companies";
import { Job } from "./jobs";

Company.hasMany(Job);
Job.belongsTo(Company);

Job.belongsToMany(Candidate, { through: "jobs_candidates" });
Candidate.belongsToMany(Job, { through: "jobs_candidates" });

export { Candidate, Company, Job };
