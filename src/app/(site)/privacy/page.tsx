export const metadata = {
  title: "سياسة الخصوصية | هاى ليفيل للتشطيبات",
};

export default function PrivacyPage() {
  return (
    <section className="py-24">
      <div className="container-page max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink">سياسة الخصوصية</h1>
        <div className="mt-6 space-y-4 text-sm text-ink-soft leading-relaxed">
          <p>
            نحرص في هاى ليفيل جروب على خصوصية بياناتك. البيانات التي تشاركها
            معنا عبر نماذج طلب المعاينة أو التواصل (الاسم، رقم الهاتف،
            تفاصيل المشروع) تُستخدم فقط للتواصل معك بخصوص طلبك ولا تتم
            مشاركتها مع أي طرف ثالث لأغراض تسويقية.
          </p>
          <p>
            نطبق إجراءات حماية معقولة لتأمين بياناتك المخزنة، ويمكنك في أي
            وقت طلب حذف بياناتك بالتواصل معنا مباشرة عبر معلومات الاتصال
            الموضحة في صفحة اتصل بنا.
          </p>
        </div>
      </div>
    </section>
  );
}
