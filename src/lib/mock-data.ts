import {
  BarChart3,
  Shield,
  Zap,
  Globe,
  Users,
  LineChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Activity,
  Server,
  Cpu,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

// Landing page data
export const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: BarChart3,
    title: "Real-time Dashboards",
    description:
      "Monitor your metrics as they happen with live-updating dashboards that refresh every second.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC2 Type II certified with end-to-end encryption, SSO, and role-based access control.",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description:
      "Let our AI surface anomalies, predict trends, and recommend actions automatically.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description:
      "Data served from 200+ edge locations worldwide for sub-50ms query responses.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share dashboards, annotate charts, and set up automated reports for your entire team.",
  },
  {
    icon: LineChart,
    title: "Custom Reports",
    description:
      "Build pixel-perfect reports with our drag-and-drop builder. Export to PDF, CSV, or API.",
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "2,000+", label: "Companies" },
  { value: "50M+", label: "Data Points/Day" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "200+", label: "Integrations" },
];

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export const pricingPlans: PricingTier[] = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small teams getting started with analytics.",
    features: [
      "Up to 5 team members",
      "10 dashboards",
      "1M events/month",
      "7-day data retention",
      "Email support",
      "Basic integrations",
    ],
    highlighted: false,
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For growing teams that need advanced analytics.",
    features: [
      "Up to 25 team members",
      "Unlimited dashboards",
      "10M events/month",
      "1-year data retention",
      "Priority support",
      "AI insights",
      "Custom reports",
      "API access",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced security and scale needs.",
    features: [
      "Unlimited team members",
      "Unlimited dashboards",
      "Unlimited events",
      "Unlimited retention",
      "24/7 dedicated support",
      "SSO & SAML",
      "Custom integrations",
      "SLA guarantee",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export const testimonials: {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}[] = [
  {
    quote:
      "PulseAnalytics transformed how we make decisions. The real-time dashboards give us confidence to move fast.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechFlow",
    avatar: "SC",
  },
  {
    quote:
      "The AI insights feature alone saved us 20 hours per week. It surfaces things we would have missed entirely.",
    name: "Marcus Johnson",
    role: "Head of Growth",
    company: "ScaleUp",
    avatar: "MJ",
  },
  {
    quote:
      "We evaluated 12 analytics tools. PulseAnalytics was the only one that combined power with simplicity.",
    name: "Emily Rodriguez",
    role: "CTO",
    company: "DataDrive",
    avatar: "ER",
  },
];

export const footerLinks: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

// Dashboard data
export interface KPIData {
  icon: LucideIcon;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

export const kpiData: KPIData[] = [
  { icon: Users, label: "Total Users", value: "24,521", change: 12.5, trend: "up" },
  { icon: DollarSign, label: "Revenue", value: "$84,254", change: 8.2, trend: "up" },
  { icon: Eye, label: "Conversion", value: "3.24%", change: -2.1, trend: "down" },
  { icon: Activity, label: "Active Sessions", value: "1,429", change: 18.7, trend: "up" },
];

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  status: "success" | "warning" | "error" | "info";
}

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    user: "Alice Wang",
    avatar: "AW",
    action: "Created dashboard",
    target: "Q4 Revenue Report",
    time: "2 min ago",
    status: "success",
  },
  {
    id: "2",
    user: "Bob Smith",
    avatar: "BS",
    action: "Triggered alert",
    target: "High Error Rate",
    time: "15 min ago",
    status: "error",
  },
  {
    id: "3",
    user: "Carol Davis",
    avatar: "CD",
    action: "Exported report",
    target: "Monthly KPIs",
    time: "1 hour ago",
    status: "info",
  },
  {
    id: "4",
    user: "Dan Miller",
    avatar: "DM",
    action: "Updated integration",
    target: "Slack Webhook",
    time: "2 hours ago",
    status: "warning",
  },
  {
    id: "5",
    user: "Eve Johnson",
    avatar: "EJ",
    action: "Shared dashboard",
    target: "Marketing Funnel",
    time: "3 hours ago",
    status: "success",
  },
];

// Chart mock data
export const revenueChartData = [
  { month: "Jan", value: 42000 },
  { month: "Feb", value: 45000 },
  { month: "Mar", value: 48000 },
  { month: "Apr", value: 51000 },
  { month: "May", value: 53000 },
  { month: "Jun", value: 58000 },
  { month: "Jul", value: 62000 },
  { month: "Aug", value: 65000 },
  { month: "Sep", value: 72000 },
  { month: "Oct", value: 76000 },
  { month: "Nov", value: 80000 },
  { month: "Dec", value: 84000 },
];

export const userGrowthData = [
  { month: "Jan", value: 12400 },
  { month: "Feb", value: 14200 },
  { month: "Mar", value: 15800 },
  { month: "Apr", value: 17100 },
  { month: "May", value: 18900 },
  { month: "Jun", value: 19500 },
  { month: "Jul", value: 20200 },
  { month: "Aug", value: 21000 },
  { month: "Sep", value: 22100 },
  { month: "Oct", value: 23400 },
  { month: "Nov", value: 24000 },
  { month: "Dec", value: 24521 },
];

// Admin dashboard data
export const adminKpiData: KPIData[] = [
  { icon: Server, label: "Server Load", value: "42%", change: -5.3, trend: "down" },
  { icon: Cpu, label: "Memory Usage", value: "67%", change: 3.1, trend: "up" },
  { icon: Activity, label: "API Calls/min", value: "12,847", change: 22.4, trend: "up" },
  { icon: AlertTriangle, label: "Error Rate", value: "0.12%", change: -15.2, trend: "down" },
];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "suspended";
  lastActive: string;
}

export const adminUsers: AdminUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@techflow.io",
    avatar: "SC",
    role: "admin",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@scaleup.co",
    avatar: "MJ",
    role: "editor",
    status: "active",
    lastActive: "5 min ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@datadrive.io",
    avatar: "ER",
    role: "viewer",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    avatar: "JW",
    role: "editor",
    status: "inactive",
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Lisa Park",
    email: "lisa@example.com",
    avatar: "LP",
    role: "viewer",
    status: "suspended",
    lastActive: "1 week ago",
  },
];

export interface SystemLog {
  id: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
  timestamp: string;
  source: string;
}

export const systemLogs: SystemLog[] = [
  {
    id: "1",
    type: "success",
    message: "Database backup completed successfully",
    timestamp: "2 min ago",
    source: "Backup Service",
  },
  {
    id: "2",
    type: "info",
    message: "Auto-scaling triggered: 3 new instances",
    timestamp: "15 min ago",
    source: "Infrastructure",
  },
  {
    id: "3",
    type: "warning",
    message: "API response time exceeding 500ms threshold",
    timestamp: "32 min ago",
    source: "API Gateway",
  },
  {
    id: "4",
    type: "error",
    message: "Failed to process webhook from Stripe",
    timestamp: "1 hour ago",
    source: "Payment Service",
  },
  {
    id: "5",
    type: "info",
    message: "SSL certificate renewed for *.pulseanalytics.io",
    timestamp: "2 hours ago",
    source: "Security",
  },
  {
    id: "6",
    type: "success",
    message: "Deployment v2.14.3 rolled out to all regions",
    timestamp: "3 hours ago",
    source: "CI/CD",
  },
];

// Social proof logos
export const socialProofLogos = [
  "TechFlow",
  "ScaleUp",
  "DataDrive",
  "CloudNine",
  "PixelPerfect",
  "NexaCore",
];
