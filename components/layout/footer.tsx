import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative border-t border-slate-800/70 mt-12">

      {/* Glow dourado sutil acima do footer */}
      <div
        className="absolute inset-x-0 -top-6 h-10 
        bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_75%)]
        pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">

        {/* Bloco do Logo + Nome */}
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl overflow-hidden border border-yellow-500/30 shadow-md shadow-black/30 bg-slate-900">
            <Image
              src="/logo.jpg"
              alt="Golden Goal"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-slate-200 text-sm">
              Escola de Fut 7 Golden Goal
            </span>

            <span className="text-[11px] text-slate-500">
              Plataforma oficial de gestão escolar e portal do responsável.
            </span>
          </div>
        </div>

        {/* Bloco das informações institucionais */}
        <div className="flex flex-col items-center sm:items-end gap-1 leading-tight text-[11px]">
          <span className="text-slate-400">
            © {new Date().getFullYear()} Golden Goal — Todos os direitos reservados.
          </span>

          <span className="text-slate-600">
            CNPJ: 00.000.000/0000-00
          </span>

          <span className="text-slate-600">
            Contato: secretaria@goldengoal.com.br
          </span>
        </div>

      </div>
    </footer>
  );
}
