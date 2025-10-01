
export interface WaffleBase {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface Ingredient {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface ExtraProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface PaymentMethod {
  id: number;
  key: string;
  name: string;
  imageUrl: string;
}

export interface WaffleConfiguration {
  id: number;
  base: WaffleBase;
  ingredients: Ingredient[];
  toppings: Ingredient[];
}

export interface Pillar {
  emoji: string;
  title: string;
  description: string;
}

export interface AboutUsContent {
  title: string;
  subtitle: string;
  quote: string;
  founder: string;
  paragraph1: string;
  paragraph2: string;
  pillarsTitle: string;
  pillars: Pillar[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface AppSettings {
  whatsappNumber: string;
  contactPhone: string;
  contactEmail: string;
  instagramHandle: string;
  mapUrl: string;
  aboutUsContent: AboutUsContent;
  faq: FAQItem[];
}