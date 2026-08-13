export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-[#0b1230] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <div className="mx-auto mb-4 flex w-24 justify-center gap-1">
          <span className="h-1.5 flex-1 rounded-full bg-cameroon-green" />
          <span className="h-1.5 flex-1 rounded-full bg-cameroon-red" />
          <span className="h-1.5 flex-1 rounded-full bg-cameroon-yellow" />
        </div>

        <h3 className="text-lg font-bold text-white">CNI FIND</h3>
        <p className="mt-2 text-slate-400">Perdue. Retrouvée. Restituée.</p>

        <p className="mx-auto mt-4 max-w-md text-sm text-slate-500">
          Plateforme citoyenne indépendante. Non affiliée à la DGSN.
        </p>

        <p className="mt-6 text-xs text-slate-500">
          Développé par <span className="text-slate-300">Karl Smith</span>
        </p>
      </div>
    </footer>
  );
}
