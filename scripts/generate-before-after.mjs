import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/before-after');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Read base64 images
const candleBase64 = fs.readFileSync('src/assets/images/saanjh_luxury_candles_1793541111495.jpg').toString('base64');
const lifestyleBase64 = fs.readFileSync('src/assets/images/creator_ugc_lifestyle_1793541111707.jpg').toString('base64');
const artisanBase64 = fs.readFileSync('src/assets/images/creator_ugc_artisan_1793541111804.jpg').toString('base64');
const leatherBase64 = fs.readFileSync('src/assets/images/zegore_leather_accessories_1793541111684.jpg').toString('base64');
const ceramicBase64 = fs.readFileSync('src/assets/images/hashi_ceramics_home_1793541111377.jpg').toString('base64');

// 1. META ADS BEFORE
const metaAdsBefore = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-m-b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A1820" />
      <stop offset="100%" stop-color="#121116" />
    </linearGradient>
    <filter id="shadow-m-b" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="900" height="1100" fill="url(#bg-m-b)"/>
  
  <!-- Subtle Grid lines -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="200" x2="900" y2="200"/>
    <line x1="0" y1="400" x2="900" y2="400"/>
    <line x1="0" y1="600" x2="900" y2="600"/>
    <line x1="0" y1="800" x2="900" y2="800"/>
  </g>

  <!-- Status Warning Header -->
  <rect x="50" y="50" width="800" height="64" rx="8" fill="#2E1214" stroke="#7A2227" stroke-width="1.5"/>
  <circle cx="84" cy="82" r="10" fill="#EF4444"/>
  <text x="110" y="88" fill="#FCA5A5" font-family="system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="1">
    UNOPTIMIZED CREATIVE • ROAS 0.78x • NEGATIVE MARGIN
  </text>

  <!-- Chaotic Ad Canvas Area -->
  <g transform="translate(60, 140)">
    <!-- Canvas container with harsh dashed border -->
    <rect width="780" height="890" rx="12" fill="#EAE5D9" stroke="#DC2626" stroke-width="3" stroke-dasharray="10 6"/>

    <!-- Amateur Stretched Sale Headline -->
    <rect x="30" y="25" width="720" height="90" rx="6" fill="#DC2626"/>
    <text x="390" y="85" text-anchor="middle" fill="#FEF08A" font-family="'Impact', 'Arial Black', sans-serif" font-size="52" letter-spacing="1">
      💥 80% OFF MEGA SALE 💥
    </text>

    <!-- Subtitle with mismatched font -->
    <text x="390" y="145" text-anchor="middle" fill="#1E293B" font-family="'Comic Sans MS', cursive, sans-serif" font-size="24" font-weight="bold">
      BUY 1 GET 5 FREE TODAY ONLY!!! DONT MISS OUT!!
    </text>

    <!-- Pixelated product image simulation -->
    <g transform="translate(140, 170)">
      <rect width="500" height="420" rx="8" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
      <image href="data:image/jpeg;base64,${candleBase64}" x="10" y="10" width="480" height="400" preserveAspectRatio="none" opacity="0.85" filter="url(#shadow-m-b)"/>
      <!-- Awkward clipart badge over image -->
      <polygon points="400,20 480,20 480,100 400,100" fill="#EAB308"/>
      <text x="440" y="55" text-anchor="middle" fill="#000" font-family="sans-serif" font-weight="900" font-size="16">HOT</text>
      <text x="440" y="78" text-anchor="middle" fill="#000" font-family="sans-serif" font-weight="900" font-size="14">DEAL</text>
    </g>

    <!-- Starburst sticker -->
    <g transform="translate(40, 480)">
      <circle cx="80" cy="80" r="75" fill="#EF4444" stroke="#FBBF24" stroke-width="4"/>
      <text x="80" y="70" text-anchor="middle" fill="#FFF" font-family="sans-serif" font-weight="900" font-size="22">CHEAPEST</text>
      <text x="80" y="98" text-anchor="middle" fill="#FEF08A" font-family="sans-serif" font-weight="900" font-size="24">IN INDIA</text>
    </g>

    <!-- Cluttered bullet text -->
    <g transform="translate(240, 615)" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0F172A">
      <text x="0" y="0">❌ No conversion tracking configured</text>
      <text x="0" y="32">❌ Weak hook &amp; cluttered copy</text>
      <text x="0" y="64">❌ Ad spend wasted on wrong audiences</text>
    </g>

    <!-- Clunky Call-To-Action Button -->
    <g transform="translate(140, 730)">
      <rect width="500" height="85" rx="8" fill="#16A34A" stroke="#15803D" stroke-width="3"/>
      <text x="250" y="54" text-anchor="middle" fill="#FFFFFF" font-family="'Arial Black', sans-serif" font-size="30">
        ORDER NOW ON COD &gt;&gt;&gt;
      </text>
    </g>

    <!-- Footer disclaimer -->
    <text x="390" y="850" text-anchor="middle" fill="#64748B" font-family="sans-serif" font-size="15">
      *Terms and conditions apply. WhatsApp 9172569021 for queries.
    </text>
  </g>
