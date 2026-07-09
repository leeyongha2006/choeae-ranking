Button renders the brand's 7 button variants (primary, secondary, danger, default text-button, chip) with hover-lift and press-scale built in.

```jsx
<Button variant="primary">시작하기</Button>
<Button variant="secondary" size="sm">보기</Button>
<Button variant="chip" active>이번 달</Button>
```

Variants: `primary` (violet, pink pop-shadow, main CTA), `secondary` (white + inset border), `danger` (soft red, destructive actions like "분석 데이터 삭제"), `default` (plain text nav/link button — pass `active` for the selected nav-item look), `chip` (pill filter tag — pass `active` for the selected gradient-filled look). Sizes: `sm` | `md` (default) | `lg`.
