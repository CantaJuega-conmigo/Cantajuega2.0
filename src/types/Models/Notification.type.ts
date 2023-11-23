export enum notificationType {
  Report = "Report",
  Membership = "Membership",
}
export interface Notification {
  id: string;
  notification_type: notificationType;
  is_read: false;
  createdAt: string;
  updatedAt: string;
  ReportId?: string;
  Report?: {
    id: string;
    UserId: string;
    Description: string;
    User: {
      firstName: string;
    };
  };
}
