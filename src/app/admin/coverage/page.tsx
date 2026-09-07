import { getGovernoratesWithDistricts } from "@/lib/data";
import CoverageManager from "@/components/CoverageManager";

export const dynamic = "force-dynamic";

export default async function AdminCoveragePage() {
  const governorates = await getGovernoratesWithDistricts(false);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">المحافظات والمناطق</h1>
      <p className="text-sm text-ink-soft mt-1">
        تحكم في المحافظات والمناطق اللي بتظهر للعميل وهو بيحجز معاينة. أي محافظة أو منطقة تقفلها هتختفي فورًا من نموذج الحجز.
      </p>

      <div className="mt-8">
        <CoverageManager initialGovernorates={governorates} />
      </div>
    </div>
  );
}
