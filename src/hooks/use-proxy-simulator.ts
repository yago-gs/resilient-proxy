"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Request, CachedItem, Log } from "@/lib/types";

const RATE_LIMIT_MS = 1000;
const CACHE_TTL_MS = 5 * 60 * 1000;

export function useProxySimulator() {
  const [requestQueue, setRequestQueue] = useState<Request[]>([]);
  const [completedRequests, setCompletedRequests] = useState<Request[]>([]);
  const [cachedData, setCachedData] = useState<Map<string, CachedItem>>(
    new Map()
  );
  const [logs, setLogs] = useState<Log[]>([]);
  const [healthStatus, setHealthStatus] = useState<
    "ok" | "checking" | "error"
  >("ok");
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);

  const requestIdCounter = useRef(0);
  const logIdCounter = useRef(0);

  const addLog = useCallback((message: string, type: Log["type"] = "info") => {
    setLogs(
      (prev) =>
        [
          {
            id: logIdCounter.current++,
            timestamp: new Date().toLocaleTimeString(),
            message,
            type,
          },
          ...prev,
        ].slice(0, 100) // Keep logs to a reasonable size
    );
  }, []);

  const submitRequest = useCallback(
    async (document: string) => {
      // Check cache first
      const cachedItem = cachedData.get(document);
      if (cachedItem && cachedItem.expiry > Date.now()) {
        addLog(`Cache HIT for document: ${document}`, "success");
        const cachedRequest: Request = {
          id: requestIdCounter.current++,
          document,
          status: "cached",
          result: cachedItem.data,
          timestamp: new Date().toISOString(),
        };
        setCompletedRequests((prev) => [cachedRequest, ...prev]);
        return;
      }

      addLog(`Cache MISS. Enqueuing request for document: ${document}`, "warning");
      const newRequest: Request = {
        id: requestIdCounter.current++,
        document,
        status: "queued",
        timestamp: new Date().toISOString(),
      };
      setRequestQueue((prev) => [...prev, newRequest]);
    },
    [cachedData, addLog]
  );

  const checkHealth = useCallback(() => {
    setHealthStatus("checking");
    addLog("Health check initiated.");
    setTimeout(() => {
      setHealthStatus("ok");
      addLog("Health check successful: status is OK.", "success");
    }, 500);
  }, [addLog]);

  // The worker effect
  useEffect(() => {
    if (requestQueue.length > 0 && !isWorkerRunning) {
      const requestToProcess = requestQueue[0];

      setIsWorkerRunning(true);
      setRequestQueue((prev) =>
        prev.map((r, i) => (i === 0 ? { ...r, status: "processing" } : r))
      );
      addLog(`Processing request for document: ${requestToProcess.document}`);

      setTimeout(() => {
        const score = Math.floor(Math.random() * 1001);
        const result = {
          score,
          risk: score > 700 ? "low" : score > 300 ? "medium" : "high",
        };

        addLog(
          `Request for document ${requestToProcess.document} processed. Score: ${score}`,
          "success"
        );

        const newExpiry = Date.now() + CACHE_TTL_MS;
        setCachedData((prev) =>
          new Map(prev).set(requestToProcess.document, {
            data: result,
            expiry: newExpiry,
          })
        );

        const completedRequest: Request = {
          ...requestToProcess,
          status: "completed",
          result: result,
        };

        setCompletedRequests((prev) => [completedRequest, ...prev]);
        setRequestQueue((prev) => prev.slice(1));

        setIsWorkerRunning(false);
      }, RATE_LIMIT_MS);
    }
  }, [requestQueue, isWorkerRunning, addLog]);

  // Cleanup expired cache items periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCachedData((prev) => {
        const newCache = new Map(prev);
        let changed = false;
        for (const [key, value] of newCache.entries()) {
          if (value.expiry < Date.now()) {
            newCache.delete(key);
            addLog(`Cache expired and removed for document: ${key}`);
            changed = true;
          }
        }
        return changed ? newCache : prev;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [addLog]);

  return {
    requestQueue,
    completedRequests,
    cachedData,
    logs,
    healthStatus,
    submitRequest,
    checkHealth,
  };
}
