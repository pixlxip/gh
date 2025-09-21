export default {
  async fetch(request) {
    const requestBodyReader = request.body.getReader();
    const requestBodyArray = await requestBodyReader.read();
    const decoder = new TextDecoder();
    const requestBody = decoder.decode(requestBodyArray.value);

    const requestHeaders = request.headers.entries()
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    const responseBody = {
      body: requestBody,
      headers: requestHeaders,
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
