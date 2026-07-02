import { UseCase } from './types';

export const useCases: UseCase[] = [
  // Guest Services
  { id: '1', name: 'AI Concierge', resort: 'Karma Kandara (Bali)', department: 'Guest Services', owner: 'Sarah Jenkins', priority: 'High', status: 'Live', roiEstimate: '20%', savings: 150000, adoption: 85 },
  { id: '2', name: 'AI Reservation Assistant', resort: 'Karma Lake of Menteith (Scotland)', department: 'Guest Services', owner: 'Chloe MacDonald', priority: 'High', status: 'Live', roiEstimate: '18%', savings: 120000, adoption: 75 },
  { id: '3', name: 'Guest Feedback Analyzer', resort: 'Karma Rottnest (Australia)', department: 'Guest Services', owner: 'Olivia Jones', priority: 'Low', status: 'Live', roiEstimate: '8%', savings: 40000, adoption: 80 },
  { id: '16', name: 'VIP Profile Insights', resort: 'Karma Royal Haathi Mahal (Goa)', department: 'Guest Services', owner: 'Rajesh Kumar', priority: 'Medium', status: 'In Progress', roiEstimate: '14%', savings: 65000, adoption: 30 },
  { id: '17', name: 'Multilingual Chatbot', resort: 'Karma Sitabani (India)', department: 'Guest Services', owner: 'Amit Patel', priority: 'Medium', status: 'Proposed', roiEstimate: '11%', savings: 45000, adoption: 0 },
  
  // Housekeeping
  { id: '4', name: 'Smart Housekeeping Scheduler', resort: 'Karma Lake of Menteith (Scotland)', department: 'Housekeeping', owner: 'James Fraser', priority: 'Medium', status: 'In Progress', roiEstimate: '15%', savings: 85000, adoption: 40 },
  { id: '18', name: 'Linen Inventory Predictor', resort: 'Karma Kandara (Bali)', department: 'Housekeeping', owner: 'Wayan Sari', priority: 'Low', status: 'Live', roiEstimate: '9%', savings: 30000, adoption: 90 },
  { id: '19', name: 'Room Inspection AI', resort: 'Karma Rottnest (Australia)', department: 'Housekeeping', owner: 'Emma Wilson', priority: 'High', status: 'Proposed', roiEstimate: '22%', savings: 110000, adoption: 0 },
  { id: '20', name: 'Automated Restocking', resort: 'Karma Royal Haathi Mahal (Goa)', department: 'Housekeeping', owner: 'Priya Singh', priority: 'Medium', status: 'In Progress', roiEstimate: '12%', savings: 50000, adoption: 20 },
  { id: '21', name: 'Task Allocation Engine', resort: 'Karma Sitabani (India)', department: 'Housekeeping', owner: 'Neha Sharma', priority: 'High', status: 'Live', roiEstimate: '19%', savings: 95000, adoption: 85 },

  // Revenue
  { id: '5', name: 'Dynamic Pricing Engine', resort: 'Karma Royal Haathi Mahal (Goa)', department: 'Revenue', owner: 'Aisha Sharma', priority: 'High', status: 'Live', roiEstimate: '25%', savings: 550000, adoption: 95 },
  { id: '6', name: 'Occupancy Forecasting', resort: 'Karma Royal Haathi Mahal (Goa)', department: 'Revenue', owner: 'Aisha Sharma', priority: 'High', status: 'In Progress', roiEstimate: '20%', savings: 400000, adoption: 60 },
  { id: '22', name: 'Competitor Rate Scraper', resort: 'Karma Kandara (Bali)', department: 'Revenue', owner: 'Budi Santoso', priority: 'Medium', status: 'Live', roiEstimate: '18%', savings: 200000, adoption: 100 },
  { id: '23', name: 'Group Booking Optimizer', resort: 'Karma Lake of Menteith (Scotland)', department: 'Revenue', owner: 'Liam Smith', priority: 'Low', status: 'Proposed', roiEstimate: '10%', savings: 80000, adoption: 0 },
  { id: '24', name: 'Upsell Probability Model', resort: 'Karma Rottnest (Australia)', department: 'Revenue', owner: 'Olivia Jones', priority: 'High', status: 'In Progress', roiEstimate: '21%', savings: 150000, adoption: 45 },

  // Marketing
  { id: '7', name: 'AI Review Sentiment Analysis', resort: 'Karma Rottnest (Australia)', department: 'Marketing', owner: 'Liam Smith', priority: 'Medium', status: 'Live', roiEstimate: '10%', savings: 60000, adoption: 100 },
  { id: '8', name: 'AI Marketing Campaign Generator', resort: 'Karma Lake of Menteith (Scotland)', department: 'Marketing', owner: 'Emma Croft', priority: 'Low', status: 'Proposed', roiEstimate: '12%', savings: 85000, adoption: 0 },
  { id: '25', name: 'Personalized Email AI', resort: 'Karma Kandara (Bali)', department: 'Marketing', owner: 'Sarah Jenkins', priority: 'High', status: 'Live', roiEstimate: '25%', savings: 120000, adoption: 90 },
  { id: '26', name: 'Social Media Trend Spotter', resort: 'Karma Royal Haathi Mahal (Goa)', department: 'Marketing', owner: 'Rajesh Kumar', priority: 'Medium', status: 'In Progress', roiEstimate: '14%', savings: 45000, adoption: 35 },
  { id: '27', name: 'Ad Spend Optimizer', resort: 'Karma Sitabani (India)', department: 'Marketing', owner: 'Amit Patel', priority: 'High', status: 'Live', roiEstimate: '28%', savings: 210000, adoption: 80 },

  // Engineering
  { id: '9', name: 'Predictive Maintenance', resort: 'Karma Sitabani (India)', department: 'Engineering', owner: 'Rahul Patel', priority: 'High', status: 'Proposed', roiEstimate: '30%', savings: 250000, adoption: 0 },
  { id: '10', name: 'Energy Optimization', resort: 'Karma Sitabani (India)', department: 'Engineering', owner: 'Amit Kumar', priority: 'High', status: 'In Progress', roiEstimate: '22%', savings: 180000, adoption: 50 },
  { id: '28', name: 'Water Usage Analytics', resort: 'Karma Kandara (Bali)', department: 'Engineering', owner: 'Wayan Sari', priority: 'Medium', status: 'Live', roiEstimate: '15%', savings: 75000, adoption: 95 },
  { id: '29', name: 'HVAC Smart Control', resort: 'Karma Rottnest (Australia)', department: 'Engineering', owner: 'Emma Wilson', priority: 'Low', status: 'In Progress', roiEstimate: '11%', savings: 40000, adoption: 15 },
  { id: '30', name: 'Equipment Lifecycle AI', resort: 'Karma Lake of Menteith (Scotland)', department: 'Engineering', owner: 'James Fraser', priority: 'Medium', status: 'Live', roiEstimate: '17%', savings: 90000, adoption: 70 },

  // Food & Beverage
  { id: '11', name: 'Restaurant Demand Forecasting', resort: 'Karma Kandara (Bali)', department: 'Food & Beverage', owner: 'Chef Antoine', priority: 'Medium', status: 'In Progress', roiEstimate: '12%', savings: 90000, adoption: 30 },
  { id: '12', name: 'Inventory Optimization', resort: 'Karma Sitabani (India)', department: 'Food & Beverage', owner: 'Sanjay Gupta', priority: 'Medium', status: 'Live', roiEstimate: '14%', savings: 110000, adoption: 90 },
  { id: '31', name: 'Waste Reduction Model', resort: 'Karma Royal Haathi Mahal (Goa)', department: 'Food & Beverage', owner: 'Priya Singh', priority: 'High', status: 'Live', roiEstimate: '24%', savings: 130000, adoption: 85 },
  { id: '32', name: 'Dynamic Menu Pricing', resort: 'Karma Rottnest (Australia)', department: 'Food & Beverage', owner: 'Olivia Jones', priority: 'Low', status: 'Proposed', roiEstimate: '8%', savings: 35000, adoption: 0 },
  { id: '33', name: 'Supplier Quality AI', resort: 'Karma Lake of Menteith (Scotland)', department: 'Food & Beverage', owner: 'Chloe MacDonald', priority: 'Medium', status: 'In Progress', roiEstimate: '13%', savings: 55000, adoption: 25 },

  // HR
  { id: '13', name: 'AI Staff Scheduling', resort: 'Karma Royal Haathi Mahal (Goa)', department: 'HR', owner: 'Priya Singh', priority: 'Medium', status: 'Proposed', roiEstimate: '15%', savings: 75000, adoption: 0 },
  { id: '14', name: 'AI Knowledge Assistant', resort: 'Karma Kandara (Bali)', department: 'HR', owner: 'Budi Santoso', priority: 'Medium', status: 'Proposed', roiEstimate: '10%', savings: 55000, adoption: 0 },
  { id: '34', name: 'Candidate Screening AI', resort: 'Karma Rottnest (Australia)', department: 'HR', owner: 'Liam Smith', priority: 'Low', status: 'Live', roiEstimate: '7%', savings: 25000, adoption: 100 },
  { id: '35', name: 'Employee Retention Predictor', resort: 'Karma Lake of Menteith (Scotland)', department: 'HR', owner: 'Emma Croft', priority: 'High', status: 'In Progress', roiEstimate: '19%', savings: 140000, adoption: 40 },
  { id: '36', name: 'Training Plan Generator', resort: 'Karma Sitabani (India)', department: 'HR', owner: 'Neha Sharma', priority: 'Medium', status: 'Live', roiEstimate: '12%', savings: 45000, adoption: 75 },

  // Spa
  { id: '15', name: 'Spa Recommendation Engine', resort: 'Karma Rottnest (Australia)', department: 'Spa', owner: 'Mia Williams', priority: 'Medium', status: 'In Progress', roiEstimate: '18%', savings: 150000, adoption: 45 },
  { id: '37', name: 'Therapist Utilization Optimizer', resort: 'Karma Kandara (Bali)', department: 'Spa', owner: 'Sarah Jenkins', priority: 'High', status: 'Live', roiEstimate: '22%', savings: 110000, adoption: 90 },
  { id: '38', name: 'Dynamic Spa Yield', resort: 'Karma Lake of Menteith (Scotland)', department: 'Spa', owner: 'James Fraser', priority: 'Low', status: 'Proposed', roiEstimate: '9%', savings: 35000, adoption: 0 },
  { id: '39', name: 'Product Inventory AI', resort: 'Karma Royal Haathi Mahal (Goa)', department: 'Spa', owner: 'Aisha Sharma', priority: 'Medium', status: 'Live', roiEstimate: '14%', savings: 60000, adoption: 85 },
  { id: '40', name: 'Guest Preference Tracker', resort: 'Karma Sitabani (India)', department: 'Spa', owner: 'Rahul Patel', priority: 'High', status: 'In Progress', roiEstimate: '20%', savings: 95000, adoption: 35 },
];
