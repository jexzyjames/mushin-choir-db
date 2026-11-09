const allowedTags = new Set([
  "B",
  "BR",
  "DIV",
  "EM",
  "I",
  "LI",
  "OL",
  "P",
  "STRONG",
  "TABLE",
  "TBODY",
  "TD",
  "TFOOT",
  "TH",
  "THEAD",
  "TR",
  "UL",
]);

const blockedTags = new Set([
  "IFRAME",
  "OBJECT",
  "SCRIPT",
  "STYLE",
  "SVG",
  "VIDEO",
  "AUDIO",
  "FORM",
  "INPUT",
]);

export function sanitizeRichText(value = "") {
  const parsed = new DOMParser().parseFromString(String(value), "text/html");
  const cleanRoot = document.createElement("div");

  const copySafeNodes = (source, target) => {
    for (const node of source.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const lines = node.textContent.split(/\r?\n/);
        lines.forEach((line, index) => {
          if (index > 0) target.append(document.createElement("br"));
          if (line) target.append(document.createTextNode(line));
        });
        continue;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) continue;

      const tagName = node.tagName.toUpperCase();
      if (blockedTags.has(tagName)) continue;

      if (!allowedTags.has(tagName)) {
        copySafeNodes(node, target);
        continue;
      }

      const safeElement = document.createElement(tagName.toLowerCase());
      copySafeNodes(node, safeElement);
      target.append(safeElement);
    }
  };

  copySafeNodes(parsed.body, cleanRoot);
  return cleanRoot.innerHTML;
}
