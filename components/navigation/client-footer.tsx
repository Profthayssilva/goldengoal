export function ClientFooter() {
  return (
    <footer className="relative border-t border-slate-800/70 bg-slate-950/90 backdrop-blur-xl mt-12">

      {/* Glow dourado discreto para efeito premium */}
      <div
        className="absolute inset-x-0 -top-6 h-10
        bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_75%)]
        pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] leading-relaxed">

        {/* Endereço da escola */}
        <span className="text-slate-400 text-center sm:text-left">
          Escola de Fut7 Golden Goal • Rua Rua 23, 500 Chácaras Americanas, Space Ball, Anápolis-GO - 75103-210.
        </span>

        {/* Créditos */}
        <span className="text-slate-500 text-center sm:text-right">
          Desenvolvido por{" "}
          <b className="text-yellow-400 font-semibold hover:text-yellow-300 transition">
            Thays Silva
          </b>
        </span>

      </div>
    </footer>
  );
}
