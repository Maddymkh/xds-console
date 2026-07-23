"use client";

import { useState } from "react";
type Vertical = {
  id: number;
  name: string;
};
type Props = {
  verticals: Vertical[];

  onClose: () => void;

  onSave: (
    name: string,
    rollNumber: string,
    email: string,
    phone: string,
    course: string,
    year: string,
    selectedVerticals: number[]
  ) => Promise<void>;
};
  
export default function AddParticipantModal({
  verticals,
  onClose,
  
  onSave,
}: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
const [phone, setPhone] = useState("");
const [course, setCourse] = useState("");
const [year, setYear] = useState("");
const [selectedVerticals, setSelectedVerticals] = useState<number[]>([]);
const [rollNumber, setRollNumber] = useState("");
const [saving, setSaving] = useState(false);
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
  
        <div className="]w-[700px]
max-h-[90vh]
overflow-y-auto  rounded-2xl bg-zinc-900 p-6">
  
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            Add Participant
          </h2>
  
          <p className="mt-2 text-[var(--muted)]">
            Walk-in registration
          </p>
  
          <div className="mt-6 space-y-4">

  <input
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full rounded-xl border border-zinc-700 bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none"
  />

  <input
    placeholder="Roll Number"
    value={rollNumber}
    onChange={(e) => setRollNumber(e.target.value)}
    className="w-full rounded-xl border border-zinc-700 bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none"
  />

  <div className="grid grid-cols-2 gap-4">

    <select
      value={course}
      onChange={(e) => setCourse(e.target.value)}
      
  className="
    w-full
    rounded-xl
    border
    border-white/10
    bg-zinc-900
    text-[var(--text)]
    px-4
    py-3
  "

    >
      <option value="" disabled>
   Course
</option>
      <option
  className="bg-zinc-900 text-[var(--text)]"
>B.A. English</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.A. Bengali</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.A. Sociology</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.A. Political Science</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.A. in Humanities and Social Science</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Physics</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Chemistry</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Mathematics</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Statistics</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Computer Science</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Economics</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Microbiology</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Mass Communication and Videography</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Sc. Data Science</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Com. Morning</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.Com. Evening</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>B.M.S.</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Sc. Multimedia</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Sc. Biotechnology</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Com..</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.A. History</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.A. English</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.A. Bengali</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.A. Sociology</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.A. Political Science</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Sc. Economics</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Sc. Data Science</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Sc. Computer Science</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Sc. Physics</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Sc. Microbiology</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.Sc. Food and Nutrition</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>M.A. Education</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>Dip. in mol.med.microbio.</option>
      

    </select>

    <select
      value={year}
      onChange={(e) => setYear(e.target.value)}
      className="
      w-full
      rounded-xl
      border
      border-white/10
      bg-zinc-900
      text-[var(--text)]
      px-4
      py-3
    "
    >
     <option value="" disabled>
   Year
</option>
      <option
  className="bg-zinc-900 text-[var(--text)]"
>UG Sem I</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>UG Sem III</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>UG Sem V</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>UG Sem VII</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>PG Sem I</option>
<option
  className="bg-zinc-900 text-[var(--text)]"
>PG Sem III</option>

    </select>

  </div>

  <input
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full rounded-xl border border-zinc-700 bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none"
  />

  <input
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full rounded-xl border border-zinc-700 bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none"
  />

</div>
<div className="mt-6">

  <p className="mb-3 text-sm font-medium text-[var(--text)]">
    Interested Verticals
  </p>

  <div className="grid grid-cols-2 gap-3">

    {verticals.map((vertical) => (

      <label
        key={vertical.id}
        className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-[var(--bg)] px-3 py-2"
      >

        <input
          type="checkbox"
          checked={selectedVerticals.includes(vertical.id)}
          onChange={(e) => {

            if (e.target.checked) {
              setSelectedVerticals([
                ...selectedVerticals,
                vertical.id,
              ]);
            } else {
              setSelectedVerticals(
                selectedVerticals.filter(
                  (id) => id !== vertical.id
                )
              );
            }

          }}
        />

        <span className="text-sm text-[var(--text)]">
          {vertical.name}
        </span>

      </label>

    ))}

  </div>

</div>
  
          <div className="mt-6 flex justify-end gap-3">
  
            <button
              onClick={onClose}
              className="rounded-xl bg-zinc-800 px-5 py-2 text-[var(--text)]"
            >
              Cancel
            </button>
  
            <button
  disabled={saving}
  onClick={async () => {
    if (!/^\d{10}$/.test(phone)) {
      console.error("Phone number must contain exactly 10 digits.");
      return;
    }
  
    if (
      !name ||
      !rollNumber ||
      !email ||
      !phone ||
      !course ||
      !year
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (selectedVerticals.length === 0) {
      alert("Please select at least one interested vertical.");
      return;
    }
  
    setSaving(true);
  
    try {
      await onSave(
        name,
        rollNumber,
        email,
        phone,
        course,
        year,
        selectedVerticals
      );
    } finally {
      setSaving(false);
    }
  }}
  className="rounded-xl bg-[var(--accent)] px-5 py-2 text-black disabled:opacity-50"
>
  {saving ? "Saving..." : "Save"}
</button>
          </div>
  
        </div>
  
      </div>
    );
  }