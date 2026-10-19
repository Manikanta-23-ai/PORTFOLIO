export interface PersonalProfile {
  name: string;
  firstName: string;
  heroHeading: string;
  positioning: string;
  heroSubtitle: string;
  heroDescriptor: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  location: string;
  aboutCopy: string;
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  summary: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  reportedOutcomes: string[];
  technologies: string[];
  featured: boolean;
  visualType: 'rag-hub' | 'vehicle-lpr' | 'fraud-churn' | 'face-emotion' | 'zomato-suite';
  architectureHighlights: string[];
  repositoryUrl: string | null;
}

export interface EducationRecord {
  degree: string;
  institution: string;
  location: string;
  completionYear: string;
  focusAreas: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  domain: string;
}

export interface MarqueeTile {
  id: string;
  title: string;
  category: string;
  visualKind:
    | 'neural-graph'
    | 'genai-console'
    | 'ml-telemetry'
    | 'cv-detection'
    | 'python-pipeline'
    | 'rag-architecture'
    | 'data-dashboard'
    | 'vector-search'
    | 'agent-workflow'
    | 'compute-cluster';
  caption: string;
}

export const PERSONAL_PROFILE: PersonalProfile = {
  name: 'Manikanta Banavathu',
  firstName: 'MANIKANTA',
  heroHeading: "HI, I'M MANIKANTA",
  positioning: 'AI Engineer | Generative AI Developer | Data Science',
  heroSubtitle: 'Building intelligent systems with AI, data, and code.',
  heroDescriptor: 'AI ENGINEERING · GENERATIVE AI · MACHINE LEARNING',
  githubUrl: 'https://github.com/Manikanta-23-ai',
  linkedinUrl: 'https://www.linkedin.com/in/manikanta-banavathu-796907385/',
  email: 'banavathumanikanta23@gmail.com',
  location: 'Nuzvid, Andhra Pradesh, India',
  aboutCopy:
    'I’m Manikanta Banavathu, an aspiring AI engineer focused on building practical solutions with machine learning, computer vision, and Generative AI. I enjoy transforming complex problems into useful applications, exploring intelligent automation, and developing systems that connect data, models, and real-world workflows. My goal is to keep learning, build meaningful projects, and grow as an engineer.',
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    index: '01',
    title: 'Programming',
    summary: 'Core algorithmic implementation, data manipulation, and relational query design.',
    skills: ['Python', 'SQL'],
  },
  {
    id: 'ml-cv',
    index: '02',
    title: 'Machine Learning and Computer Vision',
    summary: 'Deep neural architectures, classical predictive modeling, and real-time spatial perception.',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'],
  },
  {
    id: 'genai-agents',
    index: '03',
    title: 'Generative AI and AI Agents',
    summary: 'Context-grounded LLM orchestration, multi-agent collaboration, and semantic retrieval pipelines.',
    skills: [
      'LangChain',
      'LlamaIndex',
      'Hugging Face Transformers',
      'Retrieval-Augmented Generation (RAG)',
      'AutoGen',
      'CrewAI',
    ],
  },
  {
    id: 'databases-vector',
    index: '04',
    title: 'Databases and Vector Search',
    summary: 'High-dimensional embedding indexes, document stores, and structured transactional databases.',
    skills: ['MySQL', 'MongoDB', 'Pinecone', 'FAISS', 'Chroma'],
  },
  {
    id: 'cloud-mlops',
    index: '05',
    title: 'Cloud and MLOps',
    summary: 'Containerized model packaging, experiment lifecycle tracking, and cloud infrastructure.',
    skills: ['Docker', 'MLflow', 'AWS', 'Azure'],
  },
  {
    id: 'analytics-automation',
    index: '06',
    title: 'Analytics and Automation',
    summary: 'Business intelligence visualization, statistical plotting, and automated workflow pipelines.',
    skills: ['Power BI', 'Excel', 'Matplotlib', 'Seaborn', 'n8n'],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'customer-360-genai',
    number: '01',
    title: 'CUSTOMER 360 GENAI INSIGHTS HUB',
    category: 'GENERATIVE AI · RAG',
    description:
      'Developed a conversational AI insights hub using retrieval-augmented generation to help users explore customer information and automate report generation.',
    reportedOutcomes: [
      'Reduced manual reporting time by 40% (project-reported outcome)',
    ],
    technologies: ['Python', 'LangChain', 'Hugging Face', 'RAG', 'Pinecone'],
    featured: true,
    visualType: 'rag-hub',
    architectureHighlights: [
      'Document chunking and dense vector indexing via Pinecone for multi-source customer records.',
      'LangChain retrieval pipeline pairing semantic search with Hugging Face transformer synthesis.',
      'Automated structured summary generation for rapid customer account exploration.',
    ],
    repositoryUrl: null,
  },
  {
    id: 'license-plate-vehicle-monitoring',
    number: '02',
    title: 'LICENSE PLATE & VEHICLE MONITORING',
    category: 'COMPUTER VISION · OCR',
    description:
      'Built a vehicle-monitoring system using object detection and optical character recognition to identify vehicles and extract license-plate information.',
    reportedOutcomes: [
      '91% accuracy on vehicle and plate extraction tasks (project-reported outcome)',
    ],
    technologies: ['Python', 'OpenCV', 'EasyOCR', 'YOLO'],
    featured: true,
    visualType: 'vehicle-lpr',
    architectureHighlights: [
      'YOLO object detection stages for real-time vehicle localization and license-plate bounding box isolation.',
      'OpenCV image preprocessing (contrast normalization, bilateral filtering, perspective deskewing).',
      'EasyOCR character extraction pipeline with alphanumeric plate formatting validation.',
    ],
    repositoryUrl: null,
  },
  {
    id: 'fraud-churn-intelligence',
    number: '03',
    title: 'FRAUD & CHURN INTELLIGENCE PLATFORM',
    category: 'MACHINE LEARNING · DATA ANALYTICS',
    description:
      'Developed a machine-learning analytics platform for fraud detection and customer churn prediction, supported by SQL data processing and Power BI dashboards.',
    reportedOutcomes: [
      '92% classification accuracy (project-reported outcome)',
      'Identified 15% of customers as being at risk (project-reported outcome)',
    ],
    technologies: ['Python', 'SQL', 'Scikit-learn', 'XGBoost', 'Power BI'],
    featured: true,
    visualType: 'fraud-churn',
    architectureHighlights: [
      'SQL feature engineering pipelines aggregating behavioural and transactional risk indicators.',
      'Ensemble modeling with Scikit-learn and XGBoost tuned for imbalanced fraud and churn classes.',
      'Interactive Power BI executive views surfacing high-risk customer cohorts and anomaly drivers.',
    ],
    repositoryUrl: null,
  },
  {
    id: 'face-mask-emotion-detection',
    number: '04',
    title: 'REAL-TIME FACE MASK & EMOTION DETECTION SYSTEM',
    category: 'COMPUTER VISION · DEEP LEARNING',
    description:
      'Built a deep-learning computer vision pipeline to perform simultaneous face mask compliance detection and facial emotion classification from live video streams.',
    reportedOutcomes: [
      '94% accuracy in project evaluation tests (project-reported outcome)',
    ],
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Deep Learning'],
    featured: false,
    visualType: 'face-emotion',
    architectureHighlights: [
      'OpenCV frame capture and region-of-interest facial cropping for low-latency inference.',
      'Dual-head TensorFlow convolutional network classifying mask states and facial affect.',
      'Real-time bounding-box annotation and confidence telemetry overlay.',
    ],
    repositoryUrl: null,
  },
  {
    id: 'zomato-intelligence-suite',
    number: '05',
    title: 'ZOMATO INTELLIGENCE SUITE',
    category: 'DEEP LEARNING · DATA ANALYTICS',
    description:
      'Created a delivery and restaurant intelligence suite combining SQL data pipelines, deep-learning computer vision analysis, and interactive Power BI operational dashboards.',
    reportedOutcomes: [
      '12% delivery-time reduction in modeled scenarios (project-reported outcome)',
    ],
    technologies: ['Python', 'Deep Learning', 'OpenCV', 'SQL', 'Power BI'],
    featured: false,
    visualType: 'zomato-suite',
    architectureHighlights: [
      'SQL analytical modeling over order preparation, dispatch latency, and route density metrics.',
      'Deep learning and OpenCV visual inspection modules alongside operational KPI tracking.',
      'Power BI decision support views highlighting bottleneck zones and delivery time drivers.',
    ],
    repositoryUrl: null,
  },
];

