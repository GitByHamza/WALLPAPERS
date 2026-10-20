"use client";
import Link from "next/link";
import { RotateCw } from "lucide-react";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="site-width py-20">
      <div className="empty-state" role="alert">
        <h1>Let’s try that again.</h1>
        <p>Something interrupted this page. Try loading it again, or return to discovery.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button type="button" className="primary-button" onClick={reset}>
            <RotateCw size={15} />
            Try again
          </button>
          <Link className="secondary-button" href="/">
            Back to discovery
          </Link>
        </div>
      </div>
    </main>
  );
}
