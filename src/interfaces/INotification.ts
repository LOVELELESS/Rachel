interface INotification {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  description: string;
  status: "PENDING" | "ACCEPT" | "REJECT";
  response?: string;
}

export default INotification;