</svg>`;

// 2. META ADS AFTER
const metaAdsAfter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-m-a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080C16" />
      <stop offset="100%" stop-color="#030408" />
    </linearGradient>
    <linearGradient id="card-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(21, 88, 201, 0.15)" />
      <stop offset="100%" stop-color="rgba(11, 15, 24, 0.9)" />
    </linearGradient>
    <clipPath id="prod-clip">
      <rect x="60" y="140" width="780" height="540" rx="16"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="900" height="1100" fill="url(#bg-m-a)"/>

  <!-- Verified Header Bar -->
  <rect x="50" y="50" width="800" height="64" rx="8" fill="#0C192E" stroke="#1D4ED8" stroke-width="1.5"/>
  <circle cx="84" cy="82" r="10" fill="#3B82F6"/>
  <text x="110" y="88" fill="#93C5FD" font-family="system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="1">
    KLIDO CONVERSION ENGINE • ROAS 4.2x • AUDITED UNIT ECONOMICS
  </text>
  <rect x="710" y="66" width="124" height="32" rx="4" fill="#1558C9"/>
  <text x="772" y="88" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="0.5">
    VERIFIED
  </text>

  <!-- Hero Ad Creative Frame -->
  <g>
    <!-- Background of Image Area -->
    <rect x="60" y="140" width="780" height="890" rx="16" fill="#0B0F18" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
    
    <!-- Real high-res product photo with refined crop -->
    <g clip-path="url(#prod-clip)">
      <image href="data:image/jpeg;base64,${candleBase64}" x="60" y="140" width="780" height="540" preserveAspectRatio="xMidYMid slice"/>
      <!-- Dark gradient vignette at bottom of photo for text transition -->
      <rect x="60" y="520" width="780" height="160" fill="url(#bg-m-a)" opacity="0.95"/>
    </g>

    <!-- Top Floating Meta Ad Brand Pill -->
    <g transform="translate(90, 170)">
      <rect width="260" height="46" rx="23" fill="rgba(3, 4, 7, 0.75)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <circle cx="24" cy="23" r="10" fill="#1558C9"/>
      <text x="44" y="29" fill="#F4F6FA" font-family="system-ui, sans-serif" font-weight="600" font-size="15" letter-spacing="0.5">
        SAANJH BOTANICALS
      </text>
    </g>

    <!-- Floating ROAS Metric Badge -->
    <g transform="translate(620, 170)">
      <rect width="180" height="46" rx="23" fill="rgba(3, 4, 7, 0.85)" stroke="#D4FF24" stroke-width="1.5"/>
      <circle cx="22" cy="23" r="6" fill="#D4FF24"/>
      <text x="36" y="29" fill="#F4F6FA" font-family="system-ui, sans-serif" font-weight="700" font-size="15">
        Peak ROAS 4.2x
      </text>
    </g>

    <!-- Editorial Typography in Card Body -->
    <g transform="translate(90, 715)">
      <!-- Category Tag -->
      <text x="0" y="0" fill="#D4FF24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" letter-spacing="2">
        PURE SOY WAX • SUSTAINABLY POURED
      </text>

      <!-- Headline -->
      <text x="0" y="44" fill="#F4F6FA" font-family="'Fraunces', serif" font-size="44" font-weight="500" letter-spacing="-0.5">
        Scents designed for quiet evenings.
      </text>

      <!-- Subtext -->
      <text x="0" y="86" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="20" font-weight="400">
        Single-origin essential oils, wooden crackling wick, zero paraffin.
      </text>

      <!-- Rating & Delivery Proof -->
      <g transform="translate(0, 115)">
        <text x="0" y="18" fill="#FBBF24" font-size="18">★★★★★</text>
        <text x="85" y="18" fill="#F4F6FA" font-family="system-ui, sans-serif" font-weight="600" font-size="16">4.9 / 5.0</text>
        <text x="160" y="18" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="16">• 1,480+ Verified Orders • Pan-India 48h Dispatch</text>
      </g>
    </g>

    <!-- Minimal Conversion-Optimized CTA Bar -->
    <g transform="translate(90, 910)">
      <rect width="720" height="72" rx="4" fill="#1558C9"/>
      <text x="360" y="45" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="600" font-size="22" letter-spacing="0.5">
        Explore Collection — From ₹1,499 →
      </text>
    </g>
  </g>
</svg>`;

