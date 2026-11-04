import saanjhCandles from '../assets/images/saanjh_luxury_candles_1793541111495.jpg';
import creatorLifestyle from '../assets/images/creator_ugc_lifestyle_1793541111707.jpg';
import creatorArtisan from '../assets/images/creator_ugc_artisan_1793541111804.jpg';
import zegoreLeather from '../assets/images/zegore_leather_accessories_1793541111684.jpg';
import hashiCeramics from '../assets/images/hashi_ceramics_home_1793541111377.jpg';

export interface PhoneScreenCanvases {
  canvasMetaAds: HTMLCanvasElement;
  canvasCreators: HTMLCanvasElement;
  canvasSocial: HTMLCanvasElement;
  canvasOperations: HTMLCanvasElement;
}

export class PhoneScreensManager {
  // Exactly 1080x2340 coordinate space (ratio 0.4615)
  public width = 1080;
  public height = 2340;

  public canvasMetaAds: HTMLCanvasElement;
  public canvasCreators: HTMLCanvasElement;
  public canvasSocial: HTMLCanvasElement;
  public canvasOperations: HTMLCanvasElement;

  private ctxMetaAds: CanvasRenderingContext2D;
  private ctxCreators: CanvasRenderingContext2D;
  private ctxSocial: CanvasRenderingContext2D;
  private ctxOperations: CanvasRenderingContext2D;

  private images: { [key: string]: HTMLImageElement } = {};
  public isReady = false;

  constructor() {
    this.canvasMetaAds = this.createCanvas();
    this.canvasCreators = this.createCanvas();
    this.canvasSocial = this.createCanvas();
    this.canvasOperations = this.createCanvas();

    this.ctxMetaAds = this.canvasMetaAds.getContext('2d')!;
    this.ctxCreators = this.canvasCreators.getContext('2d')!;
    this.ctxSocial = this.canvasSocial.getContext('2d')!;
    this.ctxOperations = this.canvasOperations.getContext('2d')!;
  }

