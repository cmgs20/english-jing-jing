export const legalCss = `
/* Color tokens (--bg, --text, --blue, etc.) come from /public/palette.css,
   linked site-wide in app/layout.tsx — see that file to change a brand color. */
:root{
  --thai-soft:rgba(255,184,119,.08);
}
*{box-sizing:border-box;}
body.legal{
  margin:0; background:var(--bg); color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif;
}
.legal-th{ font-family:"Noto Sans Thai","Leelawadee UI","Segoe UI",sans-serif; }
.legal-wrap{ max-width:680px; margin:0 auto; padding:48px 20px 96px; }
.legal-back{
  font-family:system-ui,sans-serif; font-size:13px; font-weight:600;
  color:var(--muted); text-decoration:none; display:inline-block; margin-bottom:24px;
}
.legal-back:hover{ color:var(--blue-2); }
.legal-eyebrow{
  font-family:system-ui,sans-serif; font-size:11px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; color:var(--muted);
  margin-bottom:10px;
}
.legal-title{ font-size:26px; font-weight:700; margin:0 0 4px; }
.legal-title-th{ display:block; font-size:26px; font-weight:700; }
.legal-title-en{ display:block; font-size:14px; font-weight:400; color:var(--muted); font-style:italic; margin-top:2px; }
.legal-updated{ font-family:system-ui,sans-serif; font-size:12px; color:var(--faint); margin:0 0 36px; }
.legal-clause{ margin-bottom:32px; }
.legal-clause-head{ display:flex; align-items:baseline; gap:10px; margin-bottom:10px; }
.legal-num{ font-family:system-ui,sans-serif; font-weight:700; font-size:13px; color:var(--violet); flex-shrink:0; }
.legal-clause-title{ font-size:16px; font-weight:700; }
.legal-block{ border-radius:14px; padding:15px 18px; margin-bottom:8px; line-height:1.75; font-size:14.5px; }
.legal-block.th{ background:var(--thai-soft); border-left:3px solid var(--thai); }
.legal-block.en{ background:var(--card); border:1px solid var(--line); border-left:3px solid var(--blue); font-size:13px; color:var(--muted); line-height:1.7; }
.legal-block ul{ margin:6px 0 0; padding-left:20px; }
.legal-block li{ margin-bottom:4px; }
.legal-footer{ margin-top:56px; padding-top:20px; border-top:1px solid var(--line); font-family:system-ui,sans-serif; font-size:12px; color:var(--faint); line-height:1.7; }
.legal-footer a{ color:var(--blue-2); }
`

export function Clause({
  num,
  titleTh,
  th,
  en,
}: {
  num: string
  titleTh: string
  th: React.ReactNode
  en: React.ReactNode
}) {
  return (
    <div className="legal-clause">
      <div className="legal-clause-head">
        <span className="legal-num">{num}</span>
        <span className="legal-clause-title legal-th">{titleTh}</span>
      </div>
      <div className="legal-block th legal-th">{th}</div>
      <div className="legal-block en">{en}</div>
    </div>
  )
}
