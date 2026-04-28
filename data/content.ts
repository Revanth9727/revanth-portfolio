// Single source of truth for portfolio content.
// Edit this file to update the site.

export const profile = {
  name: "Revanth Gollapudi",
  title: "AI Architect / Senior GenAI Engineer",
  email: "gollapudi.off@gmail.com",
  linkedin: "https://www.linkedin.com/in/revanth-gollapudi-45935218a/",
  github: "https://github.com/Revanth980727",
  github2: "https://github.com/Revanth9727",
  resume: "/resume.pdf",
  summary:
    "I build and own production GenAI systems — RAG platforms, evaluation gates, model-routing pipelines, and secure enterprise deployments. Live systems serving 85K+ requests/day and 6,000+ employees, with measurable gains in latency, retrieval quality, and inference cost.",
};

export const stats = [
  { label: "req/day", value: "85K+" },
  { label: "users", value: "6,000" },
  { label: "SLA", value: "99.9%" },
  { label: "inference cost cut", value: "30%" },
  { label: "RAGAS faithfulness", value: "+0.12" },
];

export const experience = [
  {
    company: "CGI",
    role: "AI Architect",
    period: "Dec 2024 — Present",
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
  },
  {
    company: "CGI",
    role: "Data Engineer",
    period: "Jan 2023 — Dec 2024",
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
  },
  {
    company: "eKincare",
    role: "Data Engineer",
    period: "Aug 2020 — Jul 2021",
    items: [
      {
        title: "Pipeline Throughput · +40%",
        body: "Improved Kafka and Spark pipeline throughput by 40% through partitioning and parallelism tuning. Added schema validation and dead-letter handling to cut production failures.",
      },
      {
        title: "Application Stability · −15% Crashes",
        body: "Diagnosed root causes across recurring crash patterns and overhauled logging, monitoring, and alerting. Reduced crash rate by 15%.",
      },
    ],
    stack: ["Apache Kafka", "Apache Spark", "Python", "AWS"],
  },
];

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

export const projects = [
  {
    id: "raoc",
    name: "RAOC",
    tagline: "Remote Autonomous OS Controller",
    badge: "Agentic · macOS · Python",
    description:
      "Control your Mac from your phone via Telegram. Send a natural language command, a 6-agent pipeline builds and executes a plan — with mandatory tap-to-approve before anything runs.",
    bullets: [
      "**Intake** understands intent. **Discovery** finds files. **Planning** generates a step-by-step plan. **Execution** carries it out. **Verification** checks. **Reporter** sends proof.",
      "**Safety model:** approval enforced in code, not convention. Dangerous commands blocked. Every file backed up before writes. Workspace sandboxed at zone resolver level.",
      "303 passing tests · GitHub Actions CI · Pydantic v2 · macOS Keychain for secrets",
    ],
    stack: ["Python 3.12", "Claude API", "Telegram", "SQLite", "Pydantic v2"],
    url: "https://github.com/Revanth9727/RAOC",
  },
  {
    id: "bugfix-ai-pilot",
    name: "Bugfix AI Pilot",
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
    stack: ["Python", "GPT-4", "React", "FastAPI", "Docker", "JIRA API"],
    url: "https://github.com/Revanth980727/bugfix-ai-pilot",
  },
  {
    id: "llm-eval-harness",
    name: "LLM Eval Harness",
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
    url: "https://github.com/Revanth9727/LLM-Evaluation-Harness",
  },
];

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
  },
];
