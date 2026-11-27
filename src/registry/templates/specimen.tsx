import type { StarterTemplateSpec } from "./_taxonomy";

export function TemplatePreviewFrame({ template }: { readonly template: StarterTemplateSpec }) {
  const secondaryRoute = (template.routes[1] ?? "pricing").toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className="relative h-[184px] overflow-hidden border border-hairline px-4 pt-3.5"
      style={{ backgroundColor: template.canvas }}
    >
      {/* Back Secondary Route Sheet */}
      <div
        className="absolute top-4 right-4 bottom-0 w-[54%] border border-b-0 px-[11px] py-[9px] opacity-75"
        style={{ backgroundColor: template.surface, borderColor: template.border }}
      >
        <div className="flex justify-between font-mono text-[9px] text-[#8a8f98]">
          <span>/{secondaryRoute}</span>
          <span style={{ color: template.accent }}>SYNCED</span>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <div
            className="h-[42px] border"
            style={{ borderColor: template.border, backgroundColor: template.canvas }}
          />
          <div
            className="h-[42px] border"
            style={{ borderColor: template.border, backgroundColor: template.canvas }}
          />
        </div>
      </div>

      {/* Front Primary Page Sheet */}
      <div
        className="relative z-[2] flex h-full w-[68%] flex-col justify-between border border-b-0 px-[13px] py-[11px] shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
        style={{ backgroundColor: template.surface, borderColor: template.border }}
      >
        <div>
          <div
            className="flex items-center justify-between border-b pb-2"
            style={{ borderColor: template.border }}
          >
            <span className="inline-flex items-center gap-[5px] text-[10px] font-bold text-[#f4f4f6]">
              <span
                className="inline-block h-[7px] w-[7px]"
                style={{ backgroundColor: template.accent }}
              />
              {template.name.split(" ")[0]}
            </span>
            <span
              className="px-1.5 py-px font-mono text-[8.5px] font-bold text-[#111113]"
              style={{ backgroundColor: template.accent }}
            >
              Deploy
            </span>
          </div>
          <div className="mt-2.5 text-[13px] leading-[1.2] font-semibold text-[#f4f4f6]">
            Multi-route starter wired with {template.skinLabel}.
          </div>
          <div
            className="mt-[7px] h-[5px] w-[72%]"
            style={{ backgroundColor: template.border }}
          />
        </div>

        <div className="grid grid-cols-3 gap-[5px] pb-2.5">
          {template.routes.slice(0, 3).map((route) => (
            <div
              key={route}
              className="truncate border px-[5px] py-1 font-mono text-[8.5px] text-[#a0a0a8]"
              style={{ borderColor: template.border, backgroundColor: template.canvas }}
            >
              {route}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