// 3. INFLUENCER BEFORE
const influencerBefore = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-i-b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1B1922" />
      <stop offset="100%" stop-color="#100E14" />
    </linearGradient>
  </defs>

  <rect width="900" height="1100" fill="url(#bg-i-b)"/>

  <!-- Warning Header -->
  <rect x="50" y="50" width="800" height="64" rx="8" fill="#2E1214" stroke="#7A2227" stroke-width="1.5"/>
  <circle cx="84" cy="82" r="10" fill="#EF4444"/>
  <text x="110" y="88" fill="#FCA5A5" font-family="system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="1">
    UNSTRUCTURED COLLABORATION • 0.4% ENGAGEMENT • 0 TRACKING
  </text>

  <!-- Cluttered Post Simulation -->
  <g transform="translate(60, 140)">
    <rect width="780" height="890" rx="16" fill="#181822" stroke="#4B1E22" stroke-width="2"/>

    <!-- Creator Header Strip -->
    <g transform="translate(30, 30)">
      <circle cx="36" cy="36" r="32" fill="#475569"/>
      <text x="86" y="32" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="22" font-weight="bold">random_influencer_42</text>
      <text x="86" y="56" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="16">Sponsored? (No ad tag)</text>
    </g>

    <!-- Awkwardly framed selfie/product preview -->
    <g transform="translate(30, 110)">
      <rect width="720" height="480" rx="12" fill="#0F172A"/>
      <image href="data:image/jpeg;base64,${lifestyleBase64}" x="0" y="0" width="720" height="480" preserveAspectRatio="xMidYMid slice" opacity="0.6"/>
      
      <!-- Amateur stickers slapped over image -->
      <rect x="80" y="160" width="560" height="80" rx="8" fill="rgba(220, 38, 38, 0.9)"/>
      <text x="360" y="210" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="900">
        GUYS USE CODE "PROMO5" FOR 5% OFF
      </text>

      <rect x="200" y="280" width="320" height="50" rx="25" fill="#EAB308"/>
      <text x="360" y="313" text-anchor="middle" fill="#000000" font-family="sans-serif" font-size="20" font-weight="bold">
        SWIPE UP IF IT WORKS 🤷‍♂️
      </text>
    </g>

    <!-- Disorganized comments & issues list -->
    <g transform="translate(40, 630)">
      <rect width="700" height="230" rx="10" fill="#201C28" stroke="#3730A3" stroke-width="1" stroke-opacity="0.3"/>
      <text x="30" y="45" fill="#EF4444" font-family="monospace" font-size="18" font-weight="bold">
        CRITICAL INFLUENCER LEAKAGE IDENTIFIED:
      </text>
      <text x="30" y="85" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="18">
        • No creative brief provided — creator posted off-brand content
      </text>
      <text x="30" y="125" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="18">
        • No trackable UTM links or dedicated landing page
      </text>
      <text x="30" y="165" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="18">
        • Overpaid upfront fees without performance or delivery SLA
      </text>
      <text x="30" y="205" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="18">
        • 0 Whitelisted advertising usage rights secured
      </text>
    </g>
  </g>
</svg>`;

// 4. INFLUENCER AFTER
const influencerAfter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-i-a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080C16" />
      <stop offset="100%" stop-color="#030408" />
    </linearGradient>
    <clipPath id="ugc-clip">
      <rect x="60" y="140" width="780" height="890" rx="16"/>
    </clipPath>
  </defs>

  <rect width="900" height="1100" fill="url(#bg-i-a)"/>

  <!-- Success Header Bar -->
  <rect x="50" y="50" width="800" height="64" rx="8" fill="#0C192E" stroke="#1D4ED8" stroke-width="1.5"/>
  <circle cx="84" cy="82" r="10" fill="#3B82F6"/>
  <text x="110" y="88" fill="#93C5FD" font-family="system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="1">
    KLIDO CREATOR ENGINE • 10 VETTED CREATORS/MO • 6.8% ENGAGEMENT
  </text>
  <rect x="710" y="66" width="124" height="32" rx="4" fill="#1558C9"/>
  <text x="772" y="88" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="700" font-size="14">
    ACTIVE
  </text>

  <!-- Creator UGC Frame -->
  <g clip-path="url(#ugc-clip)">
    <!-- Base lifestyle photo -->
    <image href="data:image/jpeg;base64,${artisanBase64}" x="60" y="140" width="780" height="890" preserveAspectRatio="xMidYMid slice"/>

    <!-- Dark gradient overlay for text readability -->
    <rect x="60" y="560" width="780" height="470" fill="url(#bg-i-a)" opacity="0.94"/>

    <!-- Creator Profile Tag Overlay (Top Left) -->
    <g transform="translate(90, 175)">
      <rect width="320" height="60" rx="30" fill="rgba(3, 4, 7, 0.85)" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
      <circle cx="32" cy="30" r="20" fill="#1558C9"/>
      <text x="65" y="30" fill="#F4F6FA" font-family="system-ui, sans-serif" font-weight="700" font-size="17">@artisan.living</text>
      <text x="65" y="48" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13">Verified Klido Creator Partner</text>
    </g>

    <!-- Whitelisted Rights Tag (Top Right) -->
    <g transform="translate(620, 175)">
      <rect width="190" height="46" rx="23" fill="rgba(3, 4, 7, 0.85)" stroke="#D4FF24" stroke-width="1.5"/>
      <text x="95" y="29" text-anchor="middle" fill="#D4FF24" font-family="system-ui, sans-serif" font-weight="700" font-size="14">
        ✓ Whitelisted Rights
      </text>
    </g>

    <!-- Narrative & Performance Specs at Bottom -->
    <g transform="translate(90, 680)">
      <text x="0" y="0" fill="#D4FF24" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="2">
        CREATOR SCRIPT PROTOCOL v2.4
      </text>

      <text x="0" y="44" fill="#F4F6FA" font-family="'Fraunces', serif" font-size="38" font-weight="500">
        Authentic resonance that converts.
      </text>

      <text x="0" y="86" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="18" font-weight="400">
        10 barter placements per month. Written briefs, direct delivery tracking, and zero agency markup.
      </text>

      <!-- 3 Metrics Grid -->
      <g transform="translate(0, 125)">
        <rect width="210" height="75" rx="6" fill="#0B0F18" stroke="rgba(255,255,255,0.1)"/>
        <text x="20" y="32" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13">CONVERSION RATE</text>
        <text x="20" y="60" fill="#F4F6FA" font-family="system-ui, sans-serif" font-weight="700" font-size="24">6.8%</text>

        <rect x="235" y="0" width="210" height="75" rx="6" fill="#0B0F18" stroke="rgba(255,255,255,0.1)"/>
        <text x="255" y="32" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13">BARTER PLACEMENTS</text>
        <text x="255" y="60" fill="#F4F6FA" font-family="system-ui, sans-serif" font-weight="700" font-size="24">10 / month</text>

        <rect x="470" y="0" width="230" height="75" rx="6" fill="#0B0F18" stroke="rgba(255,255,255,0.1)"/>
        <text x="490" y="32" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13">CREATOR MARKUP</text>
        <text x="490" y="60" fill="#D4FF24" font-family="system-ui, sans-serif" font-weight="700" font-size="24">0% Direct</text>
      </g>
    </g>

    <!-- Bottom Action Pill -->
    <g transform="translate(90, 935)">
      <rect width="700" height="64" rx="4" fill="#1558C9"/>
      <text x="350" y="40" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="600" font-size="20">
        Review Vetted Creator Roster →
      </text>
    </g>
  </g>
</svg>`;

