import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'
import * as Sentry from "@sentry/tanstackstart-react";

Sentry.init({
    dsn: process.env.SENTRY_DSN || "",
    tracesSampleRate: 1.0,
});

hydrateRoot(document, <StartClient />)
