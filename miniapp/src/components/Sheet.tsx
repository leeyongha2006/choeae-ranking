import type { ReactNode } from "react";

// 사용자가 버튼을 눌렀을 때만 여는 하단 시트 (진입 시 자동 노출 금지 — 검수 항목)
export default function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
      }}
    >
      <div
        className="fade-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 480, background: "var(--bg)",
          borderRadius: "24px 24px 0 0",
          padding: "28px 20px calc(20px + env(safe-area-inset-bottom))",
          display: "flex", flexDirection: "column", gap: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
}
