/**
 * Compress strings and Blobs as gzip.
 *
 * Based on https://dev.to/ternentdotdev/json-compression-in-the-browser-with-gzip-and-the-compression-streams-api-4135
 *
 * @param {string | Blob} data Plain-text data as a string or Blob for binary data
 *
 * @param {boolean} base64 Set true to output base64 encoded (can be embedded in JSON, query parameters, etc.), otherwise return JavaScript blob
 *
 * @returns {Promise<string | Blob>} Compressed binary or
 */
export async function compressStringGzip(
  data: string | Blob,
  base64: boolean = false
): Promise<string | Blob> {
  // Convert incoming string to a stream
  let stream;
  if (typeof data == "string") {
    stream = new Blob([data], {
      type: "text/plain",
    }).stream();
  } else {
    // Assume blog
    stream = data.stream();
  }

  // gzip stream
  const compressedReadableStream = stream.pipeThrough(
    new CompressionStream("gzip")
  );

  // create Response
  const compressedResponse = await new Response(compressedReadableStream);

  // Get response Blob
  const blob = await compressedResponse.blob();

  if (base64) {
    // Get the ArrayBuffer
    const buffer = await blob.arrayBuffer();

    const data = String.fromCharCode(...new Uint8Array(buffer));

    // convert ArrayBuffer to base64 encoded string
    const compressedBase64 = btoa(data);

    console.info({ data, compressedBase64 });

    return compressedBase64;
  } else {
    return blob;
  }
}

export function decompressStringGzip(
  data: string,
  base64: boolean = false
): Promise<Blob> {
  let blob: Blob;

  console.info(data);

  if (base64) {
    // Decode base64 string to binary
    const binaryString = atob(data as string);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Convert to Blob
    blob = new Blob([bytes], { type: "application/gzip" });
  } else {
    blob = new Blob([data], {
      type: "application/gzip",
    });
  }

  // gzip stream
  const decompressedReadableStream = blob
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));

  // create Response
  const decompressedResponse = new Response(decompressedReadableStream);

  // Get response Blob
  return decompressedResponse.blob();
}
