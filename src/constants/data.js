export const content = {
  hero: {
    title: "Md Hasan Raza",
    subtitle: "Software Engineer | Backend & ML Systems",
    tagline: "Building reliable backend systems, data pipelines, and scalable ML infrastructure.",
    focus: "Software engineering, reliability, and data-driven applications.",
    selfDriven: "Independently learned backend engineering and ML systems through hands-on projects involving data pipelines, authentication, and containerized deployments."
  },
  education: {
    institute: "Indian Institute of Technology (IIT), Mandi",
    location: "Himachal Pradesh, India",
    degree: "Bachelor of Technology (B.Tech)",
    period: "Aug 2024 – Present",
    coursework: ["Machine Learning (Mathematical Foundations)", "Linear Algebra", "Probability and Statistics"]
  },
  projects: [
    {
      title: "Hospital Automation System",
      tech: "FastAPI • React • PostgreSQL • Docker • LLMs (Llama-3)",
      desc: "Autonomous hospital management system enabling natural-language clinical operations and intelligent bed allocation.",
      details: {
        problem: "Manual hospital operations struggle with real-time bed allocation, patient transfers, and operational visibility under high load.",
        solution: "Built an autonomous AI agent that executes hospital operations via natural language. Implemented severity-driven ICU vs. General bed reallocation and a real-time operational dashboard.",
        stack: [
          "FastAPI",
          "React",
          "PostgreSQL",
          "Docker",
          "LLM Agent (Llama-3 via Ollama)",
          "System Orchestration"
        ],
        outcome: "Managed 120+ beds with live occupancy analytics, automated transfers, and explainable AI-driven actions in a containerized production-like environment."
      },
      link: "https://github.com/Hasan72341/hospital-automation-ai"
    },
    {
      title: "Guardia — AI-Powered Women Safety Platform",
      tech: "FastAPI • React • PostgreSQL • ONNX • YOLOv8 • Docker",
      desc: "Real-time women safety system using audio-visual AI for threat detection and emergency response.",
      details: {
        problem: "Lack of proactive, real-time threat detection and coordinated emergency response in personal safety systems.",
        solution: "Designed a passive AI architecture where frontends stream media for server-side ONNX inference. Fused audio emotion recognition and vision-based pose detection into a unified risk score.",
        stack: [
          "FastAPI",
          "React",
          "PostgreSQL",
          "YOLOv8 (ONNX)",
          "Speech Emotion Recognition",
          "Docker",
          "JWT & RBAC"
        ],
        outcome: "Enabled automated emergency alerts, responder dashboards, and secure role-based workflows in a microservices-ready system."
      },
      link: "https://github.com/TarunaJ2006/Women-Safety-App"
    },
    {
      title: "Mini Search Engine",
      tech: "Python • Docker • CLI",
      desc: "Indexed 50,000+ Wikipedia articles using a positional inverted index and optimized two-pointer intersection.",
      details: {
        problem: "Efficiently searching through large text corpuses (50,000+ Wikipedia articles) with high relevance.",
        solution: "Built a custom positional inverted index. Applied TF-IDF with proximity-based scoring to improve result relevance for multi-term queries. Enabled fast, repeatable offline search experimentation.",
        stack: ["Python", "Docker", "Information Retrieval", "Optimized Algorithms"],
        outcome: "Achieved sub-100ms query times and demonstrated stable performance in a containerized interactive CLI."
      },
      link: "https://github.com/hasan72341/mini-search-engine"
    },
    {
      title: "ML Platform",
      tech: "PyTorch • FastAPI • PostgreSQL • JWT",
      desc: "End-to-end MLOps platform managing 30,000+ records via CSV pipelines and containerized service stack.",
      details: {
        problem: "Managing reproducible machine learning experiments and secure user-level predictions.",
        solution: "Ingested 30,162 records into a PostgreSQL feature store. Trained supervised models (0.82 accuracy) and implemented JWT-based authentication. Deployed via a containerized stack to separate concerns.",
        stack: ["PyTorch", "FastAPI", "PostgreSQL", "JWT", "Docker"],
        outcome: "Streamlined data ingestion and ensured isolated user predictions with a robust MLOps pipeline."
      },
      link: "https://github.com/hasan72341/ml_platform"
    },
    {
      title: "Token Bucket Rate Limiter",
      tech: "FastAPI • Python • Docker",
      desc: "High-concurrency traffic control system preventing resource exhaustion using the token bucket algorithm.",
      details: {
        problem: "Protecting backend resources from exhaustion under concurrent load and traffic spikes.",
        solution: "Implemented the Token Bucket algorithm to control request throughput. Demonstrated stable request handling using a high-performance FastAPI service.",
        stack: ["FastAPI", "Python", "Docker", "System Design"],
        outcome: "Improved reliability of API endpoints through consistent, containerized execution and robust rate limiting."
      },
      link: "https://github.com/hasan72341/token-bucket-rate-limiter"
    }
  ],
  skills: {
    languages: ["Python", "C++", "JavaScript (ES6+)", "SQL", "Bash"],
    backend: ["FastAPI", "RESTful services", "JWT", "OAuth2", "Dependency Injection"],
    databases: ["PostgreSQL", "Relational Schema Design", "Indexing", "Feature Stores"],
    ml: ["PyTorch", "Supervised Learning", "Model Training", "Evaluation Metrics"],
    devops: ["Docker", "Linux", "Git", "tmux", "Vim/Neovim", "Shell Scripting"]
  },
  responsibilities: [
    {
      role: "Core Member, Programming Club, IIT Mandi",
      desc: "Collaborated with peers on technical activities and internal coordination."
    },
    {
      role: "Core Member, ACM Students Chapter, IIT Mandi",
      desc: "Participated in academic events, discussions, and team-led initiatives."
    }
  ],
  contact: {
    email: " hasanraza96@outlook.com",
    // phone: "+91 8340710798",
    github: "github.com/hasan72341",
    linkedin: "www.linkedin.com/in/md-hasan-raza-8817372a7/"
  }
};
