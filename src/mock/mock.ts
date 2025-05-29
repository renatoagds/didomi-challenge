import type { ConsentData } from "../utils/types";
import { addData, getData } from "./data";

window.fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
      ? input.toString()
      : input.url;

  const method = init?.method || "GET";

  if (url.includes("/consents") && method === "GET") {
    return new Response(JSON.stringify({ data: getData() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url.includes("/consents") && method === "POST") {
    const parsedBody: Omit<ConsentData, "id"> = init?.body
      ? JSON.parse(init.body as string)
      : {};

    const updatedData = addData(parsedBody);

    return new Response(JSON.stringify(updatedData), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null, { status: 404 });
};
