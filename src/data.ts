import { Subject, Tutorial, Presentation, GlossaryTerm, QuizQuestion, SubjectCategory } from './types';

export const subjects: Subject[] = [
  {
    id: "inglese-turistico",
    title: "Inglese Turistico",
    category: "Umanistiche e Comunicative",
    description: "Competenze linguistiche per l'accoglienza e la promozione turistica internazionale.",
    objectives: [
      "Gestire la comunicazione con clientela internazionale",
      "Promuovere il territorio in lingua inglese",
      "Padroneggiare il vocabolario del settore turistico ricettivo"
    ],
    topics: [
      { title: "Welcome and Reception", content: "Accoglienza clienti, check-in e check-out, gestione prenotazioni." },
      { title: "Giving Tourist Information", content: "Fornire indicazioni stradali, consigliare itinerari e attrazioni locali." },
      { title: "Handling Complaints", content: "Gestione dei reclami e problem solving in lingua." }
    ],
    icon: "Languages",
    color: "bg-emerald-500"
  },
  {
    id: "reti-informatiche",
    title: "Reti Informatiche",
    category: "Scientifiche e Informatiche",
    description: "Fondamenti di networking, protocolli di comunicazione e architetture di rete.",
    objectives: [
      "Comprendere il modello OSI e TCP/IP",
      "Saper configurare una rete LAN di base",
      "Conoscere i principi di sicurezza delle reti"
    ],
    topics: [
      { title: "Modelli di Rete", content: "Il modello teorico OSI e l'implementazione pratica della suite TCP/IP." },
      { title: "Indirizzamento IP", content: "Classi di indirizzi IPv4, subnetting e introduzione a IPv6." },
      { title: "Routing e Switching", content: "Differenze tra hub, switch e router. Tabelle di routing." }
    ],
    icon: "Monitor",
    color: "bg-blue-500"
  },
  {
    id: "igiene",
    title: "Igiene",
    category: "Tecnico-Professionali",
    description: "Principi di igiene pubblica, epidemiologia e prevenzione nei luoghi di lavoro.",
    objectives: [
      "Conoscere le basi dell'epidemiologia",
      "Applicare le norme di igiene nei contesti professionali",
      "Prevenire la diffusione di malattie infettive"
    ],
    topics: [
      { title: "Principi di Epidemiologia", content: "Distribuzione e determinanti delle malattie nelle popolazioni." },
      { title: "Igiene Ambientale e Alimentare", content: "Potabilizzazione dell'acqua, smaltimento rifiuti e sistema HACCP." },
      { title: "Prevenzione Malattie Infettive", content: "Disinfezione, sterilizzazione e importanza delle vaccinazioni." }
    ],
    icon: "Library",
    color: "bg-orange-500"
  }
];

export const tutorials: Tutorial[] = [
  { id: "pdf-1", title: "Vocabolario Turistico Essenziale", subjectId: "inglese-turistico", url: "/pdfs/inglese-turistico.pdf", pages: 15, size: "2.1 MB" },
  { id: "pdf-2", title: "Guida al Subnetting", subjectId: "reti-informatiche", url: "/pdfs/subnetting.pdf", pages: 10, size: "1.5 MB" },
  { id: "pdf-3", title: "Manuale HACCP Base", subjectId: "igiene", url: "/pdfs/haccp.pdf", pages: 20, size: "3.0 MB" },
];

export const slides: Presentation[] = [
  {
    id: "slide-1",
    title: "Il Modello TCP/IP",
    subjectId: "reti-informatiche",
    slides: [
      { image: "bg-blue-100 dark:bg-blue-900/30", text: "Introduzione al TCP/IP" },
      { image: "bg-emerald-100 dark:bg-emerald-900/30", text: "Livello di Rete (IP)" },
      { image: "bg-amber-100 dark:bg-amber-900/30", text: "Livello di Trasporto (TCP, UDP)" }
    ]
  }
];

export const glossary: GlossaryTerm[] = [
  { id: "g1", term: "Check-in", definition: "Procedura di registrazione all'arrivo in una struttura ricettiva.", subjectId: "inglese-turistico" },
  { id: "g2", term: "Subnet Mask", definition: "Maschera di sottorete, usata in IP per determinare quale parte di un indirizzo indica la rete e quale l'host.", subjectId: "reti-informatiche" },
  { id: "g3", term: "HACCP", definition: "Hazard Analysis and Critical Control Points, sistema di autocontrollo igienico nelle industrie alimentari.", subjectId: "igiene" },
  { id: "g4", term: "Booking", definition: "Prenotazione di un servizio turistico.", subjectId: "inglese-turistico" },
  { id: "g5", term: "Router", definition: "Dispositivo di rete che instrada pacchetti di dati tra reti informatiche diverse.", subjectId: "reti-informatiche" }
];

export const quizzes: QuizQuestion[] = [
  {
    id: "q1",
    question: "In inglese, come rispondi ad un cliente che dice 'Thank you'?",
    options: ["You are Welcome", "Please", "Excuse me", "Never mind"],
    correctIndex: 0,
    subjectId: "inglese-turistico"
  },
  {
    id: "q2",
    question: "Quanti livelli ha il modello OSI?",
    options: ["4", "5", "7", "9"],
    correctIndex: 2,
    subjectId: "reti-informatiche"
  },
  {
    id: "q3",
    question: "Quale livello del modello TCP/IP si occupa dell'indirizzamento logico?",
    options: ["Applicazione", "Trasporto", "Internet", "Accesso di Rete"],
    correctIndex: 2,
    subjectId: "reti-informatiche"
  },
  {
    id: "q4",
    question: "Cosa significa l'acronimo HACCP?",
    options: ["Hazard Analysis and Critical Control Points", "High Assessment of Critical Check Points", "Health Analysis of Clean Control Processes"],
    correctIndex: 0,
    subjectId: "igiene"
  }
];
