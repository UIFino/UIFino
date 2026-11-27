import { LoadingGridSkeleton } from "@/components/patterns/state-views";

export default function SiteLoading() {
  return (
    <div className="band-full">
      <div className="shell-wrap">
        <LoadingGridSkeleton count={8} />
      </div>
    </div>
  );
}
