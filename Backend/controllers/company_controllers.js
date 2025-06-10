import { company as Company } from "../models/company_model.js";

// ✅ Register Company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName?.trim()) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        const existingCompany = await Company.findOne({ name: companyName.trim() });

        if (existingCompany) {
            return res.status(409).json({
                message: "Company already registered",
                success: false,
            });
        }

        const newCompany = await Company.create({
            name: companyName.trim(),
            userId: req.id,
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company: newCompany,
            success: true,
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

// ✅ Get All Companies for Logged-in User
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        return res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.error("Get Companies Error:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

// ✅ Get Company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });
    } catch (error) {
        console.error("Get Company by ID Error:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

// ✅ Update Company by ID
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const companyId = req.params.id;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        // Check if the name is being changed and already exists for the same user
        if (name && name.trim() !== company.name) {
            const existingCompany = await Company.findOne({
                name: name.trim(),
                userId: req.id, // ensure name is unique for this user only
                _id: { $ne: companyId }, // exclude current company from check
            });

            if (existingCompany) {
                return res.status(409).json({
                    message: "You already have a company with this name",
                    success: false,
                });
            }

            company.name = name.trim();
        }

        if (description) company.description = description.trim();
        if (website) company.website = website.trim();
        if (location) company.location = location.trim();

        const updatedCompany = await company.save();

        return res.status(200).json({
            message: "Company updated successfully",
            company: updatedCompany,
            success: true,
        });
    } catch (error) {
        console.error("Update Company Error:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};
