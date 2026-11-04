import creatorLifestyle from '../assets/images/creator_ugc_lifestyle_1793541111707.jpg';
import saanjhCandles from '../assets/images/saanjh_luxury_candles_1793541111495.jpg';
import zegoreLeather from '../assets/images/zegore_leather_accessories_1793541111684.jpg';

export class PhoneScreenCanvas {
  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private images: { [key: string]: HTMLImageElement } = {};
  private imagesLoaded = false;

  constructor(width = 600, height = 1260) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D context for phone screen canvas');
    this.ctx = context;

    this.loadImages();
  }

  private loadImages() {
    const urls: { [key: string]: string } = {
      lifestyle: creatorLifestyle,
      saanjh: saanjhCandles,
      zegore: zegoreLeather,
    };

    let loadedCount = 0;
    const total = Object.keys(urls).length;

    Object.entries(urls).forEach(([key, url]) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) {
          this.imagesLoaded = true;
        }
      };
      img.src = url;
      this.images[key] = img;
    });
  }

  public render(progress: number, time = 0): HTMLCanvasElement {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Default clean background
    ctx.fillStyle = '#F7FAFD';
    ctx.fillRect(0, 0, w, h);

    // Top status bar
    this.drawStatusBar();

    if (progress < 0.20) {
      // Stage 1 (Meta Ads): Ad creative frame
      this.drawMetaAdStage(progress);
    } else if (progress < 0.45) {
      // Stage 2 (Creators Feed): 3-image vertical scrolling feed
      const stageP = (progress - 0.20) / (0.45 - 0.20);
      this.drawCreatorsFeedStage(stageP);
    } else if (progress < 0.70) {
      // Stage 3 (Operations): Clean report card drawing rows one by one
      const stageP = (progress - 0.45) / (0.70 - 0.45);
      this.drawOperationsReportStage(stageP);
    } else {
      // Stage 4 (Process): Systematic platform status & arc workflow
      const stageP = Math.min(1, (progress - 0.70) / (0.90 - 0.70));
      this.drawProcessStage(stageP);
    }

    // Dynamic Island overlay
    this.drawDynamicIsland();

    // Home indicator bar at bottom
    ctx.fillStyle = '#0F1B2D';
    this.drawRoundedRect(w / 2 - 80, h - 18, 160, 5, 2.5);
    ctx.fill();

    return this.canvas;
  }

  private drawStatusBar() {
    const { ctx, canvas } = this;
    const w = canvas.width;
    ctx.fillStyle = '#0F1B2D';
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('9:41', 48, 56);

    // Battery & signal icons
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#0F1B2D';
    // Battery outline
    ctx.strokeRect(w - 78, 38, 32, 18);
    ctx.fillRect(w - 74, 42, 22, 10);
    ctx.fillRect(w - 45, 43, 3, 8);
  }

  private drawDynamicIsland() {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const pillW = 160;
    const pillH = 44;
    const pillX = (w - pillW) / 2;
    const pillY = 24;

    ctx.fillStyle = '#0A111E';
    this.drawRoundedRect(pillX, pillY, pillW, pillH, 22);
    ctx.fill();

    // Camera lens dot
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.arc(pillX + 38, pillY + 22, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // STAGE 1: Clean Meta Ad Creative Frame
  private drawMetaAdStage(progress: number) {
    const { ctx, canvas } = this;
    const w = canvas.width;

    // Header sponsor row
    ctx.fillStyle = '#0F1B2D';
    ctx.font = '700 22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('KLIDO PARTNER BRAND', 90, 130);

    ctx.fillStyle = '#5B6B7F';
    ctx.font = '500 17px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Sponsored • Instagram Feed', 90, 155);

    // Brand icon circle
    ctx.fillStyle = '#2F7FD1';
    ctx.beginPath();
    ctx.arc(58, 140, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 18px sans-serif';
    ctx.fillText('K', 52, 146);

    // Creative Frame (Aspect 4:5 image container)
    const imgX = 36;
    const imgY = 180;
    const imgW = w - 72;
    const imgH = 660;

    ctx.save();
    this.drawRoundedRect(imgX, imgY, imgW, imgH, 16);
    ctx.clip();

    if (this.imagesLoaded && this.images.lifestyle) {
      ctx.drawImage(this.images.lifestyle, imgX, imgY, imgW, imgH);
    } else {
      ctx.fillStyle = '#D5E0EC';
      ctx.fillRect(imgX, imgY, imgW, imgH);
    }

    // Gradient overlay for text contrast at image bottom
    const grad = ctx.createLinearGradient(0, imgY + imgH - 180, 0, imgY + imgH);
    grad.addColorStop(0, 'rgba(15, 27, 45, 0)');
    grad.addColorStop(1, 'rgba(15, 27, 45, 0.85)');
    ctx.fillStyle = grad;
    ctx.fillRect(imgX, imgY + imgH - 180, imgW, 180);

    // ROAS badge in corner
    ctx.fillStyle = '#2F7FD1';
    this.drawRoundedRect(imgX + 24, imgY + 24, 160, 38, 6);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 18px sans-serif';
    ctx.fillText('PEAK ROAS: 4.2x', imgX + 38, imgY + 49);

    // Headline inside image
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 28px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('High-Return Acquisition', imgX + 24, imgY + imgH - 70);
    ctx.font = '500 18px sans-serif';
    ctx.fillStyle = '#EEF4FA';
    ctx.fillText('Ads that pay for themselves.', imgX + 24, imgY + imgH - 34);

    ctx.restore();

    // Action CTA Bar below image
    const btnY = imgY + imgH + 28;
    ctx.fillStyle = '#2F7FD1';
    this.drawRoundedRect(imgX, btnY, imgW, 64, 8);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Starting at ₹7,000 / month', w / 2, btnY + 39);
    ctx.textAlign = 'left';

    // Verification check below CTA
    ctx.fillStyle = '#5B6B7F';
    ctx.font = '500 16px sans-serif';
    ctx.fillText('✓ Direct Meta Billing • 0% Markup • Audited CAPI Tracking', imgX + 10, btnY + 104);
  }

  // STAGE 2: 3-Image Vertical Scrolling Feed
  private drawCreatorsFeedStage(stageP: number) {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    // Header: Creators Feed
    ctx.fillStyle = '#0F1B2D';
    ctx.font = '700 26px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('CREATORS & UGC FEED', 36, 130);
    ctx.fillStyle = '#5B6B7F';
    ctx.font = '500 17px sans-serif';
    ctx.fillText('10 Vetted Barter Placements / mo', 36, 160);

    const frameW = w - 72;
    const frameH = 500;
    const feedTotalDist = 800; // total scroll distance
    const currentScroll = stageP * feedTotalDist;

    const cards = [
      {
        imgKey: 'lifestyle',
        title: 'Artisan Tableware & Lifestyle',
        creator: '@hashi.living • 24.8k reach',
        deliverable: '3 Reels + Hook Variation'
      },
      {
        imgKey: 'saanjh',
        title: 'Handcrafted Luxury Decor',
        creator: '@saanjh.decor • 42.1k reach',
        deliverable: 'Barter Video Placement'
      },
      {
        imgKey: 'zegore',
        title: 'Modern Leather Accessories',
        creator: '@zegore.style • 18.5k reach',
        deliverable: 'Product Seeding UGC'
      }
    ];

    ctx.save();
    // Clip viewport for feed
    this.drawRoundedRect(36, 180, frameW, h - 230, 16);
    ctx.clip();

    cards.forEach((card, idx) => {
      const cardY = 180 + idx * (frameH + 24) - currentScroll;

      // Card image container
      this.drawRoundedRect(36, cardY, frameW, frameH, 14);
      ctx.fillStyle = '#E2ECF8';
      ctx.fill();

      if (this.imagesLoaded && this.images[card.imgKey]) {
        ctx.save();
        this.drawRoundedRect(36, cardY, frameW, frameH, 14);
        ctx.clip();
        ctx.drawImage(this.images[card.imgKey], 36, cardY, frameW, frameH);

        // Bottom gradient
        const grad = ctx.createLinearGradient(0, cardY + frameH - 160, 0, cardY + frameH);
        grad.addColorStop(0, 'rgba(15, 27, 45, 0)');
        grad.addColorStop(1, 'rgba(15, 27, 45, 0.9)');
        ctx.fillStyle = grad;
        ctx.fillRect(36, cardY + frameH - 160, frameW, 160);

        // Content
        ctx.fillStyle = '#2F7FD1';
        this.drawRoundedRect(56, cardY + 20, 180, 32, 6);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 15px sans-serif';
        ctx.fillText('VERIFIED BARTER', 74, cardY + 41);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 24px sans-serif';
        ctx.fillText(card.title, 56, cardY + frameH - 64);
        ctx.fillStyle = '#EEF4FA';
        ctx.font = '500 16px sans-serif';
        ctx.fillText(`${card.creator} • ${card.deliverable}`, 56, cardY + frameH - 30);

        ctx.restore();
      }
    });

    ctx.restore();
  }

  // STAGE 3: Executive Operations Report Card
  private drawOperationsReportStage(stageP: number) {
    const { ctx, canvas } = this;
    const w = canvas.width;

    // Report Header
    ctx.fillStyle = '#0F1B2D';
    ctx.font = '700 26px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('OPERATIONS & MARGIN AUDIT', 36, 130);
    ctx.fillStyle = '#5B6B7F';
    ctx.font = '500 17px sans-serif';
    ctx.fillText('Unit Economics • SOPs • Landed Margins', 36, 160);

    // Document Card Container
    const cardX = 36;
    const cardY = 190;
    const cardW = w - 72;
    const cardH = 880;

    ctx.fillStyle = '#FFFFFF';
    this.drawRoundedRect(cardX, cardY, cardW, cardH, 16);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#D5E0EC';
    ctx.stroke();

    // Document Sub-header
    ctx.fillStyle = '#2F7FD1';
    ctx.font = '700 15px monospace';
    ctx.fillText('KLIDO BACK-OFFICE FRAMEWORK v2.4', cardX + 24, cardY + 44);

    ctx.fillStyle = '#0F1B2D';
    ctx.font = '700 24px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Executive Unit Economics', cardX + 24, cardY + 84);

    // Divider
    ctx.strokeStyle = '#D5E0EC';
    ctx.beginPath();
    ctx.moveTo(cardX + 24, cardY + 110);
    ctx.lineTo(cardX + cardW - 24, cardY + 110);
    ctx.stroke();

    const rows = [
      { label: 'Granular SKU Landed Margins', value: '84% True Margin', desc: 'Freight, packaging & factory costs audited' },
      { label: 'Master Costing & P&L Model', value: 'Standardized', desc: 'Contribution margin modeled before scaling ad budget' },
      { label: 'Fulfillment & Packing SOPs', value: '48h Dispatch', desc: 'Standard operating procedures for warehouse teams' },
      { label: 'Inventory Reorder Rules', value: '14-Day Buffer', desc: 'Automated stockout & supplier lead time thresholds' },
      { label: 'Returns & RTO Reduction', value: '-34% Drag', desc: 'NDR calling workflows and COD confirmation SOPs' },
    ];

    // Rows draw in one by one based on stageP (0 to 1)
    rows.forEach((row, idx) => {
      const rowThreshold = idx / rows.length;
      if (stageP < rowThreshold) return; // not revealed yet

      const rowP = Math.min(1, (stageP - rowThreshold) * rows.length);
      const rowY = cardY + 140 + idx * 130;

      ctx.save();
      ctx.globalAlpha = rowP;

      // Row container highlight
      ctx.fillStyle = idx % 2 === 0 ? '#F7FAFD' : '#FFFFFF';
      this.drawRoundedRect(cardX + 16, rowY - 10, cardW - 32, 110, 8);
      ctx.fill();
      ctx.strokeStyle = '#EEF4FA';
      ctx.stroke();

      // Title & Value
      ctx.fillStyle = '#0F1B2D';
      ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(row.label, cardX + 32, rowY + 28);

      // Value Pill
      ctx.fillStyle = '#EEF4FA';
      this.drawRoundedRect(cardX + cardW - 190, rowY + 8, 160, 32, 6);
      ctx.fill();
      ctx.fillStyle = '#2F7FD1';
      ctx.font = '700 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(row.value, cardX + cardW - 110, rowY + 30);
      ctx.textAlign = 'left';

      // Description
      ctx.fillStyle = '#5B6B7F';
      ctx.font = '400 16px sans-serif';
      ctx.fillText(row.desc, cardX + 32, rowY + 66);

      // Animated draw line
      ctx.strokeStyle = '#2F7FD1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cardX + 32, rowY + 88);
      ctx.lineTo(cardX + 32 + (cardW - 64) * rowP, rowY + 88);
      ctx.stroke();

      ctx.restore();
    });

    // Approved Stamp
    if (stageP > 0.8) {
      ctx.save();
      ctx.strokeStyle = '#2F7FD1';
      ctx.lineWidth = 2;
      this.drawRoundedRect(cardX + cardW - 240, cardY + cardH - 80, 210, 48, 8);
      ctx.stroke();
      ctx.fillStyle = '#2F7FD1';
      ctx.font = '700 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('AUDITED & VERIFIED', cardX + cardW - 135, cardY + cardH - 50);
      ctx.textAlign = 'left';
      ctx.restore();
    }
  }

  // STAGE 4: Process Flowchart
  private drawProcessStage(stageP: number) {
    const { ctx, canvas } = this;
    const w = canvas.width;

    // Header
    ctx.fillStyle = '#0F1B2D';
    ctx.font = '700 26px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('04 / OUR SYSTEMATIC PROCESS', 36, 130);
    ctx.fillStyle = '#5B6B7F';
    ctx.font = '500 17px sans-serif';
    ctx.fillText('4-Step Execution Protocol', 36, 160);

    const steps = [
      { num: '01', title: 'Audit & Diagnostic', desc: 'Account access, SKU margins & tracking architecture', dur: 'Day 1–3' },
      { num: '02', title: 'Costing & Modeling', desc: 'Contribution margin & break-even ROAS framework', dur: 'Week 1' },
      { num: '03', title: 'SOPs & Creative Launch', desc: 'Fulfillment rules & first 10 barter creators onboarded', dur: 'Week 2' },
      { num: '04', title: 'Algorithmic Optimization', desc: 'Weekly creative testing & transparent P&L reviews', dur: 'Continuous' },
    ];

    const cardX = 36;
    const cardW = w - 72;

    steps.forEach((step, idx) => {
      const stepY = 210 + idx * 210;
      const isActive = stageP >= idx / 4;

      ctx.save();
      // Step card
      ctx.fillStyle = isActive ? '#FFFFFF' : '#F7FAFD';
      this.drawRoundedRect(cardX, stepY, cardW, 180, 14);
      ctx.fill();
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.strokeStyle = isActive ? '#2F7FD1' : '#D5E0EC';
      ctx.stroke();

      // Number badge
      ctx.fillStyle = isActive ? '#2F7FD1' : '#D5E0EC';
      this.drawRoundedRect(cardX + 24, stepY + 24, 48, 48, 8);
      ctx.fill();
      ctx.fillStyle = isActive ? '#FFFFFF' : '#5B6B7F';
      ctx.font = '700 20px monospace';
      ctx.fillText(step.num, cardX + 37, stepY + 56);

      // Title & Duration
      ctx.fillStyle = '#0F1B2D';
      ctx.font = '700 22px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(step.title, cardX + 90, stepY + 48);

      ctx.fillStyle = '#2F7FD1';
      ctx.font = '600 15px monospace';
      ctx.fillText(step.dur, cardX + cardW - 130, stepY + 48);

      // Description
      ctx.fillStyle = '#5B6B7F';
      ctx.font = '400 17px sans-serif';
      ctx.fillText(step.desc, cardX + 24, stepY + 116);

      ctx.restore();
    });
  }

  private drawRoundedRect(x: number, y: number, w: number, h: number, r: number) {
    const { ctx } = this;
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
}

