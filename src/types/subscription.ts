
export type SubscriptionTier = 'free' | 'weekly' | 'monthly' | 'yearly';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: string;
  priceValue: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  limit?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    priceValue: 0,
    period: 'forever',
    description: 'Basic features to get you started',
    features: [
      '3 CV analyses per week',
      'Basic job matching',
      'Limited cover letter templates',
      'Practice interviews (5 per month)'
    ],
    limit: '3 free CV analyses per week'
  },
  {
    id: 'weekly',
    name: 'Weekly',
    price: '$5',
    priceValue: 5,
    period: 'per week',
    description: 'Perfect for active job seekers',
    features: [
      'Unlimited CV analyses',
      'Advanced job matching',
      'All cover letter templates',
      'Unlimited practice interviews',
      'Priority support'
    ],
    highlighted: true
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$14',
    priceValue: 14,
    period: 'per month',
    description: 'Great for ongoing job search',
    features: [
      'Unlimited CV analyses',
      'Advanced job matching',
      'All cover letter templates',
      'Unlimited practice interviews',
      'Priority support',
      'Resume history tracking'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$98',
    priceValue: 98,
    period: 'per year',
    description: 'Best value for your career journey',
    features: [
      'Unlimited CV analyses',
      'Advanced job matching',
      'All cover letter templates',
      'Unlimited practice interviews',
      'Priority support',
      'Resume history tracking',
      'Career progress analytics',
      'Personalized career roadmap',
      '30% discount (2 months free)'
    ]
  }
];
