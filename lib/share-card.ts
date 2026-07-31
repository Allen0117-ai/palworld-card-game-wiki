export type ShareCardPayload =
  | {
      kind: "card";
      eyebrow: string;
      title: string;
      body: string;
      image: string;
      accent: string;
      facts: string[];
      footerNote?: string;
    }
  | {
      kind: "rule";
      eyebrow: string;
      title: string;
      body: string;
      source: string;
      checked: string;
    }
  | {
      kind: "guide";
      eyebrow: string;
      title: string;
      body: string;
      prompt: string;
    }
  | {
      kind: "deck";
      eyebrow: string;
      title: string;
      total: number;
      colors: string[];
      cards: Array<{ image: string; name: string; copies: number }>;
    }
  | {
      kind: "collection";
      eyebrow: string;
      title: string;
      owned: number;
      total: number;
    };

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;
const PAPER = "#f0e7d6";
const MUTED = "#aaa99f";
const GOLD = "#d2b66d";
const PANEL = "#20231e";

function cssFont(variableName: string, fallback: string) {
  const configuredFont = getComputedStyle(document.body).getPropertyValue(variableName).trim();
  return configuredFont || fallback;
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidateLine = currentLine ? `${currentLine} ${word}` : word;
    if (context.measureText(candidateLine).width <= maxWidth) {
      currentLine = candidateLine;
      continue;
    }

    if (currentLine) lines.push(currentLine);
    currentLine = word;
    if (lines.length === maxLines) break;
  }

  if (currentLine && lines.length < maxLines) lines.push(currentLine);
  const hasHiddenWords = lines.join(" ").split(" ").length < words.length;
  if (hasHiddenWords && lines.length) {
    let lastLine = lines[lines.length - 1];
    while (lastLine && context.measureText(`${lastLine}…`).width > maxWidth) {
      lastLine = lastLine.split(" ").slice(0, -1).join(" ");
    }
    lines[lines.length - 1] = `${lastLine}…`;
  }

  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function drawBackground(context: CanvasRenderingContext2D, accent = GOLD) {
  const gradient = context.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  gradient.addColorStop(0, "#0f110e");
  gradient.addColorStop(0.55, "#171a16");
  gradient.addColorStop(1, "#0b1717");
  context.fillStyle = gradient;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const glow = context.createRadialGradient(820, 340, 20, 820, 340, 620);
  glow.addColorStop(0, `${accent}35`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  context.fillStyle = "rgba(255,255,255,.035)";
  for (let y = 34; y < CARD_HEIGHT; y += 34) {
    for (let x = 34; x < CARD_WIDTH; x += 34) {
      context.fillRect(x, y, 2, 2);
    }
  }

  context.strokeStyle = `${accent}80`;
  context.lineWidth = 2;
  context.strokeRect(34, 34, CARD_WIDTH - 68, CARD_HEIGHT - 68);
}

function drawBrand(context: CanvasRenderingContext2D, uiFont: string) {
  context.fillStyle = GOLD;
  context.font = `800 25px ${uiFont}`;
  context.letterSpacing = "4px";
  context.fillText("◆  PALPAGOS ARCHIVE", 70, 92);
  context.fillStyle = MUTED;
  context.font = `700 16px ${uiFont}`;
  context.letterSpacing = "3px";
  context.fillText("PALWORLD CARD GAME WIKI", 70, 123);
  context.letterSpacing = "0px";
}

function drawFooter(context: CanvasRenderingContext2D, uiFont: string, note: string) {
  context.strokeStyle = "rgba(210,182,109,.35)";
  context.beginPath();
  context.moveTo(70, 1244);
  context.lineTo(1010, 1244);
  context.stroke();

  context.fillStyle = PAPER;
  context.font = `800 22px ${uiFont}`;
  context.fillText("palworldcardgame.wiki", 70, 1294);
  context.textAlign = "right";
  context.fillStyle = MUTED;
  context.font = `700 16px ${uiFont}`;
  context.fillText(note, 1010, 1294);
  context.textAlign = "left";
}

function colorAccent(color: string) {
  const accents: Record<string, string> = {
    red: "#d86f5a",
    blue: "#67b7c9",
    green: "#84a874",
    purple: "#a38ac2",
    colorless: GOLD,
  };
  return accents[color.toLowerCase()] || GOLD;
}

function loadShareImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load share image: ${src}`));
    image.src = new URL(src, window.location.origin).toString();
  });
}

async function loadOptionalShareImage(src: string) {
  try {
    return await loadShareImage(src);
  } catch {
    return null;
  }
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    x + (width - renderedWidth) / 2,
    y + (height - renderedHeight) / 2,
    renderedWidth,
    renderedHeight,
  );
}

function drawEyebrow(context: CanvasRenderingContext2D, text: string, uiFont: string, x: number, y: number) {
  context.fillStyle = GOLD;
  context.font = `800 18px ${uiFont}`;
  context.letterSpacing = "3px";
  context.fillText(text.toUpperCase(), x, y);
  context.letterSpacing = "0px";
}

async function drawCardSpotlight(
  context: CanvasRenderingContext2D,
  payload: Extract<ShareCardPayload, { kind: "card" }>,
  displayFont: string,
  bodyFont: string,
  uiFont: string,
) {
  const accent = colorAccent(payload.accent);
  drawBackground(context, accent);
  drawBrand(context, uiFont);
  drawEyebrow(context, payload.eyebrow, uiFont, 70, 190);

  roundedRect(context, 70, 230, 450, 780, 20);
  context.fillStyle = "rgba(7,9,7,.7)";
  context.fill();
  context.strokeStyle = `${accent}aa`;
  context.lineWidth = 2;
  context.stroke();

  const cardImage = await loadOptionalShareImage(payload.image);
  if (cardImage) {
    drawContainedImage(context, cardImage, 88, 248, 414, 744);
  } else {
    context.fillStyle = PANEL;
    context.fillRect(88, 248, 414, 744);
  }

  context.fillStyle = PAPER;
  context.font = `800 55px ${displayFont}`;
  let nextY = drawWrappedText(context, payload.title.toUpperCase(), 570, 292, 410, 66, 4);

  nextY += 26;
  for (const fact of payload.facts.slice(0, 4)) {
    const badgeWidth = Math.min(400, context.measureText(fact.toUpperCase()).width + 44);
    roundedRect(context, 570, nextY, badgeWidth, 48, 4);
    context.fillStyle = `${accent}28`;
    context.fill();
    context.strokeStyle = `${accent}90`;
    context.stroke();
    context.fillStyle = PAPER;
    context.font = `800 16px ${uiFont}`;
    context.fillText(fact.toUpperCase(), 591, nextY + 31);
    nextY += 62;
  }

  context.fillStyle = MUTED;
  context.font = `500 26px ${bodyFont}`;
  drawWrappedText(context, payload.body, 570, nextY + 24, 410, 39, 7);

  context.fillStyle = PAPER;
  context.font = `800 31px ${displayFont}`;
  context.fillText("WOULD YOU PLAY IT?", 70, 1095);
  context.fillStyle = MUTED;
  context.font = `500 22px ${bodyFont}`;
  context.fillText("Open the card, compare it, and build around it.", 70, 1136);
  drawFooter(context, uiFont, payload.footerNote || "Official card art ©Bushiroad ©PALWORLD");
}

function drawKnowledgeCard(
  context: CanvasRenderingContext2D,
  payload: Extract<ShareCardPayload, { kind: "rule" | "guide" }>,
  displayFont: string,
  bodyFont: string,
  uiFont: string,
) {
  drawBackground(context);
  drawBrand(context, uiFont);
  drawEyebrow(context, payload.eyebrow, uiFont, 70, 206);

  context.fillStyle = PAPER;
  context.font = `800 63px ${displayFont}`;
  const titleBottom = drawWrappedText(context, payload.title.toUpperCase(), 70, 300, 920, 76, 5);

  roundedRect(context, 70, titleBottom + 42, 940, 470, 12);
  context.fillStyle = "rgba(32,35,30,.9)";
  context.fill();
  context.strokeStyle = "rgba(210,182,109,.5)";
  context.stroke();

  context.fillStyle = GOLD;
  context.font = `800 22px ${uiFont}`;
  context.fillText(payload.kind === "rule" ? "THE ANSWER" : "THE SHORT VERSION", 106, titleBottom + 102);

  context.fillStyle = PAPER;
  context.font = `500 31px ${bodyFont}`;
  drawWrappedText(context, payload.body, 106, titleBottom + 164, 868, 46, 7);

  context.fillStyle = MUTED;
  context.font = `700 18px ${uiFont}`;
  if (payload.kind === "rule") {
    context.fillText(`SOURCE: ${payload.source.toUpperCase()}`, 70, 1130);
    context.fillText(`CHECKED ${payload.checked.toUpperCase()}`, 70, 1166);
  } else {
    context.fillText(payload.prompt.toUpperCase(), 70, 1150);
  }
  drawFooter(context, uiFont, payload.kind === "rule" ? "Share the ruling, not the argument." : "Save it. Send it. Play a better first game.");
}

async function drawDeckCard(
  context: CanvasRenderingContext2D,
  payload: Extract<ShareCardPayload, { kind: "deck" }>,
  displayFont: string,
  bodyFont: string,
  uiFont: string,
) {
  const accent = colorAccent(payload.colors[0] || "colorless");
  drawBackground(context, accent);
  drawBrand(context, uiFont);
  drawEyebrow(context, payload.eyebrow, uiFont, 70, 190);

  context.fillStyle = PAPER;
  context.font = `800 68px ${displayFont}`;
  const titleBottom = drawWrappedText(context, payload.title.toUpperCase(), 70, 285, 940, 80, 3);

  const statusY = titleBottom + 24;
  context.fillStyle = GOLD;
  context.font = `800 25px ${uiFont}`;
  context.fillText(payload.total === 50 ? "50 / 50  •  READY TO PLAY" : `${payload.total} / 50  •  DECK IN PROGRESS`, 70, statusY);

  let pipX = 70;
  for (const color of payload.colors.slice(0, 2)) {
    context.beginPath();
    context.fillStyle = colorAccent(color);
    context.arc(pipX + 14, statusY + 48, 14, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = MUTED;
    context.font = `800 17px ${uiFont}`;
    context.fillText(color.toUpperCase(), pipX + 38, statusY + 55);
    pipX += 155;
  }

  const cardY = statusY + 104;
  const cardWidth = 218;
  const cardHeight = 430;
  const cardGap = 22;
  const images = await Promise.all(payload.cards.slice(0, 4).map((card) => loadOptionalShareImage(card.image)));

  payload.cards.slice(0, 4).forEach((card, index) => {
    const x = 70 + index * (cardWidth + cardGap);
    roundedRect(context, x, cardY, cardWidth, cardHeight, 12);
    context.fillStyle = "rgba(7,9,7,.72)";
    context.fill();
    context.strokeStyle = "rgba(210,182,109,.3)";
    context.stroke();
    if (images[index]) drawContainedImage(context, images[index], x + 10, cardY + 10, cardWidth - 20, 318);

    context.fillStyle = PAPER;
    context.font = `800 17px ${uiFont}`;
    drawWrappedText(context, card.name, x + 14, cardY + 358, cardWidth - 28, 22, 2);
    context.fillStyle = GOLD;
    context.font = `800 17px ${uiFont}`;
    context.fillText(`×${card.copies}`, x + 14, cardY + 412);
  });

  context.fillStyle = PAPER;
  context.font = `800 42px ${displayFont}`;
  context.fillText("OPEN IT. REMIX IT. MAKE IT YOURS.", 70, 1110);
  context.fillStyle = MUTED;
  context.font = `500 24px ${bodyFont}`;
  context.fillText("Built with the free Palworld TCG deck builder.", 70, 1154);
  drawFooter(context, uiFont, "No account needed.");
}

function drawCollectionCard(
  context: CanvasRenderingContext2D,
  payload: Extract<ShareCardPayload, { kind: "collection" }>,
  displayFont: string,
  bodyFont: string,
  uiFont: string,
) {
  drawBackground(context, "#5aabc1");
  drawBrand(context, uiFont);
  drawEyebrow(context, payload.eyebrow, uiFont, 70, 190);

  context.fillStyle = PAPER;
  context.font = `800 67px ${displayFont}`;
  const titleBottom = drawWrappedText(context, payload.title.toUpperCase(), 70, 292, 940, 78, 3);
  const completion = Math.round((payload.owned / payload.total) * 100);

  roundedRect(context, 70, titleBottom + 42, 940, 440, 14);
  context.fillStyle = "rgba(32,35,30,.9)";
  context.fill();
  context.strokeStyle = "rgba(90,171,193,.65)";
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = PAPER;
  context.font = `800 164px ${displayFont}`;
  context.fillText(`${completion}%`, 105, titleBottom + 245);
  context.fillStyle = GOLD;
  context.font = `800 25px ${uiFont}`;
  context.fillText(`${payload.owned} OF ${payload.total} COLLECTED`, 110, titleBottom + 304);

  roundedRect(context, 110, titleBottom + 344, 860, 28, 14);
  context.fillStyle = "#11140f";
  context.fill();
  if (completion > 0) {
    roundedRect(context, 110, titleBottom + 344, Math.max(28, 860 * completion / 100), 28, 14);
    const progressGradient = context.createLinearGradient(110, 0, 970, 0);
    progressGradient.addColorStop(0, GOLD);
    progressGradient.addColorStop(1, "#5aabc1");
    context.fillStyle = progressGradient;
    context.fill();
  }

  context.fillStyle = PAPER;
  context.font = `800 46px ${displayFont}`;
  context.fillText("HOW FAR IS YOUR SET?", 70, 1080);
  context.fillStyle = MUTED;
  context.font = `500 25px ${bodyFont}`;
  context.fillText("Open the free checklist and track your own BP01 collection.", 70, 1130);
  drawFooter(context, uiFont, "No account needed. Progress stays on your device.");
}

export async function createShareImageFile(payload: ShareCardPayload) {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot create a share image.");

  const displayFont = cssFont("--font-display", "Georgia, serif");
  const bodyFont = cssFont("--font-body", "Arial, sans-serif");
  const uiFont = cssFont("--font-ui", "Arial, sans-serif");

  if (payload.kind === "card") {
    await drawCardSpotlight(context, payload, displayFont, bodyFont, uiFont);
  } else if (payload.kind === "deck") {
    await drawDeckCard(context, payload, displayFont, bodyFont, uiFont);
  } else if (payload.kind === "collection") {
    drawCollectionCard(context, payload, displayFont, bodyFont, uiFont);
  } else {
    drawKnowledgeCard(context, payload, displayFont, bodyFont, uiFont);
  }

  const imageBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("The share image could not be exported."));
    }, "image/png");
  });

  const safeName = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  return new File([imageBlob], `${safeName || "palworld-share-card"}.png`, { type: "image/png" });
}
