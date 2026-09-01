export type Surface = "admin" | "sponsor";

export type AdminView =
  | "today"
  | "workload"
  | "census"
  | "brokerage"
  | "ingest"
  | "review"
  | "package"
  | "form5500"
  | "time"
  | "quality"
  | "config"
  | "replace";

export type Replaces =
  | "PensionPro"
  | "Excel tracker"
  | "Outlook queue"
  | "R: drive"
  | "FTW delivery"
  | "FTW 5500 UI"
  | "PlanSponsorLink"
  | "Stax-shaped census"
  | "Keep FTW tests"
  | "Keep doc provider";

export const TENANT = {
  name: "Cerberus Retirement",
  year: 2025,
  reviewer: "You",
  processing: "Congruent",
};

export const PLANS = [
  {
    id: "24719",
    client: "Halstead Outfitters",
    name: "Halstead Outfitters 401(k) PSP",
    type: "Combo 401(k) + CB",
    rk: "Schwab brokerage",
    lives: 18,
    assets: 2_184_600,
    portal: "need" as const,
    step: "Brokerage IGO",
    aging: 41,
    track: "credentialed" as const,
  },
  {
    id: "24513",
    client: "Northline Processing",
    name: "Northline 401(k) SH",
    type: "Safe harbor match",
    rk: "John Hancock",
    lives: 42,
    assets: 6_410_200,
    portal: "go" as const,
    step: "Review ARC",
    aging: 2,
    track: "junior-qc" as const,
  },
  {
    id: "25108",
    client: "Meridian Fertility",
    name: "Meridian Fertility 401(k)",
    type: "New comparability",
    rk: "Empower",
    lives: 9,
    assets: 1_102_400,
    portal: "need" as const,
    step: "Census returned",
    aging: 18,
    track: "credentialed" as const,
  },
  {
    id: "23881",
    client: "Calder & Rea LLP",
    name: "Calder & Rea 401(k)",
    type: "Safe harbor NE",
    rk: "American Funds RKD",
    lives: 6,
    assets: 812_050,
    portal: "go" as const,
    step: "Package ready",
    aging: 0,
    track: "junior-qc" as const,
  },
  {
    id: "22904",
    client: "Artisan Pattern Works",
    name: "Artisan 401(k)",
    type: "Profit sharing",
    rk: "Voya",
    lives: 27,
    assets: 3_441_900,
    portal: "go" as const,
    step: "PS confirm",
    aging: 67,
    track: "credentialed" as const,
  },
];

export const BROKERAGE_MONTHS = [
  { m: "Jan", ok: true },
  { m: "Feb", ok: true },
  { m: "Mar", ok: true },
  { m: "Apr", ok: true },
  { m: "May", ok: true },
  { m: "Jun", ok: true },
  { m: "Jul", ok: true },
  { m: "Aug", ok: true },
  { m: "Sep", ok: true },
  { m: "Oct", ok: true },
  { m: "Nov", ok: true },
  { m: "Dec", ok: false },
];

export const EMPLOYEES = [
  {
    id: "e1",
    name: "Dale Halstead",
    role: "Owner 100%",
    dob: "1971-04-12",
    doh: "1998-03-01",
    comp: 284200,
    deferral: 23500,
    match: 11368,
    hce: true,
    flags: [] as string[],
  },
  {
    id: "e2",
    name: "Maren Halstead",
    role: "Spouse / employee",
    dob: "1974-09-03",
    doh: "2009-06-15",
    comp: 62400,
    deferral: 12500,
    match: 2496,
    hce: true,
    flags: [] as string[],
  },
  {
    id: "e3",
    name: "Luis Ortega",
    role: "Shop lead",
    dob: "2024-11-02",
    doh: "2024-02-12",
    comp: 58120,
    deferral: 4200,
    match: 2324,
    hce: false,
    flags: ["Date of birth is after date of hire"] as string[],
  },
  {
    id: "e4",
    name: "Priya Shah",
    role: "Controller",
    dob: "1988-01-19",
    doh: "2019-08-05",
    comp: 118600,
    deferral: 23000,
    match: 4744,
    hce: false,
    flags: [] as string[],
  },
  {
    id: "e5",
    name: "Jonah Peck",
    role: "PT warehouse",
    dob: "1999-07-22",
    doh: "2023-04-17",
    comp: 18440,
    deferral: 21000,
    match: 0,
    hce: false,
    flags: ["Elective deferrals exceed compensation"] as string[],
  },
];

export const QUEUE = [
  {
    plan: "Halstead Outfitters",
    task: "Brokerage: Dec statement + deposit split",
    project: "Data collection",
    status: "Prepare",
    aging: 41,
    who: "You",
    priority: "high" as const,
  },
  {
    plan: "Meridian Fertility",
    task: "Census returned after ACP (K-1 vs W-2)",
    project: "Contributions and compliance",
    status: "Review",
    aging: 18,
    who: "You",
    priority: "high" as const,
  },
  {
    plan: "Northline Processing",
    task: "Review ARC · deposit recon",
    project: "Contributions and compliance",
    status: "Review",
    aging: 2,
    who: "You",
    priority: "norm" as const,
  },
  {
    plan: "Artisan Pattern Works",
    task: "Profit sharing confirm (on hold, not in My Tasks under PP)",
    project: "Annual admin",
    status: "Hold",
    aging: 67,
    who: "—",
    priority: "high" as const,
  },
  {
    plan: "Calder & Rea LLP",
    task: "QC package · SH nonelective",
    project: "Generate deliverables",
    status: "Finalize",
    aging: 0,
    who: "Congruent",
    priority: "norm" as const,
  },
];

