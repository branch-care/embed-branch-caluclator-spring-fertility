# Branch Care IVF Calculator — Embed Demo

This repository contains a minimal demo showing how to embed the [Branch Care calculator](https://calculator.branchcare.com) into a clinic website using an `<iframe>`.

## Files

- `index.html` — Sample clinic landing page with the calculator embedded
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

### 2. Auto-resize via postMessage

The calculator sends a `branchcare:resize` message whenever its content height changes. Add this script to automatically resize the iframe to fit:

```html
<script>
  const iframeEl = document.getElementById('branch-fertility-calculator');
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'branchcare:resize') {
      iframeEl.style.height = e.data.height + 'px';
    }
  });
</script>
```

A fallback height can be set via CSS in case the message has not yet fired:

```css
#branch-fertility-calculator {
  height: 700px; /* fallback; resized dynamically via postMessage */
}
```

## Notes

- The calculator is served from `calculator.branchcare.com` and requires no additional configuration on your end.
- The surrounding page design (colors, fonts, layout) is entirely your clinic's own — the iframe is the only required element.
- If the calculator does not appear, confirm with Branch Care that your domain is allowlisted for embedding.
