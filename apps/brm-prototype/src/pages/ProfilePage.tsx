import { useNavigate } from "react-router-dom";
import { usePrototypeStore } from "../state/usePrototypeStore";
import type { StudentProfile, DegreeLevel } from "../domain/types";
export default function ProfilePage() {
  const profile = usePrototypeStore((s) => s.profile);
  const setProfile = usePrototypeStore((s) => s.setProfile);
  const nav = useNavigate();
  const update = (k: keyof StudentProfile, v: string) => setProfile({ ...profile, [k]: v });
  return (
    <section className="panel">
      <span className="eyebrow">Step 1</span>
      <h2>Student profile</h2>
      <p>Only the minimum context needed to personalise the mentoring flow.</p>
      <div className="form-grid">
        <label>
          Degree level
          <select
            value={profile.degreeLevel}
            onChange={(e) => update("degreeLevel", e.target.value as DegreeLevel)}
          >
            {["MBA", "MSc", "DBA", "PhD", "Other"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Discipline
          <select value={profile.discipline} onChange={(e) => update("discipline", e.target.value)}>
            {[
              "Accounting",
              "Finance",
              "Marketing",
              "Management",
              "Human Resources",
              "Information Systems",
              "Operations",
              "Strategy",
              "Entrepreneurship",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Research experience
          <select
            value={profile.researchExperience}
            onChange={(e) => update("researchExperience", e.target.value)}
          >
            {["none", "limited", "moderate", "experienced"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="full">
          Professional or study context
          <textarea
            value={profile.professionalContext}
            onChange={(e) => update("professionalContext", e.target.value)}
            placeholder="Example: I work in retail operations and have access to store managers."
          />
        </label>
      </div>
      <div className="actions">
        <button className="button primary" onClick={() => nav("/idea")}>
          Continue
        </button>
      </div>
    </section>
  );
}
