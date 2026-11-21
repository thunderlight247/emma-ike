import "server-only";

const PAYSTACK_API = "https://api.paystack.co";

export function getSecretKey(): string | null {
  return process.env.PAYSTACK_SECRET_KEY || null;
}

interface PaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export async function paystackRequest<T>(
  path: string,
  init: { method?: "GET" | "POST"; body?: unknown } = {},
): Promise<PaystackResponse<T>> {
  const secret = getSecretKey();
  if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not set");

  const res = await fetch(`${PAYSTACK_API}${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  const json = (await res.json()) as PaystackResponse<T>;
  if (!res.ok || !json.status) {
    throw new Error(json?.message || `Paystack request failed (${res.status})`);
  }
  return json;
}
