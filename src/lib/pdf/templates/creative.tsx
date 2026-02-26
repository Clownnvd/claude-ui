import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { CVData } from "@/types/cv"

const BLUE = "#1B4FD8"
const BLUE_DARK = "#1e3a8a"
const BLUE_LIGHT = "#DBEAFE"
const TEXT = "#0F172A"
const WHITE = "#FFFFFF"
const MUTED = "#475569"

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, color: TEXT, flexDirection: "row" },
  sidebar: { width: "33%", backgroundColor: BLUE, padding: 24, color: WHITE },
  main: { flex: 1, padding: 28 },
  sidebarName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    lineHeight: 1.3,
    marginBottom: 4,
  },
  sidebarHeadline: { fontSize: 8.5, color: BLUE_LIGHT, marginBottom: 14 },
  sidebarSection: { marginBottom: 14 },
  sidebarLabel: {
    fontSize: 7,
    color: BLUE_LIGHT,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  sidebarText: { fontSize: 8, color: WHITE, lineHeight: 1.5 },
  sidebarMuted: { fontSize: 8, color: BLUE_LIGHT },
  skillChip: {
    backgroundColor: BLUE_DARK,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 3,
    marginRight: 3,
  },
  skillText: { fontSize: 7.5, color: WHITE },
  mainSection: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: BLUE,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottom: `2 solid ${BLUE}`,
    paddingBottom: 3,
    marginBottom: 8,
  },
  expTitle: { fontFamily: "Helvetica-Bold", fontSize: 9 },
  expSub: { fontSize: 8, color: MUTED, marginTop: 1, marginBottom: 3 },
  bullet: { flexDirection: "row", marginBottom: 1.5 },
  bulletDot: { width: 10, color: BLUE },
  bulletText: { flex: 1, fontSize: 8, color: TEXT },
})

export function CreativeTemplate({ data }: { data: CVData }) {
  const {
    personalInfo,
    experience = [],
    education = [],
    skillGroups = [],
    languages = [],
    certifications = [],
  } = data

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarName}>
            {personalInfo.fullName || "Ho va Ten"}
          </Text>
          {personalInfo.headline && (
            <Text style={styles.sidebarHeadline}>{personalInfo.headline}</Text>
          )}

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarLabel}>Lien he</Text>
            {personalInfo.email && (
              <Text style={styles.sidebarText}>{personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.sidebarText}>{personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.sidebarText}>{personalInfo.location}</Text>
            )}
            {personalInfo.linkedIn && (
              <Text style={styles.sidebarMuted}>{personalInfo.linkedIn}</Text>
            )}
          </View>

          {/* Skills in sidebar */}
          {skillGroups.length > 0 && (
            <View style={styles.sidebarSection}>
              {skillGroups.map((g) => (
                <View key={g.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.sidebarLabel}>{g.category}</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {g.skills.map((s) => (
                      <View key={s.id} style={styles.skillChip}>
                        <Text style={styles.skillText}>{s.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Languages in sidebar */}
          {languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarLabel}>Ngon ngu</Text>
              {languages.map((l) => (
                <Text key={l.id} style={styles.sidebarText}>
                  {l.name}:{" "}
                  <Text style={styles.sidebarMuted}>{l.proficiency}</Text>
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Main content */}
        <View style={styles.main}>
          {personalInfo.summary && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>GIOI THIEU</Text>
              <Text style={{ fontSize: 8.5, lineHeight: 1.6, color: MUTED }}>
                {personalInfo.summary}
              </Text>
            </View>
          )}

          {experience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>KINH NGHIEM</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.expTitle}>{exp.jobTitle}</Text>
                    <Text style={{ fontSize: 7.5, color: MUTED }}>
                      {exp.startDate}-{exp.isCurrent ? "Nay" : exp.endDate || ""}
                    </Text>
                  </View>
                  <Text style={styles.expSub}>
                    {exp.company}
                    {exp.location ? ` | ${exp.location}` : ""}
                  </Text>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={styles.bulletDot}>{">"}</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>HOC VAN</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.expTitle}>{edu.institution}</Text>
                  <Text style={styles.expSub}>
                    {edu.degree}
                    {edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}
                  </Text>
                  <Text style={{ fontSize: 8, color: MUTED }}>
                    {edu.startDate}-{edu.endDate || "Nay"}
                    {edu.grade ? ` · GPA: ${edu.grade}` : ""}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {certifications.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>CHUNG CHI</Text>
              {certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 5 }}>
                  <Text style={styles.expTitle}>{cert.name}</Text>
                  {cert.issuer && (
                    <Text style={styles.expSub}>
                      {cert.issuer}
                      {cert.issueDate ? ` · ${cert.issueDate}` : ""}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
