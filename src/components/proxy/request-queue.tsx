"use client";

import type { Request } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileClock } from "lucide-react";
import { cn } from "@/lib/utils";

export const RequestQueue = ({ requests }: { requests: Request[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileClock className="w-5 h-5" /> Request Queue
      </CardTitle>
      <CardDescription>
        {requests.length} request(s) waiting or in progress.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-48">
        {requests.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">
            Queue is empty.
          </p>
        ) : (
          <div className="space-y-2">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-2 rounded-md bg-muted/50"
              >
                <p className="font-mono text-sm">{req.document}</p>
                <Badge
                  variant={req.status === "processing" ? "default" : "secondary"}
                  className={cn(req.status === "processing" && "animate-pulse")}
                >
                  {req.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </CardContent>
  </Card>
);
