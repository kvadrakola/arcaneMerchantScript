/**
 * Shared Axios client for the app's external HTTP APIs.
 * `validateStatus` never rejects so callers keep their existing
 * status-check / error-message behaviour unchanged.
 */
import axios from "axios";

export const http = axios.create({
  // Keep responses as raw text so each data layer parses JSON itself,
  // exactly as the previous fetch-based implementation did.
  responseType: "text",
  transformResponse: [(data) => data],
  validateStatus: () => true,
});
