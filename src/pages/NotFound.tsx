import { Link } from "react-router-dom";
import { useSeo } from "../hooks/usePageTitle";

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "The page you were looking for may have moved. Head back to the Brinovax home page.",
  });
  return (
    <section className="container section narrow center">
      <p className="eyebrow">404</p>
      <h1>We couldn&apos;t find that page.</h1>
      <p className="lede">The page you were looking for may have moved.</p>
      <Link className="btn btn-primary" to="/">
        Back to home
      </Link>
    </section>
  );
}
