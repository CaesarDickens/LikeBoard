import { BottomNav } from "@/components/BottomNav";
import { LikeHeader } from "@/components/LikeHeader";
import { RuleList } from "@/components/RuleList";

export default function AboutPage() {
  return (
    <main className="page-wrap">
      <LikeHeader />
      <RuleList />
      <BottomNav />
    </main>
  );
}
