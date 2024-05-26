import { decode } from "blurhash";
export const defaultBase64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABLCAQAAAA1k5H2AAAAi0lEQVR42u3SMQEAAAgDoC251a3gL2SgmfBYBRAA`;

export function createB64WithFallback(hash) {
  let dataUrl = defaultBase64;

  if (!hash) {
    return dataUrl;
  }
  try {
    let newB64 = blurHashToDataURL(hash);
    if (newB64) {
      dataUrl = newB64;
      return dataUrl;
    }
  } catch (e) {
    console.error(e);
    return dataUrl;
  }
  return dataUrl;
}

export function blurHashToDataURL(hash) {
  if (!hash) return undefined;

  const pixels = decode(hash, 32, 32);
  const dataURL = parsePixels(pixels, 32, 32);
  return dataURL;
}

// thanks to https://github.com/wheany/js-png-encoder
function parsePixels(pixels, width, height) {
  const pixelsString = [...pixels]
    .map(byte => String.fromCharCode(byte))
    .join("");
  const pngString = generatePng(width, height, pixelsString);
  const dataURL =
    typeof Buffer !== "undefined"
      ? Buffer.from(getPngArray(pngString)).toString("base64")
      : btoa(pngString);
  return "data:image/png;base64," + dataURL;
}

function getPngArray(pngString) {
  const pngArray = new Uint8Array(pngString.length);
  for (let i = 0; i < pngString.length; i++) {
    pngArray[i] = pngString.charCodeAt(i);
  }
  return pngArray;
}

function generatePng(width, height, rgbaString) {
  const DEFLATE_METHOD = String.fromCharCode(0x78, 0x01);
  const CRC_TABLE = [];
  const SIGNATURE = String.fromCharCode(137, 80, 78, 71, 13, 10, 26, 10);
  const NO_FILTER = String.fromCharCode(0);

  let n, c, k;

  // make crc table
  for (n = 0; n < 256; n++) {
    c = n;
    for (k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    CRC_TABLE[n] = c;
  }

  // Functions
  function inflateStore(data) {
    const MAX_STORE_LENGTH = 65535;
    let storeBuffer = "";
    let remaining;
    let blockType;

    for (let i = 0; i < data.length; i += MAX_STORE_LENGTH) {
      remaining = data.length - i;
      blockType = "";

      if (remaining <= MAX_STORE_LENGTH) {
        blockType = String.fromCharCode(0x01);
      } else {
        remaining = MAX_STORE_LENGTH;
        blockType = String.fromCharCode(0x00);
      }
      // little-endian
      storeBuffer +=
        blockType +
        String.fromCharCode(remaining & 0xff, (remaining & 0xff00) >>> 8);
      storeBuffer += String.fromCharCode(
        ~remaining & 0xff,
        (~remaining & 0xff00) >>> 8
      );

      storeBuffer += data.substring(i, i + remaining);
    }

    return storeBuffer;
  }

  function adler32(data) {
    let MOD_ADLER = 65521;
    let a = 1;
    let b = 0;

    for (let i = 0; i < data.length; i++) {
      a = (a + data.charCodeAt(i)) % MOD_ADLER;
      b = (b + a) % MOD_ADLER;
    }

    return (b << 16) | a;
  }

  function updateCrc(crc, buf) {
    let c = crc;
    let b;

    for (let n = 0; n < buf.length; n++) {
      b = buf.charCodeAt(n);
      c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
    }
    return c;
  }

  function crc(buf) {
    return updateCrc(0xffffffff, buf) ^ 0xffffffff;
  }

  function dwordAsString(dword) {
    return String.fromCharCode(
      (dword & 0xff000000) >>> 24,
      (dword & 0x00ff0000) >>> 16,
      (dword & 0x0000ff00) >>> 8,
      dword & 0x000000ff
    );
  }

  function createChunk(length, type, data) {
    const CRC = crc(type + data);

    return dwordAsString(length) + type + data + dwordAsString(CRC);
  }

  function createIHDR(width, height) {
    const IHDRdata =
      dwordAsString(width) +
      dwordAsString(height) +
      // bit depth
      String.fromCharCode(8) +
      // color type: 6=truecolor with alpha
      String.fromCharCode(6) +
      // compression method: 0=deflate, only allowed value
      String.fromCharCode(0) +
      // filtering: 0=adaptive, only allowed value
      String.fromCharCode(0) +
      // interlacing: 0=none
      String.fromCharCode(0);

    return createChunk(13, "IHDR", IHDRdata);
  }

  // PNG creations

  const IEND = createChunk(0, "IEND", "");
  const IHDR = createIHDR(width, height);

  let scanlines = "";
  let scanline;

  for (let y = 0; y < rgbaString.length; y += width * 4) {
    scanline = NO_FILTER;
    if (Array.isArray(rgbaString)) {
      for (let x = 0; x < width * 4; x++) {
        scanline += String.fromCharCode(rgbaString[y + x] & 0xff);
      }
    } else {
      scanline += rgbaString.substr(y, width * 4);
    }
    scanlines += scanline;
  }

  const compressedScanlines =
    DEFLATE_METHOD +
    inflateStore(scanlines) +
    dwordAsString(adler32(scanlines));
  const IDAT = createChunk(
    compressedScanlines.length,
    "IDAT",
    compressedScanlines
  );

  const pngString = SIGNATURE + IHDR + IDAT + IEND;
  return pngString;
}

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export function addBase64s(data) {
  function traverse(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        traverse(obj[key]);
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach(item => {
          if (typeof item === "object" && item !== null) {
            traverse(item);
          }
        });
      } else if (key === "featuredImage" || key === "logo") {
        // console.log(obj[key])

        obj[`base64`] = createB64WithFallback(obj[key]?.blurhash);
        // console.log(obj[key]);
      }
    }
  }

  traverse(data);
  return data;
}
