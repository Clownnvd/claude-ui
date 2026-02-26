import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { CVData } from "@/types/cv"

const BLUE = "#0EA5E9"
const TEXT = "#0F172A"
const MUTED = "#64748B"

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, color: TEXT, padding: 0, lineHeight: 1.4 },
  accentBar: { height: 4, backgroundColor: BLUE },
  content: { padding: 40 },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold" },
  headline: { fontSize: 11, color: BLUE, marginTop: 4 },
  contacts: { flexDirection: "row", flexWrap: "wrap", marginTop: 6, marginBottom: 16 },
  contact: { fontSize: 8, color: MUTED, marginRight: 16 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: BLUE,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginTop: 14,
    marginBottom: 8,
  },
  divider: { height: 1, backgroundColor: "#E2E8F0", marginBottom: 8 },
  summary: { fontSize: 8.5, lineHeight: 1.6, borderLeft: `3 solid ${BLUE}`, paddingLeft: 8, color: TEXT },
  expTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  expSub: { fontSize: 8, color: MUTED, marginTop: 1 },
  bullet: { flexDirection: "row", marginTop: 2 },
  bulletDot: { width: 10, color: BLUE, fontSize: 8 },
  bulletText: { flex: 1, fontSize: 8 },
})

export function ModernTemplate({ data }: { data: CVData }) {
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
        <View style={styles.accentBar} />
        <View style={styles.content}>
          <Text style={styles.name}>{personalInfo.fullName || "Ho va Ten"}</Text>
          {personalInfo.headline && (
            <Text style={styles.headline}>{personalInfo.headline}</Text>
          )}
          <View style={styles.contacts}>
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

          {personalInfo.summary && (
            <View>
              <Text style={styles.sectionTitle}>PROFILE</Text>
              <View style={styles.divider} />
              <Text style={styles.summary}>{personalInfo.summary}</Text>
            </View>
          )}

          {experience.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>KINH NGHIEM</Text>
              <View style={styles.divider} />
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.expTitle}>{exp.jobTitle}</Text>
                    <Text style={{ fontSize: 8, color: MUTED }}>
                      {exp.startDate} - {exp.isCurrent ? "Nay" : exp.endDate || ""}
                    </Text>
                  </View>
                  <Text style={styles.expSub}>
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
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
            <View>
              <Text style={styles.sectionTitle}>HOC VAN</Text>
              <View style={styles.divider} />
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.expTitle}>{edu.institution}</Text>
                    <Text style={{ fontSize: 8, color: MUTED }}>
                      {edu.startDate}-{edu.endDate || "Nay"}
                    </Text>
                  </View>
                  <Text style={styles.expSub}>
                    {edu.degree}
                    {edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}
                    {edu.grade ? ` · GPA: ${edu.grade}` : ""}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {skillGroups.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>KY NANG</Text>
              <View style={styles.divider} />
              {skillGroups.map((g) => (
                <View key={g.id} style={{ marginBottom: 3 }}>
                  <Text style={{ fontSize: 8 }}>
                    <Text style={{ fontFamily: "Helvetica-Bold" }}>
                      {g.category}:{" "}
                    </Text>
                    <Text style={{ color: MUTED }}>
                      {g.skills.map((s) => s.name).join(" · ")}
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          )}

          {languages.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>NGON NGU</Text>
              <View style={styles.divider} />
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

          {certifications.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>CHUNG CHI</Text>
              <View style={styles.divider} />
              {certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 5 }}>
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
        </View>
      </Page>
    </Document>
  )
}