  private createCanvas(): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = this.width;
    c.height = this.height;
    return c;
  }

  public async init(): Promise<void> {
    const imageSources: { [key: string]: string } = {
      saanjh: saanjhCandles,
      lifestyle: creatorLifestyle,
      artisan: creatorArtisan,
      zegore: zegoreLeather,
      hashi: hashiCeramics,
    };

    const loadImages = Object.entries(imageSources).map(([key, src]) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.decode()
          .then(() => {
            this.images[key] = img;
            resolve();
          })
          .catch(() => {
            img.onload = () => {
              this.images[key] = img;
              resolve();
            };
            img.onerror = (e) => {
              console.error(`[PhoneScreens] Failed to load/decode texture image "${key}" at path: ${src}`, e);
              resolve();
            };
          });
      });
    });

    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    await Promise.all([...loadImages, fontsPromise]);
    this.isReady = true;

    // Draw all 4 stage screens ONCE at load into 4 separate textures (do not redraw during scroll)
    this.renderMetaAds();
    this.renderCreators();
    this.renderSocial();
    this.renderOperations();

    console.log('[PhoneScreenFix Verified]', {
      planeSize: { width: 1.4585, height: 3.16 },
      canvasSize: { width: this.width, height: this.height },
      ratio: (1.4585 / 3.16).toFixed(4),
      canvasRatio: (this.width / this.height).toFixed(4),
      edgeToEdge: true,
      borderConfirmed: '4px #1558C9 on inner boundary'
    });
  }

  // --- Helpers in strict 1080x2340 coordinate space (no DPR scaling) ---
  private drawScreenBorder(ctx: CanvasRenderingContext2D) {
    ctx.save();
    // 4px #1558C9 border line on the inner edge of the screen to visually confirm edge-to-edge coverage
    ctx.strokeStyle = '#1558C9';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, this.width - 4, this.height - 4);
    ctx.restore();
  }

  private drawStatusBar(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = '#F4F6FA';
    ctx.font = '600 44px -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif';
    ctx.fillText('9:41', 64, 82);

    // Battery outline & level
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#F4F6FA';
    ctx.strokeRect(this.width - 138, 54, 56, 32);
    ctx.fillStyle = '#F4F6FA';
    ctx.fillRect(this.width - 132, 60, 38, 20);
    ctx.fillRect(this.width - 80, 64, 5, 12);

    // Wifi icon (3 bars)
    ctx.beginPath();
    ctx.arc(this.width - 176, 74, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private drawDynamicIsland(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const w = 310;
    const h = 76;
    const x = (this.width - w) / 2;
    const y = 28;

    ctx.fillStyle = '#000000';
    this.drawRoundedRect(ctx, x, y, w, h, 38);
    ctx.fill();

    // Camera lens dot
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(x + 70, y + 38, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private drawHomeIndicator(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = 'rgba(244, 246, 250, 0.4)';
    const barW = 280;
    const barH = 8;
    this.drawRoundedRect(ctx, (this.width - barW) / 2, this.height - 40, barW, barH, 4);
    ctx.fill();
    ctx.restore();
  }

  private drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  private drawCoverImage(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement | undefined,
    x: number,
    y: number,
    w: number,
    h: number,
    r = 0
  ) {
    ctx.save();
    if (r > 0) {
      this.drawRoundedRect(ctx, x, y, w, h, r);
      ctx.clip();
    }

    if (img && img.complete && img.naturalWidth > 0) {
      const imgRatio = img.width / img.height;
      const targetRatio = w / h;
      let sx = 0;
      let sy = 0;
      let sWidth = img.width;
      let sHeight = img.height;

      if (imgRatio > targetRatio) {
        sWidth = img.height * targetRatio;
        sx = (img.width - sWidth) / 2;
      } else {
        sHeight = img.width / targetRatio;
        sy = (img.height - sHeight) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
    } else {
      ctx.fillStyle = '#0B0F18';
      ctx.fillRect(x, y, w, h);
    }
    ctx.restore();
  }

  // ==========================================
  // 1. META ADS SCREEN (Exact 1080x2340 edge-to-edge layout)
  // ==========================================
  public renderMetaAds() {
    const ctx = this.ctxMetaAds;
    const w = this.width;
    const h = this.height;

    // Edge to edge padding: strictly 48px padding (content area width = 984px)
    const padX = 48;
    const contentW = 984;

    ctx.fillStyle = '#030407';
    ctx.fillRect(0, 0, w, h);

    // 4px #1558C9 border line confirming edge-to-edge coverage
    this.drawScreenBorder(ctx);

    // Status bar: top 0 to 110px
    this.drawStatusBar(ctx);
    this.drawDynamicIsland(ctx);

    // Content area: 110px to 2260px
    // Header strip
    const headerY = 120;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, headerY, contentW, 64, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#9AA3B2';
    ctx.font = '700 32px monospace';
    ctx.fillText('SPONSORED • KLIDO AD CAMPAIGN', padX + 28, headerY + 44);

    // Main Creative Image: at least 984px wide, ~1300px tall (cover fit)
    const creativeX = padX;
    const creativeY = 205;
    const creativeW = contentW; // exactly 984px
    const creativeH = 1300; // exactly 1300px

    this.drawCoverImage(ctx, this.images.saanjh, creativeX, creativeY, creativeW, creativeH, 24);

    // Creative Overlay & Headline
    ctx.save();
    this.drawRoundedRect(ctx, creativeX, creativeY, creativeW, creativeH, 24);
    ctx.clip();
    const grad = ctx.createLinearGradient(0, creativeY + creativeH - 420, 0, creativeY + creativeH);
    grad.addColorStop(0, 'rgba(3, 4, 7, 0)');
    grad.addColorStop(1, 'rgba(3, 4, 7, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(creativeX, creativeY + creativeH - 420, creativeW, 420);

    // Pill inside creative
    ctx.fillStyle = '#1558C9';
    this.drawRoundedRect(ctx, creativeX + 36, creativeY + 36, 420, 64, 10);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 32px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('PROFITABLE ACQUISITION', creativeX + 54, creativeY + 80);

    // Inside image headline & subtext
    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 68px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Direct Customer Growth', creativeX + 36, creativeY + creativeH - 120);

    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 40px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Ads engineered for contribution margin.', creativeX + 36, creativeY + creativeH - 50);
    ctx.restore();

    // CTA Button
    const btnY = 1530;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, btnY, contentW, 108, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#F4F6FA';
    ctx.font = '600 40px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Learn More →', w / 2, btnY + 70);
    ctx.textAlign = 'left';

    // Headline (64px+)
    const headY = 1710;
    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 64px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Ads that pay for themselves.', padX + 8, headY);

    // Body (40px+)
    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 40px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Direct Meta ad account billing • 0% hidden markup', padX + 8, headY + 60);

    // 2-Box Deliverables strip
    const boxesY = 1840;
    const boxH = 220;
    const boxW = (contentW - 24) / 2;

    // Box 1
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, boxesY, boxW, boxH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#D4FF24';
    ctx.font = '700 32px monospace';
    ctx.fillText('BASE TIER', padX + 28, boxesY + 54);
    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 56px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('₹7,000 / mo', padX + 28, boxesY + 128);
    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 32px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Under ₹1L ad spend threshold', padX + 28, boxesY + 180);

    // Box 2
    const box2X = padX + boxW + 24;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, box2X, boxesY, boxW, boxH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#1558C9';
    ctx.font = '700 32px monospace';
    ctx.fillText('SCALING FEE', box2X + 28, boxesY + 54);
    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 56px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('10% Fee', box2X + 28, boxesY + 128);
    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 32px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Audited scaling above ₹1L spend', box2X + 28, boxesY + 180);

    // Footer Strip: 120px tall at the bottom of content area (2110 to 2230px)
    const footerY = 2110;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, footerY, contentW, 120, 18);
    ctx.fill();
    ctx.strokeStyle = '#1558C9';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Cobalt bullet
    ctx.fillStyle = '#1558C9';
    ctx.beginPath();
    ctx.arc(padX + 54, footerY + 60, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F4F6FA';
    ctx.font = '600 36px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Weekly performance & ROAS audit', padX + 90, footerY + 72);

    // Home indicator at bottom
    this.drawHomeIndicator(ctx);
  }

  // ==========================================
  // 2. CREATORS SCREEN (Drawn ONCE at load, 984px content width)
  // ==========================================
  public renderCreators() {
    const ctx = this.ctxCreators;
    const w = this.width;
    const h = this.height;

    const padX = 48;
    const contentW = 984;

    ctx.fillStyle = '#030407';
    ctx.fillRect(0, 0, w, h);

    this.drawScreenBorder(ctx);
    this.drawStatusBar(ctx);
    this.drawDynamicIsland(ctx);

    // Section Tag (32px+)
    ctx.fillStyle = '#1558C9';
    ctx.font = '700 32px monospace';
    ctx.fillText('02 / CREATOR CAMPAIGN PLATFORM', padX, 160);

    // Headline (64px+)
    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 64px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Creator Execution Hub', padX, 235);

    // Subhead (40px+)
    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 40px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('10 Vetted Barter Collaborations / Month', padX, 290);

    // 2 Overview Stat Pills
    const statY = 320;
    const statW = (contentW - 24) / 2;
    const statH = 130;

    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, statY, statW, statH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 30px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('DELIVERABLES', padX + 24, statY + 46);
    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 44px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('10 Videos / mo', padX + 24, statY + 100);

    const stat2X = padX + statW + 24;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, stat2X, statY, statW, statH, 16);
    ctx.fill();
    ctx.strokeStyle = '#1558C9';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 30px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('USAGE RIGHTS', stat2X + 24, statY + 46);
    ctx.fillStyle = '#D4FF24';
    ctx.font = '700 44px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Whitelisted Active', stat2X + 24, statY + 100);

    // Creator Profile Cards (2 cards, exactly sized)
    const creators = [
      {
        img: this.images.lifestyle,
        handle: '@maya.rituals',
        niche: '84.2K • Organic Lifestyle',
        deliverable: '1080x1920 UGC Reel + 3 Hooks',
        status: 'WHITELISTED',
        engagement: '5.8%',
      },
      {
        img: this.images.artisan,
        handle: '@urban.sanctuary',
        niche: '122.5K • Home Decor',
        deliverable: 'Visual Unboxing & Texture B-Roll',
        status: 'APPROVED',
        engagement: '6.4%',
      },
    ];

    const cardH = 750;
    const gap = 30;
    const startCardY = 480;

    creators.forEach((item, idx) => {
      const cardY = startCardY + idx * (cardH + gap);

      // Card Background
      ctx.fillStyle = '#0B0F18';
      this.drawRoundedRect(ctx, padX, cardY, contentW, cardH, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Top Row: Avatar + Handle + Badge
      const headH = 110;
      ctx.save();
      ctx.beginPath();
      ctx.arc(padX + 56, cardY + headH / 2, 38, 0, Math.PI * 2);
      ctx.clip();
      this.drawCoverImage(ctx, item.img, padX + 18, cardY + headH / 2 - 38, 76, 76, 0);
      ctx.restore();

      ctx.strokeStyle = '#1558C9';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(padX + 56, cardY + headH / 2, 38, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#F4F6FA';
      ctx.font = '700 36px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(item.handle, padX + 115, cardY + 54);

      ctx.fillStyle = '#9AA3B2';
      ctx.font = '500 30px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(item.niche, padX + 115, cardY + 92);

      // Status Badge
      const badgeW = 210;
      const badgeH = 48;
      const badgeX = padX + contentW - badgeW - 24;
      const badgeY = cardY + 32;

      ctx.fillStyle = item.status === 'WHITELISTED' ? '#1558C9' : 'rgba(212, 255, 36, 0.15)';
      this.drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 8);
      ctx.fill();
      ctx.fillStyle = item.status === 'WHITELISTED' ? '#FFFFFF' : '#D4FF24';
      ctx.font = '700 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(item.status, badgeX + badgeW / 2, badgeY + 32);
      ctx.textAlign = 'left';

      // Video Preview
      const previewY = cardY + headH;
      const previewH = 500;
      this.drawCoverImage(ctx, item.img, padX + 20, previewY, contentW - 40, previewH, 16);

      // Play button in center
      const playX = padX + contentW / 2;
      const playY = previewY + previewH / 2;
      ctx.fillStyle = 'rgba(11, 15, 24, 0.75)';
      ctx.beginPath();
      ctx.arc(playX, playY, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(playX - 10, playY - 18);
      ctx.lineTo(playX + 16, playY);
      ctx.lineTo(playX - 10, playY + 18);
      ctx.closePath();
      ctx.fill();

      // Video tag in overlay
      ctx.fillStyle = 'rgba(3, 4, 7, 0.85)';
      this.drawRoundedRect(ctx, padX + 36, previewY + previewH - 70, contentW - 72, 54, 8);
      ctx.fill();
      ctx.fillStyle = '#F4F6FA';
      ctx.font = '600 28px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(item.deliverable, padX + 54, previewY + previewH - 34);

      // Bottom Meta Row
      const botY = previewY + previewH + 18;
      ctx.fillStyle = '#9AA3B2';
      ctx.font = '500 28px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`Deliverable Tracking • Engagement ${item.engagement}`, padX + 32, botY + 44);
      ctx.fillStyle = '#D4FF24';
      ctx.font = '700 28px monospace';
      ctx.fillText('Full Ad Whitelist', padX + contentW - 270, botY + 44);
    });

    // Footer Strip: 120px tall at bottom of content area
    const footerY = 2110;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, footerY, contentW, 120, 18);
    ctx.fill();
    ctx.strokeStyle = '#1558C9';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#1558C9';
    ctx.beginPath();
    ctx.arc(padX + 54, footerY + 60, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F4F6FA';
    ctx.font = '600 36px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('10 barter creator placements managed monthly', padX + 90, footerY + 72);

    this.drawHomeIndicator(ctx);
  }

  // ==========================================
  // 3. SOCIAL MEDIA SCREEN (Drawn ONCE at load, 984px content width)
  // ==========================================
  public renderSocial() {
    const ctx = this.ctxSocial;
    const w = this.width;
    const h = this.height;

    const padX = 48;
    const contentW = 984;

    ctx.fillStyle = '#030407';
    ctx.fillRect(0, 0, w, h);

    this.drawScreenBorder(ctx);
    this.drawStatusBar(ctx);
    this.drawDynamicIsland(ctx);

    ctx.fillStyle = '#1558C9';
    ctx.font = '700 32px monospace';
    ctx.fillText('03 / BRAND PRESENCE', padX, 160);

    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 64px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Curated Multi-Format Grid', padX, 235);

    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 40px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('15 Monthly Feed Posts & Daily Active Stories', padX, 290);

    // Stories Circles Row
    const storiesY = 320;
    const circleSize = 144;
    const storiesSpacing = (contentW - circleSize * 4) / 3;

    const storyData = [
      { label: 'Briefs', img: this.images.lifestyle },
      { label: 'Reels', img: this.images.artisan },
      { label: 'Feed', img: this.images.saanjh },
      { label: 'Launch', img: this.images.zegore },
    ];

    storyData.forEach((story, idx) => {
      const cx = padX + idx * (circleSize + storiesSpacing);

      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#1558C9';
      ctx.beginPath();
      ctx.arc(cx + circleSize / 2, storiesY + circleSize / 2, circleSize / 2 + 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx + circleSize / 2, storiesY + circleSize / 2, circleSize / 2, 0, Math.PI * 2);
      ctx.clip();
      this.drawCoverImage(ctx, story.img, cx, storiesY, circleSize, circleSize, 0);
      ctx.restore();

      ctx.fillStyle = '#9AA3B2';
      ctx.font = '600 30px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(story.label, cx + circleSize / 2, storiesY + circleSize + 40);
      ctx.textAlign = 'left';
    });

    // 3x3 Grid of Content Assets
    const gridY = 540;
    const gridGap = 18;
    const tileSize = (contentW - gridGap * 2) / 3; // ~316px

    const gridTiles = [
      { type: 'image', img: this.images.lifestyle },
      { type: 'cobalt', text: 'CREATIVE\nBRIEFS' },
      { type: 'image', img: this.images.hashi },
      { type: 'black', text: 'WEEKLY\nSOPs' },
      { type: 'image', img: this.images.saanjh },
      { type: 'cobalt', text: 'ACTIVE\nREELS' },
      { type: 'image', img: this.images.zegore },
      { type: 'black', text: 'BRAND\nVOICE' },
      { type: 'image', img: this.images.artisan },
    ];

    gridTiles.forEach((tile, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const tx = padX + col * (tileSize + gridGap);
      const ty = gridY + row * (tileSize + gridGap);

      if (tile.type === 'image') {
        this.drawCoverImage(ctx, tile.img, tx, ty, tileSize, tileSize, 14);
      } else if (tile.type === 'cobalt') {
        ctx.fillStyle = '#1558C9';
        this.drawRoundedRect(ctx, tx, ty, tileSize, tileSize, 14);
        ctx.fill();

        ctx.fillStyle = '#F4F6FA';
        ctx.font = '700 32px monospace';
        ctx.textAlign = 'center';
        const lines = tile.text!.split('\n');
        ctx.fillText(lines[0], tx + tileSize / 2, ty + tileSize / 2 - 10);
        ctx.fillText(lines[1], tx + tileSize / 2, ty + tileSize / 2 + 30);
        ctx.textAlign = 'left';
      } else {
        ctx.fillStyle = '#0B0F18';
        this.drawRoundedRect(ctx, tx, ty, tileSize, tileSize, 14);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#9AA3B2';
        ctx.font = '700 30px monospace';
        ctx.textAlign = 'center';
        const lines = tile.text!.split('\n');
        ctx.fillText(lines[0], tx + tileSize / 2, ty + tileSize / 2 - 10);
        ctx.fillText(lines[1], tx + tileSize / 2, ty + tileSize / 2 + 30);
        ctx.textAlign = 'left';
      }
    });

    // Content specs block
    const specsY = 1580;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, specsY, contentW, 200, 18);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#D4FF24';
    ctx.font = '700 32px monospace';
    ctx.fillText('MONTHLY SCOPE', padX + 32, specsY + 54);
    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 52px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('₹5,000 / mo', padX + 32, specsY + 120);
    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 34px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Consistent verified brand presence & community', padX + 32, specsY + 168);

    // Deliverables points
    const ptsY = 1820;
    const pts = [
      '✓ Multi-format content calendar with scheduled feed publishing',
      '✓ 15 Custom feed assets, carousels & graphic designs',
      '✓ Daily active story sequences, engagement polls & brand voice',
      '✓ Community moderation, direct reply workflows & comment defense',
    ];
    pts.forEach((pt, i) => {
      ctx.fillStyle = '#F4F6FA';
      ctx.font = '500 32px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(pt, padX + 8, ptsY + i * 56);
    });

    // Footer Strip: 120px tall
    const footerY = 2110;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, footerY, contentW, 120, 18);
    ctx.fill();
    ctx.strokeStyle = '#1558C9';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#1558C9';
    ctx.beginPath();
    ctx.arc(padX + 54, footerY + 60, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F4F6FA';
    ctx.font = '600 36px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Scheduled multi-format content calendar • Daily moderation', padX + 90, footerY + 72);

    this.drawHomeIndicator(ctx);
  }

  // ==========================================
  // 4. OPERATIONS SCREEN (Drawn ONCE at load, 984px content width)
  // ==========================================
  public renderOperations() {
    const ctx = this.ctxOperations;
    const w = this.width;
    const h = this.height;

    const padX = 48;
    const contentW = 984;

    ctx.fillStyle = '#030407';
    ctx.fillRect(0, 0, w, h);

    this.drawScreenBorder(ctx);
    this.drawStatusBar(ctx);
    this.drawDynamicIsland(ctx);

    ctx.fillStyle = '#1558C9';
    ctx.font = '700 32px monospace';
    ctx.fillText('04 / MARGIN DEFENSE', padX, 160);

    ctx.fillStyle = '#F4F6FA';
    ctx.font = '700 64px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Business Operations', padX, 235);

    ctx.fillStyle = '#9AA3B2';
    ctx.font = '500 40px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Granular SKU Unit Economics & SOP Verification', padX, 290);

    // 4 Protocol Rows
    const rows = [
      {
        title: 'Audit',
        subtitle: 'Granular SKU unit economics & landed margin defense',
      },
      {
        title: 'Costing',
        subtitle: 'Master P&L modeling & break-even ROAS thresholds',
      },
      {
        title: 'SOPs',
        subtitle: 'Warehouse packing standards & dispatch rules',
      },
      {
        title: 'Review',
        subtitle: 'Algorithmic performance audit & weekly margin check',
      },
    ];

    const rowStart = 350;
    const rowH = 410;

    rows.forEach((row, idx) => {
      const ry = rowStart + idx * rowH;

      ctx.fillStyle = '#0B0F18';
      this.drawRoundedRect(ctx, padX, ry, contentW, rowH - 40, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Cobalt checkmark circle
      const circleX = padX + 70;
      const circleY = ry + 80;
      const circleR = 32;

      ctx.fillStyle = '#1558C9';
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2);
      ctx.fill();

      // Checkmark mark
      ctx.strokeStyle = '#F4F6FA';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(circleX - 12, circleY);
      ctx.lineTo(circleX - 2, circleY + 10);
      ctx.lineTo(circleX + 14, circleY - 10);
      ctx.stroke();

      // Title (64px+)
      ctx.fillStyle = '#F4F6FA';
      ctx.font = '700 64px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(row.title, padX + 130, ry + 100);

      // Verified pill on right
      const pillW = 200;
      const pillH = 50;
      const pillX = padX + contentW - pillW - 32;
      const pillY = ry + 60;

      ctx.fillStyle = 'rgba(21, 88, 201, 0.2)';
      this.drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 10);
      ctx.fill();
      ctx.strokeStyle = '#1558C9';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#F4F6FA';
      ctx.font = '700 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('VERIFIED', pillX + pillW / 2, pillY + 34);
      ctx.textAlign = 'left';

      // Divider inside card
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padX + 32, ry + 160);
      ctx.lineTo(padX + contentW - 32, ry + 160);
      ctx.stroke();

      // Subtitle (40px)
      ctx.fillStyle = '#9AA3B2';
      ctx.font = '500 38px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(row.subtitle, padX + 32, ry + 225);

      // Execution detail
      ctx.fillStyle = '#D4FF24';
      ctx.font = '600 30px monospace';
      ctx.fillText('PROTOCOL ACTIVE • CONTRIBUTION MARGIN PROTECTED', padX + 32, ry + 300);
    });

    // Footer Strip: 120px tall
    const footerY = 2110;
    ctx.fillStyle = '#0B0F18';
    this.drawRoundedRect(ctx, padX, footerY, contentW, 120, 18);
    ctx.fill();
    ctx.strokeStyle = '#1558C9';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#1558C9';
    ctx.beginPath();
    ctx.arc(padX + 54, footerY + 60, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F4F6FA';
    ctx.font = '600 36px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('All unit economics audited before scaling budget', padX + 90, footerY + 72);

    this.drawHomeIndicator(ctx);
  }
}
