export const metadata = {
  title: "Kaynaklar",
  description: "Yalnızlıkla başa çıkmaya küçük, nazik adımlar ve bağlantılar.",
};

export default function Kaynaklar() {
  return (
    <main className="container mx-auto max-w-3xl p-6">
      <h1 className="h1 mb-4">Kaynaklar</h1>
      <p className="muted mb-6">
        Nazik ve küçük adımlar iyi gelir. Aşağıdaki kaynaklar başlangıç olsun.
      </p>
      <ul className="space-y-3">
        <li className="card p-4">
          <h2 className="h2 mb-1 text-xl">Nefes egzersizi (60 saniye)</h2>
          <p className="muted">Kısa bir zamanlayıcıyla nefes al‑ver ritmini dengeler.</p>
        </li>
        <li className="card p-4">
          <h2 className="h2 mb-1 text-xl">Günlük tutma ipuçları</h2>
          <p className="muted">
            Günde 2‑3 cümle: &ldquo;Bugün elimden gelen bu kadardı ve yeterdi.&rdquo;
          </p>
        </li>
      </ul>
    </main>
  );
}
