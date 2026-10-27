import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Page not found</h1>
      <p style={{ marginBottom: 16 }}>
        The link you followed doesn’t exist.
      </p>
      <Link to="/">Go home</Link>
    </div>
  );
}

