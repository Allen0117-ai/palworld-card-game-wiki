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
const SHARE_BACKDROP = "/share/palpagos-holo-archive.webp";

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

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
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

function drawBackground(
  context: CanvasRenderingContext2D,
  accent = GOLD,
  backdrop?: HTMLImageElement | null,
) {
  const gradient = context.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  gradient.addColorStop(0, "#0f110e");
  gradient.addColorStop(0.55, "#171a16");
  gradient.addColorStop(1, "#0b1717");
  context.fillStyle = gradient;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  if (backdrop) {
    context.save();
    context.globalAlpha = 0.96;
    drawCoverImage(context, backdrop, 0, 0, CARD_WIDTH, CARD_HEIGHT);
    context.restore();
  }

  const shadow = context.createLinearGradient(0, 0, 0, CARD_HEIGHT);
  shadow.addColorStop(0, "rgba(2,8,12,.12)");
  shadow.addColorStop(0.38, "rgba(2,8,12,.36)");
  shadow.addColorStop(0.72, "rgba(2,8,12,.68)");
  shadow.addColorStop(1, "rgba(2,5,8,.82)");
  context.fillStyle = shadow;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const glow = context.createRadialGradient(820, 320, 20, 820, 320, 680);
  glow.addColorStop(0, `${accent}2e`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  context.strokeStyle = "rgba(255,255,255,.18)";
  context.lineWidth = 2;
  context.strokeRect(34, 34, CARD_WIDTH - 68, CARD_HEIGHT - 68);
  context.strokeStyle = `${accent}a0`;
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(34, 190);
  context.lineTo(34, 34);
  context.lineTo(226, 34);
  context.moveTo(CARD_WIDTH - 34, CARD_HEIGHT - 226);
  context.lineTo(CARD_WIDTH - 34, CARD_HEIGHT - 34);
  context.lineTo(CARD_WIDTH - 226, CARD_HEIGHT - 34);
  context.stroke();

  const flare = context.createLinearGradient(50, 0, CARD_WIDTH - 50, CARD_HEIGHT);
  flare.addColorStop(0, "rgba(255,255,255,0)");
  flare.addColorStop(0.47, "rgba(255,255,255,.10)");
  flare.addColorStop(0.51, "rgba(255,255,255,0)");
  context.fillStyle = flare;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
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
  backdrop?: HTMLImageElement | null,
) {
  const accent = colorAccent(payload.accent);
  drawBackground(context, accent, backdrop);
  drawBrand(context, uiFont);
  drawEyebrow(context, payload.eyebrow, uiFont, 570, 196);

  const cardImage = await loadOptionalShareImage(payload.image);
  context.save();
  context.translate(304, 654);
  context.rotate(-0.035);
  context.shadowColor = accent;
  context.shadowBlur = 58;
  roundedRect(context, -224, -402, 448, 804, 24);
  context.fillStyle = "rgba(2,8,12,.88)";
  context.fill();
  context.strokeStyle = `${accent}e8`;
  context.lineWidth = 4;
  context.stroke();
  context.shadowBlur = 0;
  if (cardImage) {
    drawContainedImage(context, cardImage, -210, -388, 420, 776);
  } else {
    context.fillStyle = PANEL;
    context.fillRect(-210, -388, 420, 776);
  }
  const foil = context.createLinearGradient(-220, -330, 220, 360);
  foil.addColorStop(0, "rgba(255,255,255,0)");
  foil.addColorStop(0.46, "rgba(255,255,255,0)");
  foil.addColorStop(0.52, "rgba(255,255,255,.18)");
  foil.addColorStop(0.58, "rgba(255,255,255,0)");
  context.fillStyle = foil;
  roundedRect(context, -210, -388, 420, 776, 15);
  context.fill();
  context.restore();

  context.fillStyle = PAPER;
  context.font = `800 61px ${displayFont}`;
  let nextY = drawWrappedText(context, payload.title.toUpperCase(), 570, 274, 430, 68, 4);

  nextY += 22;
  for (const fact of payload.facts.slice(0, 4)) {
    context.font = `800 16px ${uiFont}`;
    const badgeWidth = Math.min(420, context.measureText(fact.toUpperCase()).width + 44);
    roundedRect(context, 570, nextY, badgeWidth, 46, 23);
    context.fillStyle = "rgba(3,10,14,.62)";
    context.fill();
    context.strokeStyle = `${accent}b8`;
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = PAPER;
    context.fillText(fact.toUpperCase(), 591, nextY + 30);
    nextY += 58;
  }

  roundedRect(context, 548, nextY + 10, 462, 222, 18);
  context.fillStyle = "rgba(2,8,12,.62)";
  context.fill();
  context.fillStyle = PAPER;
  context.font = `500 25px ${bodyFont}`;
  drawWrappedText(context, payload.body, 574, nextY + 57, 410, 36, 5);

  context.fillStyle = PAPER;
  context.font = `800 43px ${displayFont}`;
  context.fillText("WOULD YOU PLAY IT?", 70, 1112);
  context.fillStyle = GOLD;
  context.font = `500 22px ${bodyFont}`;
  context.fillText("Open it · Compare it · Build around it", 70, 1155);
  drawFooter(context, uiFont, payload.footerNote || "Official card art ©Bushiroad ©PALWORLD");
}

function drawKnowledgeCard(
  context: CanvasRenderingContext2D,
  payload: Extract<ShareCardPayload, { kind: "rule" | "guide" }>,
  displayFont: string,
  bodyFont: string,
  uiFont: string,
  backdrop?: HTMLImageElement | null,
) {
  drawBackground(context, GOLD, backdrop);
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
  backdrop?: HTMLImageElement | null,
) {
  const accent = colorAccent(payload.colors[0] || "colorless");
  drawBackground(context, accent, backdrop);
  drawBrand(context, uiFont);
  drawEyebrow(context, payload.eyebrow, uiFont, 70, 178);

  context.fillStyle = PAPER;
  context.font = `800 70px ${displayFont}`;
  const titleBottom = drawWrappedText(context, payload.title.toUpperCase(), 70, 262, 940, 78, 2);

  const statusY = titleBottom + 18;
  roundedRect(context, 70, statusY - 32, 458, 62, 31);
  context.fillStyle = payload.total === 50 ? "rgba(210,182,109,.90)" : "rgba(3,10,14,.72)";
  context.fill();
  context.fillStyle = payload.total === 50 ? "#071016" : GOLD;
  context.font = `900 24px ${uiFont}`;
  context.fillText(payload.total === 50 ? "50 / 50  ·  BATTLE READY" : `${payload.total} / 50  ·  DECK IN PROGRESS`, 94, statusY + 8);

  let pipX = 574;
  for (const color of payload.colors.slice(0, 2)) {
    context.beginPath();
    context.fillStyle = colorAccent(color);
    context.arc(pipX + 14, statusY, 14, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = PAPER;
    context.font = `800 17px ${uiFont}`;
    context.fillText(color.toUpperCase(), pipX + 38, statusY + 7);
    pipX += 170;
  }

  const cardY = statusY + 342;
  const cardWidth = 236;
  const cardHeight = 442;
  const angles = [-0.13, -0.045, 0.045, 0.13];
  const offsets = [44, 4, 4, 44];
  const images = await Promise.all(payload.cards.slice(0, 4).map((card) => loadOptionalShareImage(card.image)));

  payload.cards.slice(0, 4).forEach((card, index) => {
    const centerX = 170 + index * 246;
    const centerY = cardY + offsets[index];
    context.save();
    context.translate(centerX, centerY);
    context.rotate(angles[index]);
    context.shadowColor = colorAccent(payload.colors[index % Math.max(payload.colors.length, 1)] || "colorless");
    context.shadowBlur = 34;
    roundedRect(context, -cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 14);
    context.fillStyle = "rgba(2,8,12,.90)";
    context.fill();
    context.strokeStyle = "rgba(255,255,255,.36)";
    context.lineWidth = 3;
    context.stroke();
    context.shadowBlur = 0;
    if (images[index]) {
      drawContainedImage(context, images[index], -cardWidth / 2 + 10, -cardHeight / 2 + 10, cardWidth - 20, 334);
    }
    roundedRect(context, -cardWidth / 2 + 10, cardHeight / 2 - 82, cardWidth - 20, 68, 8);
    context.fillStyle = "rgba(2,8,12,.88)";
    context.fill();
    context.fillStyle = PAPER;
    context.font = `800 16px ${uiFont}`;
    drawWrappedText(context, card.name, -cardWidth / 2 + 20, cardHeight / 2 - 52, cardWidth - 64, 20, 2);
    context.textAlign = "right";
    context.fillStyle = GOLD;
    context.font = `900 18px ${uiFont}`;
    context.fillText(`×${card.copies}`, cardWidth / 2 - 20, cardHeight / 2 - 38);
    context.textAlign = "left";
    context.restore();
  });

  context.fillStyle = PAPER;
  context.font = `800 44px ${displayFont}`;
  context.fillText("REMIX THE LINEUP.", 70, 1098);
  context.fillStyle = GOLD;
  context.font = `500 24px ${bodyFont}`;
  context.fillText("Open this deck and make it yours.", 70, 1142);
  drawFooter(context, uiFont, "No account needed.");
}

function drawCollectionCard(
  context: CanvasRenderingContext2D,
  payload: Extract<ShareCardPayload, { kind: "collection" }>,
  displayFont: string,
  bodyFont: string,
  uiFont: string,
  backdrop?: HTMLImageElement | null,
) {
  drawBackground(context, "#5aabc1", backdrop);
  drawBrand(context, uiFont);
  drawEyebrow(context, payload.eyebrow, uiFont, 70, 190);

  context.fillStyle = PAPER;
  context.font = `800 67px ${displayFont}`;
  const titleBottom = drawWrappedText(context, payload.title.toUpperCase(), 70, 292, 940, 78, 3);
  const completion = Math.round((payload.owned / payload.total) * 100);

  const centerX = 540;
  const centerY = Math.max(690, titleBottom + 270);
  context.save();
  context.shadowColor = "#5aabc1";
  context.shadowBlur = 40;
  context.strokeStyle = "rgba(255,255,255,.16)";
  context.lineWidth = 32;
  context.beginPath();
  context.arc(centerX, centerY, 214, -Math.PI / 2, Math.PI * 1.5);
  context.stroke();
  const progressGradient = context.createLinearGradient(centerX - 210, centerY, centerX + 210, centerY);
  progressGradient.addColorStop(0, GOLD);
  progressGradient.addColorStop(1, "#5aabc1");
  context.strokeStyle = progressGradient;
  context.lineCap = "round";
  context.beginPath();
  context.arc(
    centerX,
    centerY,
    214,
    -Math.PI / 2,
    -Math.PI / 2 + Math.PI * 2 * (completion / 100),
  );
  context.stroke();
  context.restore();

  context.textAlign = "center";
  context.fillStyle = PAPER;
  context.font = `800 142px ${displayFont}`;
  context.fillText(`${completion}%`, centerX, centerY + 32);
  context.fillStyle = GOLD;
  context.font = `900 23px ${uiFont}`;
  context.fillText(`${payload.owned} OF ${payload.total} DISCOVERED`, centerX, centerY + 92);

  context.fillStyle = PAPER;
  context.font = `800 45px ${displayFont}`;
  context.fillText("HOW FAR HAVE YOU EXPLORED?", centerX, 1090);
  context.fillStyle = GOLD;
  context.font = `500 25px ${bodyFont}`;
  context.fillText("Open the checklist. Start your own archive.", centerX, 1136);
  context.textAlign = "left";
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
  const backdrop = await loadOptionalShareImage(SHARE_BACKDROP);

  if (payload.kind === "card") {
    await drawCardSpotlight(context, payload, displayFont, bodyFont, uiFont, backdrop);
  } else if (payload.kind === "deck") {
    await drawDeckCard(context, payload, displayFont, bodyFont, uiFont, backdrop);
  } else if (payload.kind === "collection") {
    drawCollectionCard(context, payload, displayFont, bodyFont, uiFont, backdrop);
  } else {
    drawKnowledgeCard(context, payload, displayFont, bodyFont, uiFont, backdrop);
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
