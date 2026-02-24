import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';


//   url: import.meta.env.VITE_FARO_URL ?? 'http://localhost:12345/collect',
export const faro = initializeFaro({
  url: 'http://localhost:12347/collect',
  app: {
    name: 'shopfront',
    version: '1.0.0',
  },
  instrumentations: [
    ...getWebInstrumentations({ captureConsole: true }),
    new TracingInstrumentation(),
  ],
});
