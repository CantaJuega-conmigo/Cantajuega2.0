interface Dict<T> {
  [key: string]: T;
}

interface RequestOptions extends RequestInit {
  headers?: Dict<string>; // Cambia a Dict<string> para los headers
}

export async function authorizedFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = localStorage.getItem("tkn");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    options.next = {
      revalidate: 1000,
    };
  } else {
    options.cache = "force-cache";
  }
  
  const response = await fetch(`http://localhost:3001/api/${path}`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = (await response.json()) as T;
  return data;
}
