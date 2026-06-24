# Branch Care IVF Calculator — Embed Demo

This repo contains a minimal demo showing how to embed the [Branch Care calculator](https://calculator.branchcare.com) into a clinic website using an `<iframe>`.

## Files

- `index.html` — Sample clinic landing page with the embedded calculator
- `scripts.js` — script for communicating with the embedded calculator
- `styles.css` — Page styles (not required for the embed itself)

## How to Embed

### 1. Add the iframe

Add the following snippet anywhere in your HTML where you want the calculator to appear:

```html
<iframe
  id="branch-fertility-calculator"
  src="https://calculator.branchcare.com/spring-fertility/ivf"
  title="Fertility Calculator"
  style="display: block; width: 100%; border: none; overflow: hidden;">
</iframe>
```

A fallback height can be set via CSS in case the iframe hasn't resized yet:

```css
#branch-fertility-calculator {
  height: 700px;
}
```

### 2. Include the script

Copy `scripts.js` into your project and include it on the page:

```html
<script src="scripts.js"></script>
```

The script handles the following `postMessage` events sent by the calculator:

| Message type | Description |
|---|---|
| `branchcare:resize` | Resizes the iframe height to fit its content |
| `branchcare:scroll-to-top` | Scrolls to the top of the iframe |
| `branchcare:scroll-to-offset` | Scrolls to a position within the iframe |

It also sends scroll position updates back to the calculator on every page scroll.

### WordPress

Paste the iframe and script together into a Custom HTML block. If your editor strips `<script>` tags, use a plugin such as [Insert Headers and Footers](https://wordpress.com/plugins/insert-headers-and-footers) to add the script or enqueue it via your theme's `functions.php`.

## Notes

- The calculator is served from `calculator.branchcare.com` and requires no additional configuration on your end.
- The surrounding page design (colors, fonts, layout) is entirely your clinic's own — the iframe is the only required element.
- If the calculator does not appear, confirm with Branch Care that your domain is allowlisted for embedding.
