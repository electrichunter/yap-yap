
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-8 text-center bg-background">
      <div className="max-w-4xl space-y-8 animate-fade-in-up flex flex-col items-center">
        {/* Logo & Badge */}

        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Ankara'nın Yeni Nesil Tadilat Platformu
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
          Yapı Kültürünü <br className="hidden sm:block" />
          <span className="text-primary">Teknolojiyle</span> İnşa Ediyoruz.
        </h1>

        {/* Hero Description */}
        <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-muted-foreground">
          Usta-çırak geleneğinden gelen tecrübeyi, modern mühendislik ve veri analitiği ile birleştiriyoruz. Şeffaf, hesaplı ve güvenilir tadilat süreçleri.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            className="flex h-14 min-w-[180px] items-center justify-center bg-primary px-8 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            href="/hakkimizda"
          >
            Bizi Tanıyın
          </a>
          <a
            className="flex h-14 min-w-[180px] items-center justify-center border-2 border-foreground px-8 text-lg font-bold text-foreground transition-all hover:bg-foreground hover:text-background"
            href="/calisma-alanimiz"
          >
            Neler Yapıyoruz?
          </a>
        </div>
      </div>
    </main>
  );
}
