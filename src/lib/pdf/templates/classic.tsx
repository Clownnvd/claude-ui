import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { CVData } from "@/types/cv"

const BLUE = "#1B4FD8"
const TEXT = "#0F172A"
const MUTED = "#64748B"
const BORDER = "#E2E8F0"

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, color: TEXT, padding: 40, lineHeight: 1.4 },
  header: { borderBottom: `2 solid ${BLUE}`, paddingBottom: 12, marginBottom: 16 },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", color: TEXT },
  headline: { fontSize: 10, color: BLUE, fontFamily: "Helvetica-Bold", marginTop: 3 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 5 },
  contact: { fontSize: 8, color: MUTED, marginRight: 12 },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: BLUE,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottom: `1 solid ${BORDER}`,
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 14,
  },
  expRow: { marginBottom: 8 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  expTitle: { fontFamily: "Helvetica-Bold", fontSize: 9 },
  expCompany: { fontSize: 8, color: MUTED },
  expDate: { fontSize: 8, color: MUTED },
  bullet: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { width: 10, fontSize: 8, color: MUTED },
  bulletText: { flex: 1, fontSize: 8, color: TEXT },
  skillRow: { marginBottom: 4 },
  skillCategory: { fontFamily: "Helvetica-Bold", fontSize: 8 },
  skillList: { fontSize: 8, color: MUTED },
  summary: { fontSize: 8, color: TEXT, lineHeight: 1.5 },
})

interface Props {
  data: CVData
}

export function ClassicTemplate({ data }: Props) {
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || "Ho va Ten"}</Text>
          {personalInfo.headline && (
            <Text style={styles.headline}>{personalInfo.headline}</Text>
          )}
          <View style={styles.contactRow}>
            {personalInfo.email && (
              <Text style={styles.contact}>{personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contact}>{personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contact}>{personalInfo.location}</Text>
            )}
            {personalInfo.linkedIn && (
              <Text style={styles.contact}>{personalInfo.linkedIn}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View>
            <Text style={styles.sectionTitle}>GIOI THIEU</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>KINH NGHIEM LAM VIEC</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.expRow}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.expTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.expCompany}>
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </Text>
                  </View>
                  <Text style={styles.expDate}>
                    {exp.startDate} -{" "}
                    {exp.isCurrent ? "Hien tai" : exp.endDate || ""}
                  </Text>
                </View>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text style={styles.bulletDot}>*</Text>
                    <Text style={styles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>HOC VAN</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.expRow}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.expTitle}>{edu.institution}</Text>
                    <Text style={styles.expCompany}>
                      {edu.degree}
                      {edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ""}
                    </Text>
                    {edu.grade && (
                      <Text style={styles.expCompany}>GPA: {edu.grade}</Text>
                    )}
                  </View>
                  <Text style={styles.expDate}>
                    {edu.startDate} -{" "}
                    {edu.isCurrent ? "Hien tai" : edu.endDate || ""}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skillGroups.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>KY NANG</Text>
            {skillGroups.map((g) => (
              <View key={g.id} style={styles.skillRow}>
                <Text>
                  <Text style={styles.skillCategory}>{g.category}: </Text>
                  <Text style={styles.skillList}>
                    {g.skills.map((s) => s.name).join(" · ")}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>NGON NGU</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {languages.map((l) => (
                <Text key={l.id} style={{ fontSize: 8, marginRight: 16 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>{l.name}</Text>
                  {`: ${l.proficiency}`}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>CHUNG CHI</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold" }}>
                  {cert.name}
                </Text>
                {cert.issuer && (
                  <Text style={{ fontSize: 8, color: MUTED }}>
                    {cert.issuer}
                    {cert.issueDate ? ` · ${cert.issueDate}` : ""}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
