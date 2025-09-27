"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RequestForm = ({
  onSubmit,
}: {
  onSubmit: (doc: string) => void;
}) => {
  const [documentId, setDocumentId] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentId.trim() || !/^\d+$/.test(documentId.trim())) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Document ID must contain only numbers.",
      });
      return;
    }
    onSubmit(documentId);
    setDocumentId("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a New Request</CardTitle>
        <CardDescription>
          Enter a document ID to check its score. Requests are queued and
          processed one per second.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="e.g., 12345678901"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            pattern="\d+"
            title="Please enter only numbers."
          />
          <Button type="submit">
            <Send className="w-4 h-4 mr-2" /> Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