// 5. SOCIAL MEDIA BEFORE
const socialBefore = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-s-b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A1820" />
      <stop offset="100%" stop-color="#121116" />
    </linearGradient>
  </defs>

  <rect width="900" height="1100" fill="url(#bg-s-b)"/>

  <!-- Warning Header -->
  <rect x="50" y="50" width="800" height="64" rx="8" fill="#2E1214" stroke="#7A2227" stroke-width="1.5"/>
  <circle cx="84" cy="82" r="10" fill="#EF4444"/>
  <text x="110" y="88" fill="#FCA5A5" font-family="system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="1">
    INCONSISTENT BRANDING • SPORADIC POSTING • ZERO COMMUNITY
  </text>

  <!-- Mismatched Grid Container -->
  <g transform="translate(60, 140)">
    <rect width="780" height="890" rx="16" fill="#1E1B24" stroke="#4B1E22" stroke-width="2"/>

    <!-- Uncurated Profile Info -->
    <g transform="translate(40, 30)">
      <circle cx="45" cy="45" r="40" fill="#64748B"/>
      <text x="110" y="40" fill="#F1F5F9" font-family="sans-serif" font-size="24" font-weight="bold">brand_shop_online</text>
      <text x="110" y="70" fill="#94A3B8" font-family="sans-serif" font-size="16">182 posts • 840 followers • 0 engagement</text>
      <text x="110" y="100" fill="#CBD5E1" font-family="sans-serif" font-size="15">DM for prices! No refunds. WhatsApp only: 9876543210</text>
    </g>

    <!-- Disorganized Highlights with no icons -->
    <g transform="translate(40, 155)">
      <circle cx="45" cy="40" r="34" fill="#334155" stroke="#64748B" stroke-width="2"/>
      <text x="45" y="95" text-anchor="middle" fill="#94A3B8" font-size="13">highlight</text>

      <circle cx="145" cy="40" r="34" fill="#334155" stroke="#64748B" stroke-width="2"/>
      <text x="145" y="95" text-anchor="middle" fill="#94A3B8" font-size="13">new post</text>

      <circle cx="245" cy="40" r="34" fill="#334155" stroke="#64748B" stroke-width="2"/>
      <text x="245" y="95" text-anchor="middle" fill="#94A3B8" font-size="13">offers</text>
    </g>

    <!-- 6 Mismatched, jarring grid tiles -->
    <g transform="translate(40, 280)">
      <!-- Tile 1: Random meme -->
      <rect x="0" y="0" width="220" height="220" fill="#FEF08A"/>
      <text x="110" y="110" text-anchor="middle" fill="#000" font-family="'Comic Sans MS', cursive" font-size="20">RELATABLE MEME</text>

      <!-- Tile 2: Blurry text flyer -->
      <rect x="240" y="0" width="220" height="220" fill="#DC2626"/>
      <text x="350" y="90" text-anchor="middle" fill="#FFF" font-family="'Arial Black'" font-size="24">50% OFF</text>
      <text x="350" y="130" text-anchor="middle" fill="#FEF08A" font-size="14">TODAY ONLY!!</text>

      <!-- Tile 3: Dark unedited crop -->
      <rect x="480" y="0" width="220" height="220" fill="#0F172A"/>
      <image href="data:image/jpeg;base64,${ceramicBase64}" x="480" y="0" width="220" height="220" preserveAspectRatio="none" opacity="0.5"/>
      <text x="590" y="200" text-anchor="middle" fill="#FFF" font-size="12">Dark photo</text>

      <!-- Tile 4: WhatsApp screenshot -->
      <rect x="0" y="240" width="220" height="220" fill="#14532D"/>
      <text x="110" y="350" text-anchor="middle" fill="#BBF7D0" font-family="monospace" font-size="14">Customer Chat SS</text>

      <!-- Tile 5: Harsh colored graphic -->
      <rect x="240" y="240" width="220" height="220" fill="#7C3AED"/>
      <text x="350" y="350" text-anchor="middle" fill="#FFF" font-family="sans-serif" font-weight="bold" font-size="18">QUOTE OF DAY</text>

      <!-- Tile 6: Misaligned product -->
      <rect x="480" y="240" width="220" height="220" fill="#475569"/>
      <text x="590" y="350" text-anchor="middle" fill="#CBD5E1" font-size="14">Unedited post</text>
    </g>

    <!-- Bottom Diagnosis -->
    <rect x="40" y="770" width="700" height="85" rx="8" fill="#2E1214" stroke="#7A2227" stroke-width="1"/>
    <text x="70" y="810" fill="#FCA5A5" font-family="sans-serif" font-weight="bold" font-size="17">
      DIAGNOSIS: Lack of visual system reduces visitor conversion by 68%.
    </text>
    <text x="70" y="836" fill="#94A3B8" font-family="sans-serif" font-size="14">
      Feed looks untrustworthy to first-time shoppers arriving from paid ads.
    </text>
  </g>
