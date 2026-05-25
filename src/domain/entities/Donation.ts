export type Donation = {
  id: string;
  userId?: string | null;
  total: number;
  description?: string | null;
  receiptUrl?: string | null;
  createdAt: Date;
};
