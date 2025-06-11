import { job } from "../models/job_models.js";

export const post_job = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const jobPost = await job.create({
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            success: true,
            job: jobPost
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while creating job",
            success: false
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await job.find(query).populate({
            path: "company",
            
        }).sort({createdAt:-1});
        if (!jobs.length) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while fetching jobs",
            success: false
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const jobPost = await job.findById(jobId);

        if (!jobPost) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({ job: jobPost, success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while fetching job",
            success: false
        });
    }
};

export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await job.find({ created_by: adminId });

        if (!jobs.length) {
            return res.status(404).json({
                message: "No jobs found for admin",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while fetching admin jobs",
            success: false
        });
    }
};