</svg>`;

// 6. SOCIAL MEDIA AFTER
const socialAfter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-s-a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080C16" />
      <stop offset="100%" stop-color="#030408" />
    </linearGradient>
  </defs>

  <rect width="900" height="1100" fill="url(#bg-s-a)"/>

  <!-- Success Header Bar -->
  <rect x="50" y="50" width="800" height="64" rx="8" fill="#0C192E" stroke="#1D4ED8" stroke-width="1.5"/>
  <circle cx="84" cy="82" r="10" fill="#3B82F6"/>
  <text x="110" y="88" fill="#93C5FD" font-family="system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="1">
    KLIDO SOCIAL ARCHITECTURE • 15 FEED ASSETS/MO • DAILY STORIES
  </text>
  <rect x="710" y="66" width="124" height="32" rx="4" fill="#1558C9"/>
  <text x="772" y="88" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="700" font-size="14">
    SYSTEM
  </text>

  <!-- Curated Grid Container -->
  <g transform="translate(60, 140)">
    <rect width="780" height="890" rx="16" fill="#0B0F18" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>

    <!-- Curated Brand Profile Info -->
    <g transform="translate(40, 30)">
      <circle cx="45" cy="45" r="40" fill="#1558C9"/>
      <text x="45" y="55" text-anchor="middle" fill="#FFF" font-family="'Fraunces', serif" font-size="28" font-weight="bold">K</text>
      
      <text x="110" y="40" fill="#F4F6FA" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">
        saanjh.botanicals <tspan fill="#3B82F6" font-size="18">✓</tspan>
      </text>
      <text x="110" y="70" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="16">
        Curated Botanical Goods • 14.8k Community • Bengaluru
      </text>
      <text x="110" y="98" fill="#F4F6FA" font-family="system-ui, sans-serif" font-size="15">
        Hand-poured intentional scents. Dispatching worldwide daily.
      </text>
    </g>

    <!-- Branded Story Highlights -->
    <g transform="translate(40, 160)">
      <!-- Highlight 1 -->
      <circle cx="45" cy="40" r="34" fill="#0B0F18" stroke="#1558C9" stroke-width="2"/>
      <text x="45" y="46" text-anchor="middle" fill="#D4FF24" font-size="18">✦</text>
      <text x="45" y="96" text-anchor="middle" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13">Origins</text>

      <!-- Highlight 2 -->
      <circle cx="160" cy="40" r="34" fill="#0B0F18" stroke="#1558C9" stroke-width="2"/>
      <text x="160" y="46" text-anchor="middle" fill="#D4FF24" font-size="18">⬡</text>
      <text x="160" y="96" text-anchor="middle" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13">Process</text>

      <!-- Highlight 3 -->
      <circle cx="275" cy="40" r="34" fill="#0B0F18" stroke="#1558C9" stroke-width="2"/>
      <text x="275" y="46" text-anchor="middle" fill="#D4FF24" font-size="18">★</text>
      <text x="275" y="96" text-anchor="middle" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13">Reviews</text>

      <!-- Highlight 4 -->
      <circle cx="390" cy="40" r="34" fill="#0B0F18" stroke="#1558C9" stroke-width="2"/>
      <text x="390" y="46" text-anchor="middle" fill="#D4FF24" font-size="18">◈</text>
      <text x="390" y="96" text-anchor="middle" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13">Journal</text>
    </g>

    <!-- Harmonious 6-Tile Brand Grid -->
    <g transform="translate(40, 280)">
      <!-- Tile 1 -->
      <rect x="0" y="0" width="220" height="220" rx="8" fill="#151924"/>
      <image href="data:image/jpeg;base64,${candleBase64}" x="0" y="0" width="220" height="220" preserveAspectRatio="xMidYMid slice"/>

      <!-- Tile 2 -->
      <rect x="240" y="0" width="220" height="220" rx="8" fill="#070A10" stroke="rgba(255,255,255,0.08)"/>
      <text x="350" y="100" text-anchor="middle" fill="#D4FF24" font-family="'JetBrains Mono', monospace" font-size="13">"Form follows</text>
      <text x="350" y="125" text-anchor="middle" fill="#F4F6FA" font-family="'Fraunces', serif" font-size="20">intent."</text>

      <!-- Tile 3 -->
      <rect x="480" y="0" width="220" height="220" rx="8" fill="#151924"/>
      <image href="data:image/jpeg;base64,${ceramicBase64}" x="480" y="0" width="220" height="220" preserveAspectRatio="xMidYMid slice"/>

      <!-- Tile 4 -->
      <rect x="0" y="240" width="220" height="220" rx="8" fill="#151924"/>
      <image href="data:image/jpeg;base64,${lifestyleBase64}" x="0" y="240" width="220" height="220" preserveAspectRatio="xMidYMid slice"/>

      <!-- Tile 5 -->
      <rect x="240" y="240" width="220" height="220" rx="8" fill="#151924"/>
      <image href="data:image/jpeg;base64,${leatherBase64}" x="240" y="240" width="220" height="220" preserveAspectRatio="xMidYMid slice"/>

      <!-- Tile 6 -->
      <rect x="480" y="240" width="220" height="220" rx="8" fill="#151924"/>
      <image href="data:image/jpeg;base64,${artisanBase64}" x="480" y="240" width="220" height="220" preserveAspectRatio="xMidYMid slice"/>
    </g>

    <!-- Bottom Result Strip -->
    <rect x="40" y="770" width="700" height="85" rx="8" fill="#0E1726" stroke="#1D4ED8" stroke-width="1"/>
    <text x="70" y="810" fill="#93C5FD" font-family="system-ui, sans-serif" font-weight="bold" font-size="17">
      RESULT: +310% Brand Trust Index • 15 Content Assets/Month
    </text>
    <text x="70" y="836" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="14">
      Curated multi-format editorial feed turn ad clicks into repeat loyal customers.
    </text>
  </g>
</svg>`;

