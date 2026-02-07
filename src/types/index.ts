export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: string;
  color: 'blue' | 'emerald' | 'violet';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'academic' | 'social' | 'sports' | 'other';
  description: string;
  shortDescription: string;
  viewCount: number;
  capacity: number;
  registeredCount: number;
  organizer: string;
  tags: string[];
  imageUrl?: string;
  isRegistered?: boolean;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'youtube';
  url: string;
  description?: string;
  uploadDate: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  schedule: string;
  grade?: string;
  attendance: number;
  description: string;
  materials: Material[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  semester: number;
  avatar?: string;
}
