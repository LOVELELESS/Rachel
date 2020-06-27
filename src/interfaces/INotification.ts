interface INotification {
  id: number;
  content: string;
  status: "PENDING" | "ACCEPT" | "REJECT";
  response?: string;
}

export default INotification;