export const FOLLOWUPS = [
  {
    due: "Overdue 6d",
    text: "Halstead: Dec Schwab still not in portal",
    source: "Brokerage",
  },
  {
    due: "Today",
    text: "Meridian: CPA to confirm K-1 compensation",
    source: "Census",
  },
  {
    due: "Thu",
    text: "Northline: walk deposit recon on calendar",
    source: "Package",
  },
];

export const RECON = [
  { src: "Pre-tax deferral", calc: 128_440, dep: 126_200, due: 2240 },
  { src: "Roth", calc: 18_600, dep: 18_600, due: 0 },
  { src: "Safe harbor match", calc: 41_280, dep: 39_100, due: 2180 },
  { src: "Profit sharing", calc: 0, dep: 0, due: 0 },
  { src: "Loan repayments", calc: 6_240, dep: 6_240, due: 0 },
];

export const TIME_ROWS = [
  { date: "08/31", plan: "Halstead Outfitters", step: "Brokerage parse", cat: "DC Admin", hrs: 1.6, bill: true },
  { date: "08/31", plan: "Meridian Fertility", step: "Census return", cat: "DC Admin", hrs: 2.4, bill: true },
  { date: "08/28", plan: "Northline Processing", step: "Review ARC", cat: "DC Admin", hrs: 0.4, bill: false },
  { date: "08/27", plan: "IntegriWard CB", step: "Actuary packet", cat: "CB Admin", hrs: 0.8, bill: true },
];

export const QC_ROWS = [
  {
    plan: "Livings-style demo: Halstead",
    step: "NDT and corrections",
    by: "Anusha R.",
    cat: "Data Error",
    note: "Brokerage deposits for Dale still show as 2025 accrual. $23,000 funded in 2024. Split is throwing gains and deposit recon.",
  },
  {
    plan: "Meridian Fertility",
    step: "Census in good order",
    by: "Lucy K.",
    cat: "Data Error",
    note: "K-1 compensation entered as W-2. Owner will have no W-2 in 2026 from this entity.",
  },
];

export const PIPELINE = [
  { id: "payroll", label: "Payroll", state: "go" as const, note: "ADP Run file · 26 periods" },
  { id: "rk", label: "Recordkeeper", state: "skip" as const, note: "Off. Brokerage plan." },
  { id: "brokerage", label: "Brokerage", state: "need" as const, note: "11/12 months · deposits $2,180 open" },
  { id: "census", label: "Census", state: "need" as const, note: "2 live edits still on sponsor" },
  { id: "calcs", label: "Calcs", state: "hold" as const, note: "FTW connected · will not run until green" },
  { id: "review", label: "Review ARC", state: "hold" as const, note: "Credentialed · combo" },
  { id: "package", label: "Package", state: "hold" as const, note: "Leads with recon, not a 34-page dump" },
  { id: "5500", label: "Form 5500", state: "hold" as const, note: "EFAST XML or pass to FTW" },
];

export const REPLACE_ROWS: {
  surface: string;
  today: string;
  cycle: string;
  tag: Replaces;
}[] = [
  {
    surface: "Where is the work",
    today: "PensionPro My Tasks (incomplete) + personal Excel + Outlook squeaky-wheel",
    cycle: "One queue with aging. Hold still visible. Assign from the report.",
    tag: "PensionPro",
  },
  {
    surface: "Statements received",
    today: "PP is binary. 12 Schwab PDFs live on the R: drive. Separate tracker for months.",
    cycle: "Month strip on the plan. Parse + allocate deposits to zero. Combo shares one account.",
    tag: "Excel tracker",
  },
  {
    surface: "Census in",
    today: "Email + PSL + India loads FTW. 70–80% of intake hours. Loop back after tests.",
    cycle: "~35 sponsor edits at the door. Post-test returns stay on the same census, not a new email.",
    tag: "Stax-shaped census",
  },
  {
    surface: "Who has the ball",
    today: "Email is the queue. India sometimes only updates PP.",
    cycle: "Portal red/green is the queue. Blast is a link. White-glove = they never turn it green.",
    tag: "Outlook queue",
  },
  {
    surface: "Tests / allocations",
    today: "India in FTW. Reviewer Excel-shadows. Combo allocations sit with the actuary.",
    cycle: "Results land in Review ARC. Engine can stay FTW until you turn Cycle tests on.",
    tag: "Keep FTW tests",
  },
  {
    surface: "The packet the client sees",
    today: "5–10 hr consult prep. 34 pages, no one reads. Recon buried.",
    cycle: "Package opens on exceptions (deposit recon, bond). Rest is appendix.",
    tag: "FTW delivery",
  },
  {
    surface: "5500",
    today: "FTW / Relius screens. Values re-keyed into buckets.",
    cycle: "Buckets from the year. EFAST XML, or hand the same payload to FTW.",
    tag: "FTW 5500 UI",
  },
  {
    surface: "Time → invoice",
    today: "Hours worked ≠ billed. Yellow extra-billing cells in Excel.",
    cycle: "Hours on the step. Invoice on a button. Extra census / recon flags as billable.",
    tag: "PensionPro",
  },
  {
    surface: "Plan documents",
    today: "FTW / ASC piggyback, notices, SPD on the R: drive.",
    cycle: "API a pre-approved provider at signup. Do not sponsor your own.",
    tag: "Keep doc provider",
  },
  {
    surface: "Files",
    today: "R:\\Client Admin\\… with inconsistent names.",
    cycle: "Portal Files is the year folder. SPD, beneficiary, trust post after setup.",
    tag: "R: drive",
  },
];
