# **App Name**: Resilient Proxy

## Core Features:

- Request Proxying: Accepts incoming requests and forwards them to the upstream API, adding the client ID header. This includes the logic to read the Client ID from the environment variables.
- Rate Limiting: Queues incoming requests to respect the upstream API's rate limit of one request per second, implemented via asyncio.
- Caching: Caches API responses for 5 minutes using TTLCache to reduce latency and upstream API load.
- Health Check Endpoint: Provides a /health endpoint for monitoring the proxy's availability.

## Style Guidelines:

- Background color: Light gray (#f0f0f0) to provide a neutral backdrop for the app’s elements.
- Primary color: Deep blue (#30475E) for a professional and reliable feel, reflecting the proxy's role in ensuring stable access to the API.
- Accent color: Soft orange (#F05454) to highlight interactive elements and call attention to important information or status indicators.
- Font: 'Inter' sans-serif font for both headings and body text to ensure readability and a modern, clean interface. Note: currently only Google Fonts are supported.
- Use a clean and straightforward layout to display proxy status and request information, making it easy to monitor the application's operation.