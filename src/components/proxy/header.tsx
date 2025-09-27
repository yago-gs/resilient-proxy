"use client";

import { Button } from "@/components/ui/button";
import { Server, Timer, Wifi, WifiOff } from "lucide-react";

export const Header = ({
  healthStatus,
  onCheckHealth,
}: {
  healthStatus: "ok" | "checking" | "error";
  onCheckHealth: () => void;
}) => (
  <header className="flex items-center justify-between p-4 border-b bg-card">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Server className="w-6 h-6 text-primary" />
      </div>
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">
        Resilient Proxy
      </h1>
    </div>
    <Button
      onClick={onCheckHealth}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      {healthStatus === "checking" ? (
        <Timer className="w-4 h-4 animate-spin" />
      ) : healthStatus === "ok" ? (
        <Wifi className="w-4 h-4 text-green-500" />
      ) : (
        <WifiOff className="w-4 h-4 text-destructive" />
      )}
      <span className="capitalize hidden sm:inline">{healthStatus}</span>
    </Button>
  </header>
);
