export default {
  async fetch(request) {
    const responseBody = {
      body: await getBody(request),
      headers: getHeaders(request),
      method: request.method,
      url: request.url,
    };

    const responseHeaders = new Headers();
    responseHeaders.append('Content-Type', 'application/json');

    return new Response(
      JSON.stringify(responseBody),
      { headers: responseHeaders },
    );
  },
} satisfies Deno.ServeDefaultExport;

async function getBody(request) {
  if (!request.body) return null;
  const requestBodyReader = request.body.getReader();
  const requestBodyArray = await requestBodyReader.read();
  const decoder = new TextDecoder();
  return decoder.decode(requestBodyArray.value);
}

function getHeaders(request) {
  return request.headers.entries()
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}
