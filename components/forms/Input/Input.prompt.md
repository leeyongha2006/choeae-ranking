Input covers all 11 wireframe input types behind one `type` prop — text, area, select, search, password, check(-on), radio(-on), toggle(-on).

```jsx
<Input type="text" label="닉네임" placeholder="이름을 입력하세요" />
<Input type="select" label="랭킹 기준" placeholder="랭킹 기준" />
<Input type="toggle-on" label="SNS 자동 공유" />
```

`-on` suffix variants render the checked/active visual directly (useful for static specimen display); pass `checked` for controlled use in real screens.
