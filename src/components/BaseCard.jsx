export default function BaseCard({ children }) {
  return (
    <div style={{ padding: 16, borderRadius: 8, border: "1px solid #ddd" }}>
      {children}
    </div>
  );
}
