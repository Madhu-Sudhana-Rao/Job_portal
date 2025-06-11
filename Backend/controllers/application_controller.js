import { Application } from "../models/application_model.js";
import { job } from "../models/job_models.js";

export const applyjob = async (req, res)=> {
    try {
        const userId = req.id;
        const jobid = req.params.id;
        if (!jobid) {
            return res.status(400).json({
                message: "Job is required",
                success : false
            })
        }

        const exsistingApplication = await Application.findOne({ job: jobid, applicant: userId });
        if (exsistingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });

        }

        const job = await job.findById(jobid)

        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success:false
            })
        }

        const newapplication = await Application.create({
            job: jobid,
            applicant:userId,
        })

        job.application.push(newapplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getApplication = async (req, res) => {
    try {
        const userId=req.id;
        const application = await Application.find({ applicant: userId }).sort({ crearedAt: -1 }).populate({
            path: "jobs",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!application) {
            return res.status(404).json({
                message: "No Application",
                success: false
            })
        }
        if(!application) {
                return res.status(404).json({
                    message: "No Application",
                    success:false
                })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getapplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await job.findById(jobId).populate({
            path: "application",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success:false
            })
        };

        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateStatus = async (res, req) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "Job not found",
                success:false
            })
        };

        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application Not found",
                success:false
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(201).json({
            message: "Job applied successfully",
            
        })
    } catch (error) {
        console.log(error);
        
    }
}