// 7. BUSINESS OPERATIONS BEFORE
const operationsBefore = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-o-b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A1820" />
      <stop offset="100%" stop-color="#121116" />
    </linearGradient>
  </defs>

  <rect width="900" height="1100" fill="url(#bg-o-b)"/>

  <!-- Warning Header -->
  <rect x="50" y="50" width="800" height="64" rx="8" fill="#2E1214" stroke="#7A2227" stroke-width="1.5"/>
  <circle cx="84" cy="82" r="10" fill="#EF4444"/>
  <text x="110" y="88" fill="#FCA5A5" font-family="system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="1">
    CHAOTIC MANUAL SPREADSHEETS • 38% RTO RATE • STOCKOUT LEAKAGE
  </text>

  <!-- Spreadsheet Nightmare -->
  <g transform="translate(60, 140)">
    <rect width="780" height="890" rx="16" fill="#F1F5F9" stroke="#DC2626" stroke-width="2"/>

    <!-- Spreadsheet Menu Bar -->
    <rect width="780" height="48" rx="16" fill="#E2E8F0"/>
    <text x="25" y="30" fill="#475569" font-family="sans-serif" font-size="15" font-weight="bold">
      Untitled_master_inventory_FINAL_v3_copy(2).xlsx - Excel (Not Responding)
    </text>

    <!-- Grid Header -->
    <g transform="translate(20, 70)" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1E293B">
      <rect width="740" height="36" fill="#CBD5E1"/>
      <text x="15" y="24">SKU CODE</text>
      <text x="140" y="24">STOCK</text>
      <text x="230" y="24">UNIT COGS</text>
      <text x="360" y="24">RTO %</text>
      <text x="460" y="24">COURIER SLA</text>
      <text x="610" y="24">NET STATUS</text>
    </g>

    <!-- Spreadsheet Rows with Errors -->
    <g transform="translate(20, 106)" font-family="monospace" font-size="14">
      <!-- Row 1 -->
      <rect width="740" height="42" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="15" y="27" fill="#0F172A">SKU-CNDL-01</text>
      <text x="140" y="27" fill="#DC2626" font-weight="bold">-14</text>
      <text x="230" y="27" fill="#0F172A">₹340</text>
      <text x="360" y="27" fill="#DC2626">34.2%</text>
      <text x="460" y="27" fill="#DC2626">5.2 Days (Slow)</text>
      <rect x="590" y="8" width="130" height="26" fill="#FEE2E2" rx="4"/>
      <text x="600" y="26" fill="#991B1B">STOCKOUT</text>

      <!-- Row 2 (Error) -->
      <g transform="translate(0, 42)">
        <rect width="740" height="42" fill="#FEF2F2" stroke="#E2E8F0"/>
        <text x="15" y="27" fill="#0F172A">SKU-POTR-88</text>
        <text x="140" y="27" fill="#991B1B">#REF!</text>
        <text x="230" y="27" fill="#991B1B">#VALUE!</text>
        <text x="360" y="27" fill="#DC2626">42.8%</text>
        <text x="460" y="27" fill="#DC2626">Delayed 6d</text>
        <rect x="590" y="8" width="130" height="26" fill="#FEE2E2" rx="4"/>
        <text x="600" y="26" fill="#991B1B">MARGIN BLEED</text>
      </g>

      <!-- Row 3 -->
      <g transform="translate(0, 84)">
        <rect width="740" height="42" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="15" y="27" fill="#0F172A">SKU-LTHR-04</text>
        <text x="140" y="27" fill="#0F172A">2</text>
        <text x="230" y="27" fill="#0F172A">₹890</text>
        <text x="360" y="27" fill="#DC2626">29.0%</text>
        <text x="460" y="27" fill="#D97706">Lost package</text>
        <rect x="590" y="8" width="130" height="26" fill="#FEF3C7" rx="4"/>
        <text x="600" y="26" fill="#92400E">DISPATCH DELAY</text>
      </g>

      <!-- Row 4 -->
      <g transform="translate(0, 126)">
        <rect width="740" height="42" fill="#FEF2F2" stroke="#E2E8F0"/>
        <text x="15" y="27" fill="#0F172A">SKU-DIFF-19</text>
        <text x="140" y="27" fill="#DC2626">0</text>
        <text x="230" y="27" fill="#991B1B">#REF!</text>
        <text x="360" y="27" fill="#DC2626">38.4%</text>
        <text x="460" y="27" fill="#DC2626">RTO Return</text>
        <rect x="590" y="8" width="130" height="26" fill="#FEE2E2" rx="4"/>
        <text x="600" y="26" fill="#991B1B">AD SPENDING!!</text>
      </g>
    </g>

    <!-- Stressed Post-It Sticky Notes -->
    <g transform="translate(40, 310)">
      <!-- Sticky 1 -->
      <g transform="rotate(-3)">
        <rect width="280" height="180" rx="4" fill="#FEF08A" stroke="#FDE047" stroke-width="2" filter="url(#shadow-m-b)"/>
        <text x="20" y="35" fill="#854D0E" font-family="'Comic Sans MS', cursive" font-size="18" font-weight="bold">URGENT!!</text>
        <text x="20" y="70" fill="#713F12" font-family="sans-serif" font-size="15">
          Meta ad still active on SKU-CNDL-01 but inventory is NEGATIVE! We oversold 18 units!
        </text>
        <text x="20" y="150" fill="#DC2626" font-family="sans-serif" font-weight="bold" font-size="14">Stop ad budget now!</text>
      </g>

      <!-- Sticky 2 -->
      <g transform="translate(360, 20) rotate(4)">
        <rect width="320" height="180" rx="4" fill="#FECDD3" stroke="#FDA4AF" stroke-width="2" filter="url(#shadow-m-b)"/>
        <text x="20" y="35" fill="#9F1239" font-family="'Comic Sans MS', cursive" font-size="18" font-weight="bold">COURIER DISPUTE</text>
        <text x="20" y="70" fill="#881337" font-family="sans-serif" font-size="15">
          26 shipments marked RTO without NDR call attempt. 48 customers demanding refunds.
        </text>
        <text x="20" y="150" fill="#9F1239" font-family="sans-serif" font-weight="bold" font-size="14">Lost ₹34,000 this week.</text>
      </g>
    </g>

    <!-- Bottom Error Alert -->
    <rect x="40" y="660" width="700" height="180" rx="8" fill="#1E293B"/>
    <text x="70" y="705" fill="#EF4444" font-family="sans-serif" font-size="20" font-weight="bold">
      ⚠️ UNMANAGED OPERATIONS SYMPTOMS:
    </text>
    <text x="70" y="745" fill="#CBD5E1" font-family="sans-serif" font-size="16">
      • Ad spend continues to run on exhausted SKU inventory
    </text>
    <text x="70" y="775" fill="#CBD5E1" font-family="sans-serif" font-size="16">
      • Landed break-even ROAS unknown due to uncalculated return logistics
    </text>
    <text x="70" y="805" fill="#CBD5E1" font-family="sans-serif" font-size="16">
      • Founder spends 6 hours daily handling packing, tracking, and courier fights
    </text>
  </g>
