// Both Recruiter Mode and Dev Mode read from this file.
// Edit here to update everywhere.

export const profile = {
  name: "Revanth Gollapudi",
  title: "AI Architect",
  email: "gollapudi.off@gmail.com",
  linkedin: "https://www.linkedin.com/in/revanth-gollapudi-45935218a/",
  github: "https://github.com/Revanth980727",
  github2: "https://github.com/Revanth9727",
  resume: "/resume.pdf",
};

export const tagline = "I build AI systems that run in production.";

export const intro = `I architect, build, and own the AI systems that run inside large companies — RAG platforms, evaluation infrastructure, model-routing pipelines, and the deployment plumbing that keeps them up at 99.9%.`;

// Headline metrics shown near the top of recruiter mode.
export const stats = [
  { value: "85K", label: "requests / day" },
  { value: "6,000", label: "users served" },
  { value: "99.9%", label: "uptime" },
  { value: "−30%", label: "inference cost" },
  { value: "+0.12", label: "RAGAS faithfulness" },
];

// Experience — three roles, newest first.
export const experience = [
  {
    company: "CGI",
    role: "AI Architect",
    period: "Dec 2024 — Present",
<<<<<<< HEAD
    items: [
      {
        title: "Conversational AI Platform · AWS",
        body: "Architected and own a Kubernetes-based conversational AI platform on AWS EKS serving ~85K requests/day across 10+ agent workflows for 1,200 users. Lead a 5-person engineering team with full SLA accountability for the production environment.",
      },
      {
        title: "Azure HR RAG · Live for 6,000 Employees",
        body: "Sole architect on an end-to-end Azure RAG system for an HR Policy chatbot. Angular SPA, FastAPI on Container Apps, Azure AI Search (vector + BM25 + semantic reranker), GPT-4o on PTU, Document Intelligence, Entra ID/MFA, private VNet. Delivers <3s response time, ~40% cache hit rate, 99.9% uptime, with EU AI Act-aligned deployment documentation.",
      },
      {
        title: "Inference Cost · 30% Reduction",
        body: "Co-designed a complexity-based model router sending simple queries to Gemma/Mistral 8B and complex ones to GPT-4o. Cut monthly inference spend from $15K to $10.5K with no quality degradation.",
      },
      {
        title: "Fine-tuning · 45% → 30% Hallucination Rate",
        body: "Fine-tuned Llama 3 via LoRA/PEFT with DPO on 500+ human-labeled preference pairs. Reduced measured hallucination rate from 45% to 30% across production workloads.",
      },
      {
        title: "EvalOps · Regression Gate in CI",
        body: "Built a full EvalOps pipeline — groundedness rubrics, golden datasets, automated RAGAS scoring, OpenTelemetry retrieval tracing — as mandatory CI gates before every model update. No known regressions have reached production undetected since rollout.",
      },
      {
        title: "Vehicle AI Inspection · Ryder Systems (Fortune 500)",
        body: "Lead engineer on an AI-powered vehicle inspection system replacing manual walk-around inspections with a fully automated pipeline processing 10,000+ vehicles/month at ~$0.01/image. Funded by a $93.9K Microsoft ECIF grant. Started with a YOLOv8 model on 10,000 labeled images (85–89% accuracy), then drove a strategic pivot to GPT-4o Vision — recognising the generative model's zero-shot damage understanding would outperform a task-specific detector. Built a two-pass pipeline: OpenCV blur detection pre-filters frames, then GPT-4o Vision runs a 15-point damage assessment with Pass/Fail/N-A verdicts. Deployed on Azure Functions, Blob Storage, Cosmos DB, and Azure OpenAI.",
      },
    ],
    stack: [
      "AWS EKS", "Azure Container Apps", "Azure AI Search", "GPT-4o PTU",
      "GPT-4o Vision", "YOLOv8", "OpenCV", "Azure Functions", "Cosmos DB",
      "Llama 3", "LoRA/PEFT", "DPO", "RAGAS", "OpenTelemetry", "LangGraph", "Bicep",
    ],
=======
    location: "Remote",
    story: `Where I am now. The work splits roughly into three buckets: building the platforms that host AI systems, making sure those systems give correct answers, and keeping the costs sane.`,
    highlights: [
      {
        title: "HR Assistant · 6,000 employees",
        body: "Sole architect on an end-to-end Azure RAG system for an HR Policy chatbot. Hybrid retrieval (vector + BM25 + semantic reranker), GPT-4o on PTU, Document Intelligence, Entra ID/MFA, private VNet. <3s response, ~40% cache hit rate, 99.9% uptime, EU AI Act-aligned.",
      },
      {
        title: "Conversational AI Platform · 85K req/day",
        body: "Architected and own a Kubernetes-based platform on AWS EKS serving ~85K requests/day across 10+ agent workflows for 1,200 users. Lead a 5-person team with full SLA accountability.",
      },
      {
        title: "Inference cost · −30%",
        body: "Co-designed a complexity-based model router sending simple queries to Gemma/Mistral 8B and complex ones to GPT-4o. Cut monthly inference spend from $15K to $10.5K with no quality degradation.",
      },
      {
        title: "Hallucination · 45% → 30%",
        body: "Fine-tuned Llama 3 via LoRA/PEFT with DPO on 500+ human-labeled preference pairs. Reduced measured hallucination rate from 45% to 30% across production workloads.",
      },
      {
        title: "EvalOps · regression gate in CI",
        body: "Built a full EvalOps pipeline — groundedness rubrics, golden datasets, automated RAGAS scoring, OpenTelemetry retrieval tracing — as a mandatory CI gate before every model update. No quality regressions have reached production undetected since rollout.",
      },
      {
        title: "Vehicle AI Inspection · Ryder",
        body: "Lead engineer on an AI-powered vehicle inspection system replacing manual walk-around inspections — 10,000+ vehicles/month at ~$0.01/image. Funded by a $93.9K Microsoft ECIF grant. Drove the strategic pivot from a YOLOv8 model to GPT-4o Vision for zero-shot damage understanding.",
      },
    ],
    stack: ["AWS EKS", "Azure", "GPT-4o PTU", "Llama 3", "LoRA/PEFT", "DPO", "RAGAS", "OpenTelemetry", "LangGraph", "Bicep"],
>>>>>>> 41d628e (Updates)
  },
  {
    company: "CGI",
    role: "Data Engineer",
    period: "Jan 2023 — Dec 2024",
<<<<<<< HEAD
    items: [
      {
        title: "Retrieval Quality · 0.62 → 0.74 Faithfulness",
        body: "Tuned hybrid retrieval (BM25 + pgvector + cross-encoder reranking) with query rewriting optimisations. Lifted RAGAS faithfulness from 0.62 to 0.74 on a 500-question eval set (+0.12 absolute, +19% relative) with no generation model changes.",
      },
      {
        title: "Eval-gated CI/CD · 20% of Bad Updates Blocked",
        body: "Built an eval-gated CI/CD pipeline using LLM-as-judge with rubric scoring as a mandatory release gate. Blocked ~20% of regressive model updates before production.",
      },
      {
        title: "ML Pipelines · 72h → 24h",
        body: "Rebuilt Kubernetes ML training pipelines for ~6TB document classification. Cut training-to-deployment cycle from 72 hours to under 24 hours — 3× faster iteration.",
      },
      {
        title: "Observability · Hours to Minutes MTTD",
        body: "Implemented CloudWatch + OpenTelemetry instrumentation with drift detection and alerting. Reduced mean time to diagnose failures from hours to minutes.",
      },
    ],
    stack: ["BM25", "pgvector", "Cross-encoder", "RAGAS", "LLM-as-judge", "Kubernetes", "CloudWatch", "OpenTelemetry"],
=======
    location: "Remote",
    story: `Two years building the foundations: training pipelines, retrieval systems, evaluation tools — the infrastructure my later architecture work would rely on.`,
    highlights: [
      {
        title: "Retrieval faithfulness · 0.62 → 0.74",
        body: "Tuned a hybrid retrieval system (BM25 + vector + cross-encoder reranking) with query rewriting. Lifted RAGAS faithfulness from 0.62 to 0.74 on a 500-question eval set — a +0.12 absolute jump on a hard-to-move metric.",
      },
      {
        title: "20% of bad updates blocked",
        body: "Built a CI/CD pipeline using LLM-as-judge with rubric scoring as a mandatory release gate. Caught about a fifth of regressive model updates before they reached users.",
      },
      {
        title: "ML pipeline cycle · 72h → 24h",
        body: "Rebuilt Kubernetes ML training pipelines for a 6TB document classification workload. Cut the train-to-deploy cycle from three days to under one — a 3× faster iteration loop.",
      },
    ],
    stack: ["BM25", "pgvector", "Cross-encoder", "RAGAS", "LLM-as-judge", "Kubernetes", "CloudWatch"],
>>>>>>> 41d628e (Updates)
  },
  {
    company: "eKincare",
    role: "Data Engineer",
    period: "Aug 2020 — Jul 2021",
<<<<<<< HEAD
    items: [
      {
        title: "Pipeline Throughput · +40%",
        body: "Improved Kafka and Spark pipeline throughput by 40% through partitioning and parallelism tuning. Added schema validation and dead-letter handling to cut production failures.",
      },
      {
        title: "Application Stability · −15% Crashes",
        body: "Diagnosed root causes across recurring crash patterns and overhauled logging, monitoring, and alerting. Reduced crash rate by 15%.",
=======
    location: "Hyderabad, India",
    story: `My first proper engineering job — at a healthcare startup. Mostly streaming data pipelines, dead-letter queues, and learning what production really means.`,
    highlights: [
      {
        title: "+40% pipeline throughput",
        body: "Tuned partitioning and parallelism on the Kafka and Spark setup. Added schema validation and dead-letter handling so a single bad record couldn't take down the whole pipeline.",
      },
      {
        title: "−15% application crashes",
        body: "Tracked down recurring failure patterns and rebuilt the logging, monitoring, and alerting. Boring work that made everyone's life easier.",
>>>>>>> 41d628e (Updates)
      },
    ],
    stack: ["Apache Kafka", "Apache Spark", "Python", "AWS"],
  },
];

<<<<<<< HEAD
export const skills: Record<string, string[]> = {
  "LLMs & GenAI": ["Llama 3", "LoRA/PEFT", "DPO", "RLHF", "LangGraph", "Model Routing", "NL-to-SQL"],
  "RAG & Retrieval": ["BM25", "pgvector", "Azure AI Search", "Cross-encoder", "Query Rewriting", "Document Intelligence"],
  "Computer Vision": ["GPT-4o Vision", "YOLOv8", "OpenCV", "Object Detection", "Damage Classification", "Confidence Scoring"],
  "Eval & Observability": ["RAGAS", "DeepEval", "LLM-as-Judge", "Golden Datasets", "Regression Gates", "OpenTelemetry", "CloudWatch"],
  "Cloud & Infra": ["AWS EKS", "Azure Container Apps", "Azure OpenAI PTU", "Key Vault", "Entra ID", "Kubernetes", "Docker", "Terraform", "Bicep", "GitHub Actions"],
  "Compliance": ["EU AI Act", "Responsible AI", "Deployment Docs"],
  "Languages": ["Python", "PyTorch", "FastAPI", "React/Next.js", "Angular", "Go"],
};

export const education = [
  {
    period: "2021 — 2022",
    degree: "Master of Science · Applied Engineering",
    school: "University of Colorado Boulder",
  },
  {
    period: "2016 — 2020",
    degree: "Bachelor of Technology · Mechanical Engineering",
    school: "PES University",
  },
];

=======
// Skill categories for the dev-mode skills.yaml view.
export const skills: Record<string, string[]> = {
  "LLMs & GenAI": ["Llama 3", "LoRA/PEFT", "DPO", "RLHF", "LangGraph", "Model Routing", "NL-to-SQL"],
  "RAG & Retrieval": ["BM25", "pgvector", "Azure AI Search", "Cross-encoder", "Query Rewriting", "Document Intelligence"],
  "Computer Vision": ["GPT-4o Vision", "YOLOv8", "OpenCV", "Object Detection", "Damage Classification"],
  "Eval & Observability": ["RAGAS", "DeepEval", "LLM-as-Judge", "Golden Datasets", "OpenTelemetry", "CloudWatch"],
  "Cloud & Infra": ["AWS EKS", "Azure Container Apps", "Azure OpenAI PTU", "Kubernetes", "Docker", "Terraform", "Bicep"],
  "Compliance": ["EU AI Act", "Responsible AI", "Deployment Documentation"],
  "Languages": ["Python", "PyTorch", "FastAPI", "React/Next.js", "Angular", "Go"],
};

>>>>>>> 41d628e (Updates)
export const projects = [
  {
    id: "raoc",
    name: "RAOC",
<<<<<<< HEAD
    tagline: "Remote Autonomous OS Controller",
    badge: "Agentic · macOS · Python",
    description:
      "Control your Mac from your phone via Telegram. Send a natural language command, a 6-agent pipeline builds and executes a plan — with mandatory tap-to-approve before anything runs.",
    bullets: [
      "**Intake** understands intent. **Discovery** finds files. **Planning** generates a step-by-step plan. **Execution** carries it out. **Verification** checks. **Reporter** sends proof.",
      "**Safety model:** approval enforced in code, not convention. Dangerous commands blocked. Every file backed up before writes. Workspace sandboxed at zone resolver level.",
      "303 passing tests · GitHub Actions CI · Pydantic v2 · macOS Keychain for secrets",
    ],
=======
    subtitle: "Remote control your Mac from your phone",
    story: `I built this because I kept needing to grab files from my home Mac while I was out. RAOC lets you send a natural-language command from Telegram — "find the photos from last weekend and email them to my mom" — and a six-agent pipeline figures out the plan, asks you to approve it, then runs it. The interesting design problem was safety: every plan needs tap-to-approve, dangerous commands are blocked at the code level, and every file is backed up before being touched. 303 tests in CI to keep it that way.`,
>>>>>>> 41d628e (Updates)
    stack: ["Python 3.12", "Claude API", "Telegram", "SQLite", "Pydantic v2"],
    url: "https://github.com/Revanth9727/RAOC",
  },
  {
    id: "bugfix-ai-pilot",
    name: "Bugfix AI Pilot",
<<<<<<< HEAD
    tagline: "Autonomous Bug Resolution",
    badge: "Multi-agent · Full-stack",
    description:
      "Takes a JIRA ticket ID and — without any human involvement — reads the ticket, generates a GPT-4 code fix, validates with tests, and opens a GitHub PR. 233 commits.",
    bullets: [
      "**Planner agent** reads the JIRA ticket and identifies the affected code and root cause.",
      "**Developer agent** generates the fix with full codebase context awareness.",
      "**QA agent** runs tests against the fix. Failed results loop back to Developer (up to 3 cycles).",
      "**Communicator agent** comments on JIRA and opens a GitHub PR with diff and test results.",
    ],
=======
    subtitle: "An AI that resolves bug tickets without human help",
    story: `Hand it a JIRA ticket ID and walk away. A planner agent reads the ticket and identifies the affected code. A developer agent generates the fix. A QA agent runs the tests — and if they fail, loops back to the developer for up to three tries. When it works, a communicator agent comments on JIRA and opens a GitHub PR.`,
>>>>>>> 41d628e (Updates)
    stack: ["Python", "GPT-4", "React", "FastAPI", "Docker", "JIRA API"],
    url: "https://github.com/Revanth980727/bugfix-ai-pilot",
  },
  {
    id: "llm-eval-harness",
    name: "LLM Eval Harness",
<<<<<<< HEAD
    tagline: "CI-ready A/B Eval Framework",
    badge: "EvalOps · Python · CI/CD",
    description:
      "A production-ready framework for A/B evaluating LLM changes with statistical rigour and CI integration — making evaluation a real deployment gate, not a manual check.",
    bullets: [
      "**Hard checks first:** Schema, citations, format — deterministic, zero cost. Only passing cases proceed to LLM judge.",
      "**LLM-as-judge with calibration:** Rubric pairwise scoring with agreement, flip rate, and order bias measurement.",
      "**95% bootstrap CI** on win rate. Per-tag breakdown. Refusal and format pass rates tracked separately.",
      "**Quality gates:** Configurable thresholds. Exit code 2 on failure blocks CI pipeline.",
    ],
    stack: ["Python", "OpenAI", "RAGAS", "GitHub Actions", "pytest"],
=======
    subtitle: "A serious framework for testing AI changes before you ship them",
    story: `Most teams test their AI by eyeballing examples — that doesn't catch regressions. This framework does it properly: deterministic checks first (format, citations), then an LLM-as-judge with rubric scoring, then 95% bootstrap confidence intervals on the win rate. If quality drops below threshold, the build fails with exit code 2.`,
    stack: ["Python", "OpenAI API", "RAGAS", "GitHub Actions", "pytest"],
>>>>>>> 41d628e (Updates)
    url: "https://github.com/Revanth9727/LLM-Evaluation-Harness",
  },
];

<<<<<<< HEAD
// Knowledge base used by the RAG playground (deterministic mock retrieval).
export const ragCorpus = [
  {
    id: "azure-rag",
    title: "Azure HR RAG · 6,000 employees",
    text: "Sole architect on an end-to-end Azure RAG system. Hybrid retrieval (vector + BM25 + semantic reranker), GPT-4o PTU, Document Intelligence, Entra ID/MFA, private VNet. Delivers <3s response, ~40% cache hit rate, 99.9% uptime.",
    keywords: ["rag", "azure", "hr", "retrieval", "uptime", "cache", "production", "enterprise", "6000", "employees"],
  },
  {
    id: "aws-platform",
    title: "Conversational AI Platform · AWS EKS",
    text: "Kubernetes-based conversational AI platform on AWS EKS. ~85K requests/day across 10+ agent workflows for 1,200 users. 5-person engineering team, full SLA accountability.",
    keywords: ["aws", "eks", "kubernetes", "platform", "conversational", "scale", "85k", "requests", "agent", "workflow"],
  },
  {
    id: "model-router",
    title: "Inference Cost · 30% Reduction",
    text: "Complexity-based model router sending simple queries to Gemma/Mistral 8B and complex ones to GPT-4o. Cut monthly inference spend from $15K to $10.5K with no quality degradation.",
    keywords: ["cost", "inference", "router", "routing", "model", "cheap", "expensive", "gemma", "mistral", "gpt-4o", "savings", "30"],
  },
  {
    id: "evalops",
    title: "EvalOps · Regression Gate",
    text: "Full EvalOps pipeline: groundedness rubrics, golden datasets, automated RAGAS scoring, OpenTelemetry retrieval tracing. Mandatory CI gates before every model update.",
    keywords: ["eval", "evalops", "ragas", "regression", "ci", "gate", "groundedness", "rubric", "golden", "dataset", "quality"],
  },
  {
    id: "fine-tuning",
    title: "Fine-tuning · Llama 3 + DPO",
    text: "Fine-tuned Llama 3 via LoRA/PEFT with DPO on 500+ human-labeled preference pairs. Reduced measured hallucination rate from 45% to 30% across production workloads.",
    keywords: ["fine-tune", "fine-tuning", "llama", "dpo", "lora", "peft", "hallucination", "preference", "training"],
  },
  {
    id: "retrieval-quality",
    title: "Retrieval Quality · 0.62 → 0.74",
    text: "Hybrid retrieval (BM25 + pgvector + cross-encoder) with query rewriting. Lifted RAGAS faithfulness from 0.62 to 0.74 on a 500-question eval set (+0.12 absolute, +19% relative).",
    keywords: ["retrieval", "bm25", "pgvector", "cross-encoder", "rerank", "faithfulness", "ragas", "0.62", "0.74", "hybrid"],
  },
  {
    id: "ryder",
    title: "Vehicle AI Inspection · Ryder",
    text: "AI-powered vehicle inspection processing 10,000+ vehicles/month at ~$0.01/image. Pivoted from YOLOv8 to GPT-4o Vision for zero-shot damage understanding. Two-pass pipeline with OpenCV blur detection.",
    keywords: ["ryder", "vehicle", "inspection", "computer vision", "yolov8", "gpt-4o vision", "damage", "opencv", "fortune 500"],
=======
export const education = [
  {
    degree: "M.S. Applied Engineering",
    school: "University of Colorado Boulder",
    period: "2021 — 2022",
  },
  {
    degree: "B.Tech. Mechanical Engineering",
    school: "PES University",
    period: "2016 — 2020",
  },
];

export const lookingFor = `Senior or lead AI engineering roles at teams that are serious about reliability, cost, and measurable quality — not just shipping demos. Especially interested in companies building AI products where the stakes are real: enterprise tools, healthcare, finance, infrastructure.`;

// Knowledge base for the RAG demo.
export const ragCorpus = [
  {
    id: "azure-rag",
    title: "Azure HR Assistant for 6,000 employees",
    text: "Built an HR assistant on Azure with hybrid search (vector + BM25 + semantic ranking), GPT-4o, and enterprise-grade security. Responds in under three seconds with about 40% cache hits and 99.9% uptime.",
    keywords: ["rag", "azure", "hr", "retrieval", "uptime", "cache", "production", "enterprise", "6000", "employees", "policy", "chatbot"],
  },
  {
    id: "aws-platform",
    title: "Conversational AI Platform on AWS",
    text: "Kubernetes-based AI platform on AWS handling about 85,000 requests per day across ten different workflows for 1,200 users. I lead a five-person team and own the production SLA.",
    keywords: ["aws", "eks", "kubernetes", "platform", "conversational", "scale", "85k", "requests", "agent", "workflow", "team", "sla"],
  },
  {
    id: "model-router",
    title: "Cutting inference cost by 30%",
    text: "Designed a router that sends simple queries to smaller models like Gemma and Mistral, and complex ones to GPT-4o. Cut our monthly inference spend from $15K to $10.5K with no quality degradation.",
    keywords: ["cost", "inference", "router", "routing", "model", "cheap", "expensive", "gemma", "mistral", "gpt-4o", "savings", "30", "bill", "money"],
  },
  {
    id: "evalops",
    title: "Catching AI regressions before production",
    text: "Built an evaluation pipeline with groundedness rubrics, golden test datasets, automated scoring, and end-to-end tracing. It runs as a mandatory check before any model update goes live.",
    keywords: ["eval", "evalops", "ragas", "regression", "ci", "gate", "groundedness", "rubric", "golden", "dataset", "quality", "test"],
  },
  {
    id: "fine-tuning",
    title: "Fine-tuning Llama 3 to reduce hallucinations",
    text: "Fine-tuned Llama 3 with LoRA and DPO on 500+ hand-labeled preference pairs. Brought the hallucination rate down from 45% to 30% on real production workloads.",
    keywords: ["fine-tune", "fine-tuning", "llama", "dpo", "lora", "peft", "hallucination", "preference", "training", "make up", "wrong"],
  },
  {
    id: "retrieval-quality",
    title: "Improving retrieval quality from 0.62 to 0.74",
    text: "Tuned a hybrid retrieval system (keyword search plus vector search plus a cross-encoder reranker) with query rewriting. Pushed the faithfulness score from 0.62 to 0.74 on a 500-question evaluation set.",
    keywords: ["retrieval", "bm25", "pgvector", "cross-encoder", "rerank", "faithfulness", "ragas", "0.62", "0.74", "hybrid", "search", "find"],
  },
  {
    id: "ryder",
    title: "AI vehicle inspection for Ryder",
    text: "Lead engineer on an AI-powered vehicle inspection system processing 10,000+ vehicles a month at about a penny per image. We pivoted from a traditional computer vision model to GPT-4o Vision and got better results with zero-shot damage understanding.",
    keywords: ["ryder", "vehicle", "inspection", "computer vision", "yolov8", "gpt-4o vision", "damage", "opencv", "fortune 500", "image", "photo"],
>>>>>>> 41d628e (Updates)
  },
];
