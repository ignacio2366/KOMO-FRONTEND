interface PropServices {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: {};
}

const PORT = import.meta.env.VITE_API_URL;
const ACCESSKEY = import.meta.env.VITE_API_ACCESSKEY;

export const commonservices = async (method: PropServices) => {
  try {
    const response = await fetch(`${PORT}${method.url}`, {
      method: method.method,
      headers: {
        "Content-Type": "application/json",
        accesskey: ACCESSKEY,
      },
      ...(method.body ? { body: JSON.stringify(method.body) } : {}),
    });
    return response.json();
  } catch (error) {
    console.error("Error in common services:", error);
  }
};
