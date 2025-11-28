"use client";

import { Suspense } from "react";
import RolesContent from "./roles-content";

export default function MyRolesPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <RolesContent />
    </Suspense>
  );
}
