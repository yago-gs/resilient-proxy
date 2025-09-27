"use client";

import { useProxySimulator } from "@/hooks/use-proxy-simulator";
import { Header } from "./header";
import { RequestForm } from "./request-form";
import { RequestQueue } from "./request-queue";
import { CacheViewer } from "./cache-viewer";
import { CompletedRequests } from "./completed-requests";
import { EventLogs } from "./event-logs";

export function ProxyDashboard() {
  const {
    requestQueue,
    completedRequests,
    cachedData,
    logs,
    healthStatus,
    submitRequest,
    checkHealth,
  } = useProxySimulator();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header healthStatus={healthStatus} onCheckHealth={checkHealth} />
      <main className="p-4 space-y-4">
        <RequestForm onSubmit={submitRequest} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RequestQueue requests={requestQueue} />
          <CacheViewer cache={cachedData} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="lg:col-span-2">
            <CompletedRequests requests={completedRequests} />
          </div>
          <div className="lg:col-span-2">
            <EventLogs logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}
