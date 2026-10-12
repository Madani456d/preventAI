import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Heart, Search, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import atlas from "@/assets/health-map-atlas.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Health Atlas · Your health assessment" },
    { name: "description", content: "A calm space to reflect on your symptoms and daily wellbeing. Educational preventive healthcare prototype." },
    { property: "og:title", content: "Health Atlas · Your health assessment" },
    { property: "og:description", content: "Reflect on your health, one thoughtful step at a time." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const symptoms = [
  { name: "Headache", category: "General" }, { name: "Fatigue", category: "General" },
  { name: "Fever", category: "General" }, { name: "Cough", category: "General" },
  { name: "Dizziness", category: "General" }, { name: "Nausea", category: "General" },
  { name: "Back pain", category: "General" }, { name: "Stomach pain", category: "General" },
  { name: "Sleep problems", category: "General" }, { name: "Menstrual cramps", category: "Female" },
  { name: "Irregular periods", category: "Female" }, { name: "Excessive menstrual bleeding", category: "Female" },
  { name: "Pregnancy-related concerns", category: "Female" }, { name: "Urinary discomfort", category: "Male" },
  { name: "Reproductive health concerns", category: "Male" },
];
const steps = ["About you", "Symptoms", "Daily wellbeing", "Review"];
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid min-w-0 gap-2 text-sm font-medium">{label}{children}</label>;
}
function Index() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({ name: "", age: "", gender: "", height: "", weight: "", duration: "", severity: "Mild", description: "", sleep: "7", water: "6", activity: "Sometimes", stress: "Moderate", smoking: "No", alcohol: "No", diet: "", conditions: "", medications: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");
  const update = (key: string, value: string) => setData((prev) => ({ ...prev, [key]: value }));
  const input = (key: string, type = "text", placeholder = "", min?: number, max?: number) => <input className="journal-input" type={type} value={data[key]} placeholder={placeholder} min={min} max={max} required={["name", "age"].includes(key)} onChange={(e) => update(key, e.target.value)} />;
  const select = (key: string, options: string[]) => <select className="journal-input" value={data[key]} required={["gender", "duration"].includes(key)} onChange={(e) => update(key, e.target.value)}>{!data[key] && <option value="">Select an option</option>}{options.map((option) => <option key={option}>{option}</option>)}</select>;
  const next = (event: FormEvent) => {
    event.preventDefault();
    if (step === 1 && !selected.length) { setError("Please select at least one symptom."); return; }
    setError(""); setStep((prev) => Math.min(prev + 1, 3));
    document.getElementById("assessment-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return <main className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8 sm:pt-12">
    <div className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> A moment for your wellbeing</div>
    <div className="mb-10 grid gap-5 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
      <div className="min-w-0"><h1 id="assessment-title" className="scroll-mt-6 font-display text-4xl leading-tight sm:text-5xl">Your health, <span className="italic text-primary">a little clearer.</span></h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Let’s begin with you. Take a quiet moment to check in with your body and your everyday habits.</p></div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground md:justify-end"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" /><span>Your answers stay in this session.</span></div>
    </div>
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section className="min-w-0">
        <ol className="mb-9 grid grid-cols-4 border-b border-border pb-6" aria-label="Assessment progress">{steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className="min-w-0"><div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full text-xs ${index <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{index < step ? <Check className="h-4 w-4" /> : `0${index + 1}`}</div><span className={`block pr-2 text-xs leading-5 sm:text-sm ${index === step ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{label}</span></li>)}</ol>
        <form onSubmit={next}>
          <div className="mb-7 flex items-start gap-4"><span className="mt-1 font-mono text-xs text-primary">0{step + 1}</span><div><h2 className="font-display text-2xl sm:text-3xl">{["A little about you", "How are you feeling?", "The rhythm of your day", "Your health journal"][step]}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{["The basics, so your assessment starts with the right context.", "Choose the symptoms you’re experiencing right now.", "Small daily habits are part of the bigger picture.", "Take a moment to check your answers before you finish."][step]}</p></div></div>
          {step === 0 && <div className="grid gap-6 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Your name">{input("name", "text", "What should we call you?")}</Field></div><Field label="Age">{input("age", "number", "Years", 1, 120)}</Field><Field label="Gender">{select("gender", ["Female", "Male", "Other", "Prefer not to say"])}</Field><Field label="Height (cm) · optional">{input("height", "number", "e.g. 170", 30, 250)}</Field><Field label="Weight (kg) · optional">{input("weight", "number", "e.g. 65", 1, 400)}</Field></div>}
          {step === 1 && <div className="space-y-6"><div className="relative"><Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" /><input aria-label="Search symptoms" className="journal-input pl-10" placeholder="Search symptoms…" value={search} onChange={(e) => setSearch(e.target.value)} /></div><div className="flex flex-wrap gap-2" aria-label="Symptom categories">{["All", "General", "Female", "Male"].map((item) => <Button key={item} type="button" variant={category === item ? "secondary" : "ghost"} className="min-h-11" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Button>)}</div><div className="grid gap-3 sm:grid-cols-2">{symptoms.filter((s) => (category === "All" || category === s.category) && s.name.toLowerCase().includes(search.toLowerCase())).map((s) => <label key={s.name} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-3 py-3 text-sm ${selected.includes(s.name) ? "border-primary bg-accent" : "border-border bg-card"}`}><input className="h-4 w-4 shrink-0 accent-primary" type="checkbox" checked={selected.includes(s.name)} onChange={(e) => setSelected((prev) => e.target.checked ? [...prev, s.name] : prev.filter((name) => name !== s.name))} /><span className="min-w-0">{s.name}</span></label>)}</div>{!symptoms.some((s) => (category === "All" || category === s.category) && s.name.toLowerCase().includes(search.toLowerCase())) && <p className="text-sm text-muted-foreground">No matching symptoms. You can describe how you feel below.</p>}<p className="text-xs text-primary">{selected.length} selected</p><div className="grid gap-6 sm:grid-cols-2"><Field label="Symptom duration">{select("duration", ["Less than a day", "1–3 days", "4–7 days", "More than a week"])}</Field><Field label="Severity">{select("severity", ["Mild", "Moderate", "Severe"])}</Field></div><Field label="Anything else you’d like to share? · optional"><textarea className="journal-input min-h-28 resize-y" value={data["description"]} onChange={(e) => update("description", e.target.value)} placeholder="Describe how you’ve been feeling…" /></Field></div>}
          {step === 2 && <div className="grid gap-6 sm:grid-cols-2"><Field label="Sleep per night (hours)">{input("sleep", "number", "", 0, 24)}</Field><Field label="Water per day (glasses)">{input("water", "number", "", 0, 40)}</Field><Field label="Physical activity">{select("activity", ["Rarely", "Sometimes", "Most days"])}</Field><Field label="Stress level">{select("stress", ["Low", "Moderate", "High"])}</Field><Field label="Do you smoke?">{select("smoking", ["No", "Sometimes", "Yes"])}</Field><Field label="Do you drink alcohol?">{select("alcohol", ["No", "Sometimes", "Often"])}</Field><Field label="Diet · optional">{input("diet", "text", "Your usual eating habits")}</Field><Field label="Existing conditions · optional">{input("conditions", "text", "Any known health conditions")}</Field><div className="sm:col-span-2"><Field label="Medications · optional">{input("medications", "text", "Any current medications")}</Field></div></div>}
          {step === 3 && <div className="space-y-6"><dl className="divide-y divide-border">{[["About you", `${data["name"]}, ${data["age"]} years · ${data["gender"]}`], ["Symptoms", selected.join(", ")], ["Duration & severity", `${data["duration"]} · ${data["severity"]}`], ["Daily wellbeing", `${data["sleep"]} hours of sleep · ${data["water"]} glasses of water`], ["Activity & stress", `${data["activity"]} activity · ${data["stress"]} stress`]].map(([label, value]) => <div key={label} className="grid gap-2 py-4 sm:grid-cols-[160px_minmax(0,1fr)]"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="min-w-0 break-words text-sm leading-6">{value}</dd></div>)}</dl><p className="border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Your answers are ready to review. This screen does not yet generate health recommendations or save assessments.</p></div>}
          {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
          <div className="mt-9 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border pt-6"><div>{step > 0 ? <Button type="button" variant="ghost" className="min-h-12 px-2" onClick={() => { setStep((prev) => prev - 1); setError(""); }}><ArrowLeft /> Back</Button> : <span className="text-xs text-muted-foreground">Step 1 of 4</span>}</div>{step < 3 && <Button type="submit" className="min-h-12 px-6">Continue <ArrowRight /></Button>}{step === 3 && <span className="flex items-center gap-2 text-sm text-primary"><Check className="h-4 w-4" /> Review complete</span>}</div>
        </form>
      </section>
      <aside className="hidden min-w-0 lg:block"><img src={atlas} alt="A soft, illustrated health atlas" className="aspect-[4/3] w-full rounded-md object-cover" /><div className="mt-7 flex items-center gap-2 text-primary"><Leaf className="h-4 w-4" /><span className="text-xs uppercase tracking-widest">A thoughtful beginning</span></div><h3 className="mt-3 font-display text-2xl leading-8">Good health starts<br />with paying attention.</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">There’s no perfect answer. Just share what feels true for you today.</p><div className="mt-8 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">If you have chest pain, severe breathing difficulty, or other emergency symptoms, seek immediate medical care.</div></aside>
    </div>
    <div className="mt-12 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 border-t border-border pt-6 text-xs leading-6 text-muted-foreground"><Heart className="mt-1 h-4 w-4 shrink-0 text-primary" /><p>This AI-based system is an educational prototype and does not provide medical diagnosis or replace professional medical advice. For emergency symptoms, seek immediate professional care.</p></div>
  </main>;
}
