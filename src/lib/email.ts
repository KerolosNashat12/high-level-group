import { Resend } from "resend";

function fmt(n: number) {
  return Math.round(n).toLocaleString("ar-EG");
}

export async function notifyNewVisitRequest(data: {
  name: string;
  phone: string;
  city: string;
  packageName: string;
  areaSqm: number;
  downPct: number;
  installmentMonths: number;
  monthlyInstallment: number;
  totalCost: number;
  preferredDate: string;
  preferredTime: string;
  notes?: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    console.log(
      "[email] RESEND_API_KEY or NOTIFY_EMAIL not set — skipping email notification. Lead was still saved to the dashboard."
    );
    return { skipped: true };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "High Level Group <onboarding@resend.dev>",
      to: notifyEmail,
      subject: `طلب معاينة جديد من ${data.name} — باقة ${data.packageName}`,
      html: `
        <div dir="rtl" style="font-family: Tajawal, Arial, sans-serif;">
          <h2>طلب معاينة جديد 🏠</h2>
          <p><strong>الاسم:</strong> ${data.name}</p>
          <p><strong>الهاتف:</strong> ${data.phone}</p>
          <p><strong>المحافظة:</strong> ${data.city}</p>
          <hr />
          <p><strong>الباقة:</strong> ${data.packageName}</p>
          <p><strong>المساحة:</strong> ${fmt(data.areaSqm)} م²</p>
          <p><strong>مقدم التعاقد:</strong> ${data.downPct}%</p>
          <p><strong>مدة التقسيط:</strong> ${data.installmentMonths} شهر</p>
          <p><strong>القسط الشهري التقديري:</strong> ${fmt(data.monthlyInstallment)} ج.م</p>
          <p><strong>التكلفة التقديرية للمشروع:</strong> ${fmt(data.totalCost)} ج.م</p>
          <hr />
          <p><strong>موعد المعاينة:</strong> ${data.preferredDate} - ${data.preferredTime}</p>
          ${data.notes ? `<p><strong>ملاحظات:</strong> ${data.notes}</p>` : ""}
          <p style="margin-top:16px;">تحقق من لوحة التحكم لمتابعة الطلب.</p>
        </div>
      `,
    });
    return { skipped: false };
  } catch (err) {
    console.error("[email] Failed to send notification:", err);
    return { skipped: true, error: true };
  }
}
