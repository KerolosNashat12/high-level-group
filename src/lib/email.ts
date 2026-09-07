import { Resend } from "resend";

export async function notifyNewVisitRequest(data: {
  name: string;
  phone: string;
  city: string;
  area?: string | null;
  packageName?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
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
      subject: `طلب معاينة جديد من ${data.name}`,
      html: `
        <div dir="rtl" style="font-family: Tajawal, Arial, sans-serif;">
          <h2>طلب معاينة جديد 🏠</h2>
          <p><strong>الاسم:</strong> ${data.name}</p>
          <p><strong>الهاتف:</strong> ${data.phone}</p>
          <p><strong>المدينة:</strong> ${data.city}</p>
          ${data.area ? `<p><strong>المنطقة:</strong> ${data.area}</p>` : ""}
          ${data.packageName ? `<p><strong>الباقة المطلوبة:</strong> ${data.packageName}</p>` : ""}
          ${data.preferredDate ? `<p><strong>التاريخ المفضل:</strong> ${data.preferredDate}${data.preferredTime ? ` - ${data.preferredTime}` : ""}</p>` : ""}
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
