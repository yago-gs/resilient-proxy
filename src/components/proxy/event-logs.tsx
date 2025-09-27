"use client";

import type { Log } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  History,
  PackageCheck,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export const EventLogs = ({ logs }: { logs: Log[] }) => {
  const getIcon = (type: Log["type"]) => {
    switch (type) {
      case "success":
        return <ShieldCheck className="w-4 h-4 text-green-500" />;
      case "error":
        return <ShieldAlert className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <PackageCheck className="w-4 h-4 text-muted-foreground" />;
    }
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" /> Event Logs
        </CardTitle>
        <CardDescription>Live log of proxy events.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 p-1">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No events yet. Submit a request to begin.
            </p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 text-sm">
                  <span className="pt-0.5">{getIcon(log.type)}</span>
                  <div className="flex-1">
                    <p className="text-foreground leading-tight">
                      {log.message}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {log.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
