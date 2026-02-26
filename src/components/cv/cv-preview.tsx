"use client"

import type { CVData, CVTemplate, LanguageProficiency } from "@/types/cv"

// ─── Props ────────────────────────────────────────────────────────────────────

interface CVPreviewProps {
  cvData: CVData
  template: CVTemplate
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ""
  const [year, month] = dateStr.split("-")
  if (!year) return ""
  if (!month) return year
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date.toLocaleDateString("vi-VN", { month: "short", year: "numeric" })
}

function proficiencyLabel(level: LanguageProficiency): string {
  const map: Record<LanguageProficiency, string> = {
    native: "Bản ngữ",
    fluent: "Thành thạo (C2)",
    advanced: "Giỏi (C1)",
    "upper-intermediate": "Khá (B2)",
    intermediate: "Trung cấp (B1)",
    elementary: "Cơ bản (A2)",
    beginner: "Sơ cấp (A1)",
  }
  return map[level] ?? level
}

// ─── Classic Template ─────────────────────────────────────────────────────────

function ClassicTemplate({ cvData }: { cvData: CVData }) {
  const { personalInfo, experience = [], education = [], skillGroups = [], languages = [], certifications = [] } = cvData

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#1B4FD8",
    borderBottom: "1.5px solid #1B4FD8",
    paddingBottom: "3px",
    marginBottom: "8px",
    marginTop: "12px",
  }

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#0F172A", fontSize: "9px", lineHeight: "1.4" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div>
          <p style={{ fontSize: "18px", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            {personalInfo.fullName || "Họ và Tên"}
          </p>
          {personalInfo.headline && (
            <p style={{ fontSize: "10px", color: "#1B4FD8", fontWeight: 600, marginTop: "3px" }}>
              {personalInfo.headline}
            </p>
          )}
        </div>
        <div style={{ textAlign: "right", fontSize: "8.5px", color: "#475569", lineHeight: 1.7 }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedIn && <div style={{ color: "#1B4FD8" }}>{personalInfo.linkedIn}</div>}
          {personalInfo.website && <div style={{ color: "#1B4FD8" }}>{personalInfo.website}</div>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <p style={sectionHeadingStyle}>Giới thiệu</p>
          <p style={{ fontSize: "8.5px", color: "#334155", lineHeight: 1.5 }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <p style={sectionHeadingStyle}>Kinh nghiệm làm việc</p>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: 700, fontSize: "9px", margin: 0 }}>{exp.company}</p>
                <p style={{ fontSize: "8px", color: "#64748B", margin: 0 }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? "Hiện tại" : formatDate(exp.endDate)}
                </p>
              </div>
              <p style={{ fontSize: "8.5px", color: "#1B4FD8", fontWeight: 600, margin: "2px 0" }}>
                {exp.jobTitle}
                {exp.location ? ` · ${exp.location}` : ""}
              </p>
              {exp.bullets.filter(Boolean).map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "5px", marginBottom: "2px" }}>
                  <span style={{ color: "#64748B", flexShrink: 0 }}>•</span>
                  <span style={{ fontSize: "8px", color: "#334155" }}>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <p style={sectionHeadingStyle}>Học vấn</p>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: 700, fontSize: "9px", margin: 0 }}>{edu.institution}</p>
                <p style={{ fontSize: "8px", color: "#64748B", margin: 0 }}>
                  {formatDate(edu.startDate)} – {edu.isCurrent ? "Đang học" : formatDate(edu.endDate)}
                </p>
              </div>
              <p style={{ fontSize: "8.5px", color: "#475569", margin: "2px 0" }}>
                {[edu.degree, edu.fieldOfStudy].filter(Boolean).join(" · ")}
                {edu.grade ? ` · GPA: ${edu.grade}` : ""}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skillGroups.length > 0 && (
        <div>
          <p style={sectionHeadingStyle}>Kỹ năng</p>
          {skillGroups.map((group) => (
            <div key={group.id} style={{ marginBottom: "5px", display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
              <span style={{ fontWeight: 700, fontSize: "8.5px", flexShrink: 0 }}>{group.category}:</span>
              <span style={{ fontSize: "8px", color: "#475569" }}>
                {group.skills.map((s) => s.name).join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <p style={sectionHeadingStyle}>Ngôn ngữ</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {languages.map((lang) => (
              <span key={lang.id} style={{ fontSize: "8.5px" }}>
                <strong>{lang.name}</strong>: {proficiencyLabel(lang.proficiency)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <p style={sectionHeadingStyle}>Chứng chỉ</p>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: "5px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: 700, fontSize: "9px", margin: 0 }}>{cert.name}</p>
                {cert.issueDate && (
                  <p style={{ fontSize: "8px", color: "#64748B", margin: 0 }}>{formatDate(cert.issueDate)}</p>
                )}
              </div>
              {cert.issuer && <p style={{ fontSize: "8px", color: "#475569", margin: "1px 0 0" }}>{cert.issuer}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Modern Template ──────────────────────────────────────────────────────────

function ModernTemplate({ cvData }: { cvData: CVData }) {
  const { personalInfo, experience = [], education = [], skillGroups = [], languages = [], certifications = [] } = cvData

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#0F172A",
    marginBottom: "7px",
    marginTop: "12px",
  }

  const dividerStyle: React.CSSProperties = {
    borderBottom: "1px solid #E2E8F0",
    marginBottom: "8px",
  }

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#0F172A", fontSize: "9px", lineHeight: "1.4" }}>
      {/* Name block with left accent */}
      <div style={{ display: "flex", gap: "10px", alignItems: "stretch", marginBottom: "10px" }}>
        <div style={{ width: "3px", backgroundColor: "#1B4FD8", borderRadius: "2px", flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: "20px", fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            {personalInfo.fullName || "Họ và Tên"}
          </p>
          {personalInfo.headline && (
            <p style={{ fontSize: "10px", color: "#1B4FD8", fontWeight: 600, marginTop: "3px" }}>
              {personalInfo.headline}
            </p>
          )}
        </div>
      </div>

      {/* Contact row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "8px", color: "#475569", marginBottom: "10px" }}>
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.linkedIn && <span style={{ color: "#1B4FD8" }}>{personalInfo.linkedIn}</span>}
        {personalInfo.website && <span style={{ color: "#1B4FD8" }}>{personalInfo.website}</span>}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <div style={dividerStyle} />
          <p style={sectionHeadingStyle}>Giới thiệu</p>
          <p style={{ fontSize: "8.5px", color: "#334155", lineHeight: 1.5, marginBottom: "8px" }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <div style={dividerStyle} />
          <p style={sectionHeadingStyle}>Kinh nghiệm</p>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: 700, fontSize: "9px", margin: 0 }}>{exp.jobTitle}</p>
                <p style={{ fontSize: "8px", color: "#64748B", margin: 0 }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? "Hiện tại" : formatDate(exp.endDate)}
                </p>
              </div>
              <p style={{ fontSize: "8.5px", color: "#475569", margin: "2px 0 4px" }}>
                {exp.company}
                {exp.location ? ` · ${exp.location}` : ""}
              </p>
              {exp.bullets.filter(Boolean).map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "5px", marginBottom: "2px" }}>
                  <span style={{ color: "#1B4FD8", flexShrink: 0, fontWeight: 700 }}>—</span>
                  <span style={{ fontSize: "8px", color: "#334155" }}>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <div style={dividerStyle} />
          <p style={sectionHeadingStyle}>Học vấn</p>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: 700, fontSize: "9px", margin: 0 }}>{edu.institution}</p>
                <p style={{ fontSize: "8px", color: "#64748B", margin: 0 }}>
                  {formatDate(edu.startDate)} – {edu.isCurrent ? "Đang học" : formatDate(edu.endDate)}
                </p>
              </div>
              <p style={{ fontSize: "8.5px", color: "#475569", margin: "2px 0" }}>
                {[edu.degree, edu.fieldOfStudy].filter(Boolean).join(" · ")}
                {edu.grade ? ` · ${edu.grade}` : ""}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skillGroups.length > 0 && (
        <div>
          <div style={dividerStyle} />
          <p style={sectionHeadingStyle}>Kỹ năng</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {skillGroups.map((group) => (
              <div key={group.id} style={{ display: "flex", gap: "6px", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, fontSize: "8.5px", flexShrink: 0, color: "#1B4FD8" }}>
                  {group.category}:
                </span>
                <span style={{ fontSize: "8px", color: "#475569" }}>
                  {group.skills.map((s) => s.name).join(" · ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages + Certs */}
      {(languages.length > 0 || certifications.length > 0) && (
        <div>
          <div style={dividerStyle} />
          <div style={{ display: "flex", gap: "20px" }}>
            {languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <p style={{ ...sectionHeadingStyle, marginTop: 0 }}>Ngôn ngữ</p>
                {languages.map((lang) => (
                  <p key={lang.id} style={{ fontSize: "8.5px", margin: "2px 0" }}>
                    <strong>{lang.name}</strong>: {proficiencyLabel(lang.proficiency)}
                  </p>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div style={{ flex: 1 }}>
                <p style={{ ...sectionHeadingStyle, marginTop: 0 }}>Chứng chỉ</p>
                {certifications.map((cert) => (
                  <p key={cert.id} style={{ fontSize: "8.5px", margin: "2px 0" }}>
                    <strong>{cert.name}</strong>
                    {cert.issuer ? ` · ${cert.issuer}` : ""}
                    {cert.issueDate ? ` (${formatDate(cert.issueDate)})` : ""}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Creative Template ────────────────────────────────────────────────────────

function CreativeTemplate({ cvData }: { cvData: CVData }) {
  const { personalInfo, experience = [], education = [], skillGroups = [], languages = [], certifications = [] } = cvData

  const sidebarHeadingStyle: React.CSSProperties = {
    fontSize: "8px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#ffffff",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    paddingBottom: "3px",
    marginBottom: "6px",
    marginTop: "10px",
  }

  const mainHeadingStyle: React.CSSProperties = {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#1B4FD8",
    borderBottom: "1.5px solid #1B4FD8",
    paddingBottom: "3px",
    marginBottom: "8px",
    marginTop: "12px",
  }

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", display: "flex", height: "100%", fontSize: "9px" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "32%",
          backgroundColor: "#1B4FD8",
          padding: "16px 10px",
          color: "white",
          flexShrink: 0,
          minHeight: "100%",
        }}
      >
        {/* Avatar placeholder */}
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.2)",
          margin: "0 auto 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 800,
          color: "white",
        }}>
          {(personalInfo.fullName || "?").charAt(0).toUpperCase()}
        </div>

        {/* Name */}
        <p style={{ fontSize: "12px", fontWeight: 800, color: "white", textAlign: "center", margin: "0 0 3px" }}>
          {personalInfo.fullName || "Họ và Tên"}
        </p>
        {personalInfo.headline && (
          <p style={{ fontSize: "8px", color: "rgba(255,255,255,0.8)", textAlign: "center", margin: "0 0 8px" }}>
            {personalInfo.headline}
          </p>
        )}

        {/* Contact */}
        <p style={sidebarHeadingStyle}>Liên hệ</p>
        <div style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedIn && <div>{personalInfo.linkedIn}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
        </div>

        {/* Skills */}
        {skillGroups.length > 0 && (
          <div>
            <p style={sidebarHeadingStyle}>Kỹ năng</p>
            {skillGroups.map((group) => (
              <div key={group.id} style={{ marginBottom: "6px" }}>
                <p style={{ fontSize: "7.5px", fontWeight: 700, color: "rgba(255,255,255,0.7)", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {group.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill.id}
                      style={{
                        fontSize: "7px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "white",
                        padding: "2px 5px",
                        borderRadius: "9999px",
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <p style={sidebarHeadingStyle}>Ngôn ngữ</p>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: "4px" }}>
                <p style={{ fontSize: "8px", fontWeight: 700, color: "white", margin: 0 }}>{lang.name}</p>
                <p style={{ fontSize: "7px", color: "rgba(255,255,255,0.7)", margin: 0 }}>{proficiencyLabel(lang.proficiency)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "16px 14px", overflow: "hidden" }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <p style={mainHeadingStyle}>Giới thiệu</p>
            <p style={{ fontSize: "8.5px", color: "#334155", lineHeight: 1.5 }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <p style={mainHeadingStyle}>Kinh nghiệm</p>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <p style={{ fontWeight: 700, fontSize: "9px", margin: 0 }}>{exp.jobTitle}</p>
                  <p style={{ fontSize: "7.5px", color: "#64748B", margin: 0, flexShrink: 0 }}>
                    {formatDate(exp.startDate)} – {exp.isCurrent ? "Hiện tại" : formatDate(exp.endDate)}
                  </p>
                </div>
                <p style={{ fontSize: "8px", color: "#1B4FD8", fontWeight: 600, margin: "2px 0 4px" }}>
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: "5px", marginBottom: "2px" }}>
                    <span style={{ color: "#1B4FD8", flexShrink: 0 }}>•</span>
                    <span style={{ fontSize: "8px", color: "#334155" }}>{b}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <p style={mainHeadingStyle}>Học vấn</p>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <p style={{ fontWeight: 700, fontSize: "9px", margin: 0 }}>{edu.institution}</p>
                  <p style={{ fontSize: "7.5px", color: "#64748B", margin: 0, flexShrink: 0 }}>
                    {formatDate(edu.startDate)} – {edu.isCurrent ? "Đang học" : formatDate(edu.endDate)}
                  </p>
                </div>
                <p style={{ fontSize: "8px", color: "#475569", margin: "2px 0" }}>
                  {[edu.degree, edu.fieldOfStudy].filter(Boolean).join(" · ")}
                  {edu.grade ? ` · ${edu.grade}` : ""}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <p style={mainHeadingStyle}>Chứng chỉ</p>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <p style={{ fontWeight: 700, fontSize: "9px", margin: 0 }}>{cert.name}</p>
                  {cert.issueDate && (
                    <p style={{ fontSize: "7.5px", color: "#64748B", margin: 0 }}>{formatDate(cert.issueDate)}</p>
                  )}
                </div>
                {cert.issuer && <p style={{ fontSize: "8px", color: "#475569", margin: "1px 0 0" }}>{cert.issuer}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Named export (compatible with form-based editor pages) ──────────────────

/**
 * CVPreview (named export) — accepts `data` and `template` props.
 * Wraps the default export for use in pages that import { CVPreview }.
 */
export function CVPreview({ data, template }: { data: CVData; template: CVTemplate }) {
  return <CVPreviewDefault cvData={data} template={template} />
}

// ─── Main export ─────────────────────────────────────────────────────────────

function CVPreviewDefault({ cvData, template }: CVPreviewProps) {
  // A4 proportions: 210mm × 297mm → approx 794px × 1123px at 96dpi
  const A4_WIDTH = 794
  const A4_HEIGHT = 1123

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#F1F5F9] overflow-auto py-6 px-4">
      {/* A4 wrapper — scaled to fit the pane */}
      <div
        className="origin-top w-full"
        style={{
          // Use a CSS scale approach so the A4 page scales proportionally
          maxWidth: A4_WIDTH,
        }}
      >
        <div
          style={{
            width: A4_WIDTH,
            minHeight: A4_HEIGHT,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            borderRadius: "2px",
            padding: "36px 40px",
            transformOrigin: "top left",
            // Scale down to fit in the available container
            transform: "scale(var(--cv-scale, 0.62))",
            marginBottom: `calc((var(--cv-scale, 0.62) - 1) * ${A4_HEIGHT}px)`,
            boxSizing: "border-box",
          }}
        >
          {template === "classic" && <ClassicTemplate cvData={cvData} />}
          {template === "modern" && <ModernTemplate cvData={cvData} />}
          {template === "creative" && <CreativeTemplate cvData={cvData} />}
        </div>
      </div>
    </div>
  )
}

export default CVPreviewDefault
