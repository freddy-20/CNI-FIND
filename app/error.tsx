"use client";

export default function Error({
  error,
}: {
  error: Error;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-3xl font-bold">
          Une erreur est survenue
        </h1>

        <p className="text-gray-500 mt-3">
          {error.message}
        </p>

      </div>

    </div>
  );
}
