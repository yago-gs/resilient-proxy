export type Request = {
  id: number;
  document: string;
  status: "queued" | "processing" | "completed" | "cached" | "error";
  result?: any;
  timestamp: string;
};

export type CachedItem = {
  data: any;
  expiry: number;
};

export type Log = {
  id: number;
  timestamp: string;
  message: string;
  type: "info" | "success" | "error" | "warning";
};
