import express, { Request, Response } from 'express'
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enable CORS
import cors from 'cors';
app.use(cors({
  origin: '*',
  credentials: true
}));

// Static folder
import path from 'path';
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

// DB Connection
import { ConnectDB } from './db';
ConnectDB();

// Routes
import investorRoutes from './routes/investor.routes';
import officeRoutes from './routes/office.routes';
import contactRoutes from './routes/contact.routes';
import partnerRoutes from './routes/partner.routes';
import galleryRoutes from './routes/gallery.routes';
import newsRoutes from './routes/news.routes';
import eventRoutes from './routes/event.routes';
import careerRoutes from './routes/career.routes';
import employeeRoutes from './routes/employee.routes';
import salesExpertRoutes from './routes/salesExpert.routes';
import videoRoutes from './routes/video.routes';
import blogRoutes from './routes/blog.routes';
import teamMemberRoutes from './routes/teamMember.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import travelPackageRoutes from './routes/travelPackage.routes';
import travelInquiryRoutes from './routes/travelInquiry.routes';
import formRoutes from './routes/form.routes';
import documentRoutes from './routes/document.routes';
import faqRoutes from './routes/faq.routes';
import contentSectionRoutes from './routes/contentSection.routes';
import pricingPlanRoutes from './routes/pricingPlan.routes';
import formImageRoutes from './routes/formImage.routes';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/investor', investorRoutes);
app.use('/api/office', officeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/sales-experts', salesExpertRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/team-members', teamMemberRoutes);
app.use('/api/travel-packages', travelPackageRoutes);
app.use('/api/travel-inquiries', travelInquiryRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/content-sections', contentSectionRoutes);
app.use('/api/pricing-plans', pricingPlanRoutes);
app.use('/api/form-images', formImageRoutes);

import formEmployeesAddressRoutes from './routes/formEmployeesAddress.routes';
import formSubmissionRoutes from './routes/formSubmission.routes';
app.use('/api/form-employees-addresses', formEmployeesAddressRoutes);
app.use('/api/form-submissions', formSubmissionRoutes);




app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});