export const EDUCATION_DATA: EducationRecord = {
  degree: 'Diploma in Computer Science and Engineering',
  institution: 'AANM & VVRSR Polytechnic, Gudlavalleru, Andhra Pradesh',
  location: 'Gudlavalleru, Andhra Pradesh, India',
  completionYear: '2026',
  focusAreas: [
    'Artificial Intelligence & Machine Learning Foundations',
    'Python & Relational Database Systems (SQL)',
    'Computer Vision & Generative AI Applications',
    'Data Structures, Algorithms & Software Engineering',
  ],
};

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'yhills-ai-python',
    title: 'AI with Python Course and Internship',
    issuer: 'YHills',
    year: '2024',
    domain: 'Artificial Intelligence · Python',
  },
  {
    id: 'ibm-data-science',
    title: 'Data Science Professional Certificate',
    issuer: 'IBM',
    year: '2024',
    domain: 'Data Science · Machine Learning',
  },
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics Certificate',
    issuer: 'Google',
    year: '2024',
    domain: 'Data Analytics · SQL & Visualization',
  },
  {
    id: 'google-python',
    title: 'Python Programming',
    issuer: 'Google',
    year: '2024',
    domain: 'Software Engineering · Python',
  },
  {
    id: 'microsoft-data-analyst',
    title: 'Data Analyst Associate',
    issuer: 'Microsoft',
    year: '2024',
    domain: 'Business Intelligence · Power BI',
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2024',
    domain: 'Cloud Infrastructure · AWS',
  },
];