</svg>`;

// 8. BUSINESS OPERATIONS AFTER
const operationsAfter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-o-a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080C16" />
      <stop offset="100%" stop-color="#030408" />
    </linearGradient>
  </defs>

  <rect width="900" height="1100" fill="url(#bg-o-a)"/>

  <!-- Success Header Bar -->
  <rect x="50" y="50" width="800" height="64" rx="8" fill="#0C192E" stroke="#1D4ED8" stroke-width="1.5"/>
  <circle cx="84" cy="82" r="10" fill="#3B82F6"/>
  <text x="110" y="88" fill="#93C5FD" font-family="system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="1">
    KLIDO BACK-OFFICE FRAMEWORK • 99.4% SLA • LANDED MARGIN PROTECTED
  </text>
  <rect x="710" y="66" width="124" height="32" rx="4" fill="#1558C9"/>
  <text x="772" y="88" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="700" font-size="14">
    AUTOMATED
  </text>

  <!-- Centralized Dashboard Container -->
  <g transform="translate(60, 140)">
    <rect width="780" height="890" rx="16" fill="#0B0F18" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>

    <!-- Operational KPI Matrix (4 Cards) -->
    <g transform="translate(40, 30)">
      <!-- Card 1 -->
      <rect width="330" height="110" rx="8" fill="#101726" stroke="rgba(255,255,255,0.08)"/>
      <text x="24" y="34" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13" font-weight="600">CONTRIBUTION MARGIN</text>
      <text x="24" y="74" fill="#F4F6FA" font-family="system-ui, sans-serif" font-size="34" font-weight="bold">41.8%</text>
      <text x="24" y="96" fill="#D4FF24" font-family="monospace" font-size="13">+14.2% audited lift</text>

      <!-- Card 2 -->
      <rect x="360" width="330" height="110" rx="8" fill="#101726" stroke="rgba(255,255,255,0.08)"/>
      <text x="384" y="34" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13" font-weight="600">DISPATCH SLA SPEED</text>
      <text x="384" y="74" fill="#F4F6FA" font-family="system-ui, sans-serif" font-size="34" font-weight="bold">&lt; 24h</text>
      <text x="384" y="96" fill="#3B82F6" font-family="monospace" font-size="13">99.4% on-time rate</text>

      <!-- Card 3 -->
      <rect y="130" width="330" height="110" rx="8" fill="#101726" stroke="rgba(255,255,255,0.08)"/>
      <text x="24" y="164" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13" font-weight="600">RTO RETURN DEFENSE</text>
      <text x="24" y="204" fill="#F4F6FA" font-family="system-ui, sans-serif" font-size="34" font-weight="bold">8.2%</text>
      <text x="24" y="226" fill="#D4FF24" font-family="monospace" font-size="13">-64% automated NDR filter</text>

      <!-- Card 4 -->
      <rect x="360" y="130" width="330" height="110" rx="8" fill="#101726" stroke="rgba(255,255,255,0.08)"/>
      <text x="384" y="164" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="13" font-weight="600">AD &amp; CATALOG SYNC</text>
      <text x="384" y="204" fill="#3B82F6" font-family="system-ui, sans-serif" font-size="34" font-weight="bold">Active</text>
      <text x="384" y="226" fill="#9AA3B2" font-family="monospace" font-size="13">Auto-pauses on 5 units</text>
    </g>

    <!-- Structured SKU Protocol Matrix Table -->
    <g transform="translate(40, 300)">
      <rect width="700" height="42" rx="4" fill="#151E30"/>
      <text x="20" y="26" fill="#9AA3B2" font-family="sans-serif" font-size="13" font-weight="bold">SKU</text>
      <text x="170" y="26" fill="#9AA3B2" font-family="sans-serif" font-size="13" font-weight="bold">INVENTORY</text>
      <text x="320" y="26" fill="#9AA3B2" font-family="sans-serif" font-size="13" font-weight="bold">LANDED COGS</text>
      <text x="470" y="26" fill="#9AA3B2" font-family="sans-serif" font-size="13" font-weight="bold">BREAK-EVEN</text>
      <text x="610" y="26" fill="#9AA3B2" font-family="sans-serif" font-size="13" font-weight="bold">ACTION</text>

      <!-- Row 1 -->
      <g transform="translate(0, 48)">
        <rect width="700" height="48" rx="4" fill="#0E1420" stroke="rgba(255,255,255,0.05)"/>
        <text x="20" y="30" fill="#F4F6FA" font-family="monospace" font-size="14">SKU-CNDL-01</text>
        <text x="170" y="30" fill="#D4FF24" font-family="monospace" font-size="14">320 Units (OK)</text>
        <text x="320" y="30" fill="#F4F6FA" font-family="monospace" font-size="14">₹324.50</text>
        <text x="470" y="30" fill="#3B82F6" font-family="monospace" font-size="14">ROAS 1.8x</text>
        <text x="610" y="30" fill="#D4FF24" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ Scaling</text>
      </g>

      <!-- Row 2 -->
      <g transform="translate(0, 102)">
        <rect width="700" height="48" rx="4" fill="#0E1420" stroke="rgba(255,255,255,0.05)"/>
        <text x="20" y="30" fill="#F4F6FA" font-family="monospace" font-size="14">SKU-POTR-88</text>
        <text x="170" y="30" fill="#3B82F6" font-family="monospace" font-size="14">84 Units (Sync)</text>
        <text x="320" y="30" fill="#F4F6FA" font-family="monospace" font-size="14">₹612.00</text>
        <text x="470" y="30" fill="#3B82F6" font-family="monospace" font-size="14">ROAS 2.1x</text>
        <text x="610" y="30" fill="#3B82F6" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ Monitored</text>
      </g>

      <!-- Row 3 -->
      <g transform="translate(0, 156)">
        <rect width="700" height="48" rx="4" fill="#0E1420" stroke="rgba(255,255,255,0.05)"/>
        <text x="20" y="30" fill="#F4F6FA" font-family="monospace" font-size="14">SKU-LTHR-04</text>
        <text x="170" y="30" fill="#D4FF24" font-family="monospace" font-size="14">140 Units (OK)</text>
        <text x="320" y="30" fill="#F4F6FA" font-family="monospace" font-size="14">₹840.00</text>
        <text x="470" y="30" fill="#3B82F6" font-family="monospace" font-size="14">ROAS 1.6x</text>
        <text x="610" y="30" fill="#D4FF24" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ Scaling</text>
      </g>
    </g>

    <!-- Operational Handover Protocol -->
    <g transform="translate(40, 550)">
      <rect width="700" height="150" rx="8" fill="#0F1728" stroke="#1D4ED8" stroke-width="1.2"/>
      <text x="30" y="38" fill="#F4F6FA" font-family="system-ui, sans-serif" font-weight="bold" font-size="18">
        KLIDO OPERATIONAL SOP DEPLOYMENT:
      </text>
      <text x="30" y="70" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="15">
        ✓ 4-Point quality assurance packing protocols eliminate transit breakage
      </text>
      <text x="30" y="98" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="15">
        ✓ Dynamic P&amp;L model accounts for payment gateway fees, return rates &amp; packaging
      </text>
      <text x="30" y="126" fill="#9AA3B2" font-family="system-ui, sans-serif" font-size="15">
        ✓ Weekly inventory turnover review &amp; automated supplier reorder triggers
      </text>
    </g>

    <!-- Action Bar -->
    <g transform="translate(40, 730)">
      <rect width="700" height="70" rx="4" fill="#1558C9"/>
      <text x="350" y="44" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="600" font-size="20">
        Review Full Operations Playbook →
      </text>
    </g>
  </g>
</svg>`;

// Write all 8 files
fs.writeFileSync(path.join(outDir, 'meta-ads-before.svg'), metaAdsBefore);
fs.writeFileSync(path.join(outDir, 'meta-ads-after.svg'), metaAdsAfter);
fs.writeFileSync(path.join(outDir, 'influencer-before.svg'), influencerBefore);
fs.writeFileSync(path.join(outDir, 'influencer-after.svg'), influencerAfter);
fs.writeFileSync(path.join(outDir, 'social-media-before.svg'), socialBefore);
fs.writeFileSync(path.join(outDir, 'social-media-after.svg'), socialAfter);
fs.writeFileSync(path.join(outDir, 'operations-before.svg'), operationsBefore);
fs.writeFileSync(path.join(outDir, 'operations-after.svg'), operationsAfter);

console.log('Successfully generated all 8 Before/After SVG assets in', outDir);

