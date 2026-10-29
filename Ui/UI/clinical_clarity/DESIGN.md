---
name: Clinical Clarity
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#434656'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004dea'
  primary: '#0041c8'
  on-primary: '#ffffff'
  primary-container: '#0055ff'
  on-primary-container: '#e3e6ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#8cf3f3'
  on-secondary-container: '#007070'
  tertiary: '#495157'
  on-tertiary: '#ffffff'
  tertiary-container: '#616970'
  on-tertiary-container: '#e2e9f0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b3'
  secondary-fixed: '#8cf3f3'
  secondary-fixed-dim: '#6fd7d6'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f4f'
  tertiary-fixed: '#dce3eb'
  tertiary-fixed-dim: '#c0c7cf'
  on-tertiary-fixed: '#151c22'
  on-tertiary-fixed-variant: '#40484e'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 88px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 60px
  headline-md:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  body-lg:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 40px
  body-md:
    fontFamily: Sora
    fontSize: 22px
    fontWeight: '400'
    lineHeight: 32px
  label-lg:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  button-text:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  touch-target-min: 80px
  margin-edge: 64px
  gutter: 32px
  stack-gap: 24px
  section-gap: 80px
---

## Brand & Style
The design system is engineered for high-throughput medical environments, prioritizing immediate comprehension and physical ease of use for a diverse patient demographic in India. The personality is clinical, authoritative, and calming, reducing the anxiety often associated with hospital visits.

The visual style follows a **Modern Corporate** approach with **High-Contrast** functional elements. It utilizes large whitespace to prevent cognitive overload and focuses on a "one-task-per-screen" philosophy. The interface relies on literal, universal metaphors to ensure accessibility across varying literacy levels, avoiding complex abstractions or deep navigation hierarchies.

## Colors
The palette is rooted in a "Safe Clinical" spectrum. 
- **Primary:** A high-vibrancy Blue (#0055FF) used exclusively for the main "Proceed" or "Next" actions to create a singular focal point.
- **Secondary:** A professional Teal (#008B8B) for supportive interactive elements and health-related iconography.
- **Backgrounds:** Use the Tertiary Soft Blue (#F0F7FF) for the main canvas to reduce screen glare in bright hospital lobbies.
- **Emergency:** Red (#D32F2F) is strictly reserved for "Stop," "Cancel," or "Emergency Assistance" triggers.
- **Voice State:** A distinct Violet (#7C4DFF) is used for AI listening states to differentiate "System Thinking" from "System Doing."

## Typography
Sora is selected for its geometric clarity and exceptional legibility at large scales, which is critical for a 32" touchscreen. 
- **Scale:** All text sizes are oversized to accommodate standing viewing distances (approx. 1 meter). 
- **Contrast:** Maintain a minimum contrast ratio of 7:1 for all instructional text.
- **Hierarchy:** Use `display-lg` for single-word confirmations or large numbers. `headline-lg` is the standard for screen titles. `body-lg` is the minimum size for any critical clinical instruction.

## Layout & Spacing
The layout uses a **Fixed Grid** optimized for a 16:9 landscape 32" display.
- **Canvas:** Content is centered in a massive central container with 64px outer safe-area margins to prevent neck strain.
- **Interaction Model:** No scrolling is permitted. If content exceeds the view, it must be broken into a multi-step wizard.
- **Touch Targets:** Every interactive element must have a minimum hit area of 80x80px to accommodate older patients or those with motor impairments.
- **Progress:** A persistent high-visibility progress bar sits at the top of every screen (12px height).

## Elevation & Depth
This design system utilizes **Tonal Layers** rather than heavy shadows to maintain a clean, sterile feel.
- **Base Layer:** Tertiary light blue background.
- **Component Layer:** Pure white surfaces for input cards and selection blocks.
- **Stroke Depth:** Use 2px "Low-contrast outlines" in a darker shade of the background color (#D1E4F5) to define card boundaries without creating visual clutter.
- **Active State:** When a card is selected, it gains a 4px primary blue border and a soft, diffused ambient shadow to indicate focus.

## Shapes
Shapes are defined as **Rounded** (0.5rem base) to feel friendly and safe. 
- **Buttons:** Large action buttons use `rounded-xl` (1.5rem) to distinguish them from informational cards.
- **Selection Cards:** Use `rounded-lg` (1rem) for high-tappable surface areas.
- **Voice Indicator:** A perfect circle is used for the voice state indicator to symbolize the "human" element of the AI assistant.

## Components
- **Primary Action Button:** Full-width or large-format (min-height 100px), Primary Blue background, white bold text. Positioned consistently in the bottom-right "Next" zone.
- **Selection Cards:** Large tiles (e.g., "Male", "Female", "Headache") with a combination of a literal icon (24pt stroke) and `headline-md` text.
- **Voice State Indicator:** A central or bottom-fixed pulsating orb. 
    - *Idle:* Static Teal. 
    - *Listening:* Expanding/contracting Violet. 
    - *Processing:* Rotating Violet gradient.
- **Privacy Toast:** A high-visibility, yellow-tinted persistent bar at the bottom of the screen stating: "Your data is private. This session will clear automatically."
- **Input Fields:** Oversized text inputs that trigger a large-format on-screen numeric keypad or keyboard that occupies the bottom 40% of the screen.
- **Emergency SOS:** A fixed Red button in the top-right corner, clearly separated from the flow.