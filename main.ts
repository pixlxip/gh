export default {
  async fetch(request) {
    const requestBody = (async () => {
      if (request.body) {
        const requestBodyReader = request.body.getReader();
        const requestBodyArray = await requestBodyReader.read();
        const decoder = new TextDecoder();
        return decoder.decode(requestBodyArray.value);
      } else return null;
    })();

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