export const MARQUEE_ROW_ONE: MarqueeTile[] = [
  {
    id: 'tile-neural-graph',
    title: 'NEURAL COMPUTATION GRAPH',
    category: 'DEEP LEARNING ARCHITECTURE',
    visualKind: 'neural-graph',
    caption: 'Illustrative multi-layer tensor activation topology',
  },
  {
    id: 'tile-rag-architecture',
    title: 'RAG VECTOR PIPELINE',
    category: 'RETRIEVAL-AUGMENTED GENERATION',
    visualKind: 'rag-architecture',
    caption: 'Illustrative semantic chunking & Pinecone retrieval flow',
  },
  {
    id: 'tile-cv-detection',
    title: 'SPATIAL OBJECT & OCR OVERLAY',
    category: 'COMPUTER VISION · YOLO & EASYOCR',
    visualKind: 'cv-detection',
    caption: 'Illustrative bounding-box localization and plate parsing',
  },
  {
    id: 'tile-genai-console',
    title: 'CONVERSATIONAL INSIGHTS ENGINE',
    category: 'GENERATIVE AI SYNTHESIS',
    visualKind: 'genai-console',
    caption: 'Illustrative context-grounded LLM synthesis workspace',
  },
  {
    id: 'tile-vector-search',
    title: 'HIGH-DIMENSIONAL EMBEDDING INDEX',
    category: 'PINECONE · FAISS · CHROMA',
    visualKind: 'vector-search',
    caption: 'Illustrative cosine similarity neighborhood clusters',
  },
];

export const MARQUEE_ROW_TWO: MarqueeTile[] = [
  {
    id: 'tile-agent-workflow',
    title: 'MULTI-AGENT ORCHESTRATION',
    category: 'AUTOGEN · CREWAI · LANGCHAIN',
    visualKind: 'agent-workflow',
    caption: 'Illustrative autonomous task routing & tool execution loop',
  },
  {
    id: 'tile-data-dashboard',
    title: 'CHURN & RISK INTELLIGENCE',
    category: 'XGBOOST · SQL · POWER BI',
    visualKind: 'data-dashboard',
    caption: 'Illustrative cohort survival and anomaly scoring telemetry',
  },
  {
    id: 'tile-python-pipeline',
    title: 'MLOPS & MODEL REGISTRY',
    category: 'DOCKER · MLFLOW · PYTHON',
    visualKind: 'python-pipeline',
    caption: 'Illustrative reproducible training and container deployment',
  },
  {
    id: 'tile-ml-telemetry',
    title: 'FACIAL AFFECT & MASK CLASSIFIER',
    category: 'TENSORFLOW · OPENCV',
    visualKind: 'ml-telemetry',
    caption: 'Illustrative real-time vision inference confidence matrix',
  },
  {
    id: 'tile-compute-cluster',
    title: 'CLOUD INFERENCE TOPOLOGY',
    category: 'AWS · AZURE · DISTRIBUTED DATA',
    visualKind: 'compute-cluster',
    caption: 'Illustrative scalable compute and workflow automation fabric',
  },
];
