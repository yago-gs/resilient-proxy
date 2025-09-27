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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const CompletedRequests = ({ requests }: { requests: Request[] }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <ClipboardCheck className="w-5 h-5" /> Completed Requests
      </CardTitle>
      <CardDescription>
        Showing most recent completed requests.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-96">
        {requests.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">
            No completed requests yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.slice(0, 20).map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-mono">{req.document}</TableCell>
                  <TableCell>
                    <Badge
                      variant={req.status === "cached" ? "default" : "outline"}
                      className={cn(
                        req.status === "cached" &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{req.result.score}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        req.result.risk === "high" ? "destructive" : "default"
                      }
                      className={cn({
                        "bg-green-600 hover:bg-green-700 border-green-600 text-white":
                          req.result.risk === "low",
                        "bg-yellow-500 hover:bg-yellow-600 border-yellow-500 text-black":
                          req.result.risk === "medium",
                      })}
                    >
                      {req.result.risk}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </ScrollArea>
    </CardContent>
  </Card>
);
