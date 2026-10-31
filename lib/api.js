const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;


// =====================================
// API REQUEST FUNCTION
// =====================================

export async function apiRequest(
  endpoint,
  {
    method = "GET",
    body,
    accessToken,
    language = "en",
    headers = {},
  } = {}
) {

  // Check backend URL
  if (!API_BASE_URL) {
    throw new Error(
      "Backend API URL is not configured."
    );
  }


  // Prepare request headers
  const requestHeaders = {
    Accept: "application/json",
    "Accept-Language": language,
    ...headers,
  };


  // Add access token if available
  if (accessToken) {
    requestHeaders.Authorization =
      `Bearer ${accessToken}`;
  }


  // Detect FormData
  const isFormData =
    typeof FormData !== "undefined" &&
    body instanceof FormData;


  // Add JSON content type when needed
  if (body && !isFormData) {
    requestHeaders["Content-Type"] =
      "application/json";
  }


  // Prepare request body
  let requestBody;

  if (body instanceof FormData) {
    requestBody = body;
  } else if (body !== undefined) {
    requestBody = JSON.stringify(body);
  }


  // Send request to backend
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method,

      headers: requestHeaders,

      body: requestBody,
    }
  );


  // Read response
  const responseText = await response.text();

  let responseData = null;

  if (responseText) {
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }
  }


  // Handle backend errors
  if (!response.ok) {
    const error = new Error(
      responseData?.detail ||
      responseData?.message ||
      `Request failed with status ${response.status}`
    );

    error.status = response.status;
    error.data = responseData;

    throw error;
  }


  // Return backend response
  return responseData;
}