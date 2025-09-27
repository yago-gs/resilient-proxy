"use client";

import React, { useState, useEffect } from "react";
import type { CachedItem } from "@/lib/types";
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
import { Gauge } from "lucide-react";

export const CacheViewer = ({ cache }: { cache: Map<string, CachedItem> }) => {
  const cacheArray = Array.from(cache.entries());
  const [, setTicker] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeLeft = (expiry: number) => {
    const timeLeft = Math.round((expiry - Date.now()) / 1000);
    return timeLeft > 0 ? `${timeLeft}s` : "Expired";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="w-5 h-5" /> Cache Status
        </CardTitle>
        <CardDescription>
          {cache.size} item(s) currently cached. TTL is 5 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          {cache.size === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              Cache is empty.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Expires in</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cacheArray.map(([doc, item]) => (
                  <TableRow key={doc}>
                    <TableCell className="font-mono">{doc}</TableCell>
                    <TableCell>{item.data.score}</TableCell>
                    <TableCell className="text-right font-mono">
                      {getTimeLeft(item.expiry)}
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
};
