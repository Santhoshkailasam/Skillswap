export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: string;
}

export interface Swapper {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  reviewsCount: number;
  offering: Skill;
  seeking: Skill;
  matchScore: number;
  bio: string;
  location: string;
  availability: string;
}

export interface SwapSession {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  teachingSkill: string;
  learningSkill: string;
  dateTime: string;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  duration: string;
}
