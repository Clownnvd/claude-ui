// ─────────────────────────────────────────────────────────────────────────────
// CViet — Core TypeScript Types
// Foundation types used throughout the entire application.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Enums / Unions ──────────────────────────────────────────────────────────

/** Supported CV template layouts */
export type CVTemplate = "classic" | "modern" | "creative"

/** Supported CV output languages */
export type CVLanguage = "vi" | "en"

/** User subscription plan */
export type PlanType = "FREE" | "PRO"

/**
 * AI features available in the app.
 * - rewrite:   Rewrite a section with improved language
 * - suggest:   Suggest new bullet points / skills
 * - translate: Translate CV content between vi and en
 * - score:     Score the CV and provide improvement tips
 */
export type AIFeature = "rewrite" | "suggest" | "translate" | "score"

// ─── Personal Info ────────────────────────────────────────────────────────────

export interface PersonalInfo {
  /** Full name of the candidate */
  fullName: string
  /** Professional headline / job title */
  headline?: string
  /** Contact email address */
  email: string
  /** Phone number (include country code, e.g. +84) */
  phone?: string
  /** City and/or country of residence */
  location?: string
  /** LinkedIn profile URL */
  linkedIn?: string
  /** Personal website or portfolio URL */
  website?: string
  /** GitHub profile URL */
  github?: string
  /** Brief professional summary / objective */
  summary?: string
  /** URL to the candidate's profile photo */
  avatarUrl?: string
}

// ─── Experience ───────────────────────────────────────────────────────────────

export interface Experience {
  id: string
  /** Job title / position held */
  jobTitle: string
  /** Company or organisation name */
  company: string
  /** Location of the role (city, remote, etc.) */
  location?: string
  /** ISO date string for start of employment (YYYY-MM) */
  startDate: string
  /** ISO date string for end of employment (YYYY-MM). Omit if current. */
  endDate?: string
  /** Whether this is the candidate's current role */
  isCurrent?: boolean
  /** Bullet-point achievements / responsibilities */
  bullets: string[]
  /** Optional brief description of the company */
  companyDescription?: string
}

// ─── Education ────────────────────────────────────────────────────────────────

export interface Education {
  id: string
  /** Name of the institution */
  institution: string
  /** Degree or qualification title */
  degree: string
  /** Field of study / major */
  fieldOfStudy?: string
  /** Location of the institution */
  location?: string
  /** ISO date string for start of study (YYYY-MM) */
  startDate: string
  /** ISO date string for end of study (YYYY-MM). Omit if in progress. */
  endDate?: string
  /** Whether currently studying */
  isCurrent?: boolean
  /** GPA or grade description, e.g. "3.8 / 4.0" or "Giỏi" */
  grade?: string
  /** Notable activities, achievements, or relevant coursework */
  description?: string
}

// ─── Skills ───────────────────────────────────────────────────────────────────

/** Proficiency level for a skill */
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert"

export interface Skill {
  id: string
  /** Skill name, e.g. "TypeScript", "Photoshop" */
  name: string
  /** Optional proficiency level */
  level?: SkillLevel
}

/** A named group of related skills */
export interface SkillGroup {
  id: string
  /** Category label, e.g. "Frontend", "Languages", "Soft Skills" */
  category: string
  skills: Skill[]
}

// ─── Languages ────────────────────────────────────────────────────────────────

/** Spoken / written language proficiency levels aligned to CEFR + common terms */
export type LanguageProficiency =
  | "native"
  | "fluent"
  | "advanced"    // C1
  | "upper-intermediate" // B2
  | "intermediate" // B1
  | "elementary"  // A2
  | "beginner"    // A1

export interface Language {
  id: string
  /** Language name, e.g. "Tiếng Việt", "English", "Japanese" */
  name: string
  proficiency: LanguageProficiency
}

// ─── Certifications ───────────────────────────────────────────────────────────

export interface Certification {
  id: string
  /** Certification / award / honour name */
  name: string
  /** Issuing organisation or institution */
  issuer?: string
  /** ISO date string of when the credential was issued (YYYY-MM) */
  issueDate?: string
  /** ISO date string of when the credential expires (YYYY-MM). Omit if no expiry. */
  expiryDate?: string
  /** URL to verify the credential */
  credentialUrl?: string
  /** Optional credential ID / licence number */
  credentialId?: string
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  /** Project name */
  name: string
  /** Short description of the project and the candidate's role */
  description?: string
  /** Technologies / tools used */
  technologies?: string[]
  /** URL to live project or demo */
  projectUrl?: string
  /** URL to source code repository */
  repoUrl?: string
  /** ISO date string when the project was started or completed (YYYY-MM) */
  date?: string
}

// ─── Custom Section ───────────────────────────────────────────────────────────

/** A free-form section for volunteering, publications, hobbies, etc. */
export interface CustomSection {
  id: string
  /** Section heading shown on the CV */
  title: string
  /** Free-form Markdown or plain text content */
  content: string
}

// ─── CVData — Full CV Payload ─────────────────────────────────────────────────

/**
 * The complete data structure stored in the CV.data JSON column.
 * Every field except `personalInfo` is optional so the user can build
 * the CV incrementally.
 */
export interface CVData {
  personalInfo: PersonalInfo
  experience?: Experience[]
  education?: Education[]
  /** Flat list of skills (used when grouping is not required) */
  skills?: Skill[]
  /** Grouped skills (used for templates that support skill categories) */
  skillGroups?: SkillGroup[]
  languages?: Language[]
  certifications?: Certification[]
  projects?: Project[]
  /** Any number of user-defined custom sections */
  customSections?: CustomSection[]
}

// ─── CV Record (mirrors Prisma CV model) ─────────────────────────────────────

/**
 * Represents a CV record as returned from the database.
 * `data` is typed as CVData rather than Prisma's opaque `Json`.
 */
export interface CVRecord {
  id: string
  userId: string
  title: string
  template: CVTemplate
  language: CVLanguage
  data: CVData
  createdAt: Date
  updatedAt: Date
}

// ─── AI Request / Response helpers ───────────────────────────────────────────

export interface AIRewriteRequest {
  feature: "rewrite"
  /** The section of the CV being rewritten, e.g. "summary", "bullets" */
  section: string
  /** The original text to rewrite */
  originalText: string
  /** Target language for the output */
  language: CVLanguage
  /** Additional context such as target job title */
  context?: string
}

export interface AISuggestRequest {
  feature: "suggest"
  /** The section to generate suggestions for */
  section: string
  /** Existing CV data for context */
  cvData: Partial<CVData>
  language: CVLanguage
}

export interface AITranslateRequest {
  feature: "translate"
  /** Full CV data to translate */
  cvData: CVData
  /** Source language */
  from: CVLanguage
  /** Target language */
  to: CVLanguage
}

export interface AIScoreRequest {
  feature: "score"
  cvData: CVData
  /** Target job title / industry for scoring context */
  targetRole?: string
  language: CVLanguage
}

export type AIRequest =
  | AIRewriteRequest
  | AISuggestRequest
  | AITranslateRequest
  | AIScoreRequest

export interface AIScoreResult {
  /** Overall score out of 100 */
  overall: number
  /** Per-section scores */
  sections: Record<string, number>
  /** Actionable improvement suggestions */
  suggestions: string[]
}

export interface AIResponse<T = string> {
  success: boolean
  data?: T
  error?: string
  /** Tokens consumed by this request (for usage tracking) */
  tokensUsed?: number
}

// ─── Editor Step ──────────────────────────────────────────────────────────────

export type EditorStep = "personal" | "experience" | "education" | "skills" | "languages" | "certifications"
