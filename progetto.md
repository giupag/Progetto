# Piattaforma Didattica "Centro Studi Agorà" - Blueprint del Progetto

Questo documento descrive integralmente l'architettura, le logiche funzionali, la struttura dati e l'aspetto grafico della webapp. Funge da guida per ricreare, mantenere o espandere il progetto ex novo.

## 1. Obiettivo Globale
Creare uno spazio digitale vetrina elegante, veloce e minimale per la consultazione di contenuti didattici, documenti, slides, mini-quiz e piccoli strumenti per l'associazione Centro Studi Agorà.
Non include complessi sistemi di backend, login utenti, salvataggio di progressi o database avanzati. È concepito per accessi simultanei, scalabilità, e facilità d'uso.

## 2. Stack Tecnologico
*   **Framework Frontend**: React 19 (via Vite)
*   **Routing**: React Router DOM (v6, `createBrowserRouter`)
*   **Stilizzazione**: Tailwind CSS v4
*   **Animazioni**: Framer Motion / Motion for React
*   **Iconografia**: Lucide React
*   **Linguaggio**: TypeScript

## 3. Flusso Funzionale e Navigazione (Sistema "Attivo per Materia")
Il progetto è basato su una logica di "confinamento contestuale" per mantenere l'interfaccia ultra-ordinata:
1.  **Dashboard (Home)**: È il punto di ingresso. Mostra le materie disponibili. Quando l'utente si trova in Dashboard, tutte le sezioni didattiche della sidebar (Tutorial PDF, Slides, Glossario, Quiz, Strumenti) sono **disabilitate** (opacizzate e non cliccabili).
2.  **Attivazione Contesto**: Cliccando su una Materia dalla Dashboard, si entra nel suo dettaglio. Tramite un Context Globale (`AppContext`), l'Id della materia viene registrato nel sistema.
3.  **Sblocco Voci**: Le voci della sidebar si abilitano. Da questo momento, navigando verso PDF, Slides o Quiz, verranno mostrati **solo e unicamente** i dati filtrati relativi alla materia selezionata.
4.  **Reset**: Tornando alla Dashboard (premendo Home/Dashboard o la freccia "Torna alla dashboard"), il contesto della materia si azzera e i menu laterali tornano disabilitati, forzando l'utente a scegliere nuovamente un percorso.

## 4. Struttura dell'Interfaccia (UI/UX)
L'interfaccia è desktop-first ma perfettamente responsiva per mobile (dove la sidebar si trasforma in un overlay a scomparsa).
*   **Layout Principale**:
    *   **Sidebar fissa a sinistra** (con Logo, Menu navigazione e Impostazioni a fondo pagina).
    *   **Area di contenuto principale a destra** (scrollabile, con limitazione di larghezza `max-w-5xl` e margini centrati su schermi grandi per una leggibilità ottimale).
*   **Stile Grafico**:
    *   Minimale, professionale, estremamente ordinato.
    *   Utilizzo di molto spazio bianco (Negative space).
    *   Card con bordi netti arrotondati (`rounded-2xl` / `rounded-3xl`), senza shadow esagerate, solo hover effect traslucidi.
    *   Feedback visivi immediati ai click ed interazioni.
    *   Tema Chiaro (default) e Tema Scuro (supportato).
*   **Animazioni**:
    *   Micro-animazioni all'ingresso in pagina con `motion.div` (effetto slide-up e fade-in graduale, orchestrato tramite delay).
    *   Transizioni popLayout e morphing durante il filtraggio delle card.

## 5. Pagine e Visualizzazioni

### 5.1 Dashboard (Home)
*   Header descrittivo formale.
*   **Barra di ricerca testuale**.
*   **Filtri a Categoria**: Bottoni per le categorie:
    *   *Alfabetico* (Default, sfondo verde quando attivo).
    *   *Umanistiche e Comunicative*.
    *   *Scientifiche e Informatiche*.
    *   *Tecnico-Professionali*.
*   **Elenco Materie (Grid Layout)**: Mostrate tramite card pulite con Icona e colore identificativo, Titolo e descrizione corta. **Non viene mostrata la categoria all'interno della card** visivamente. Le materie vengono esposte sempre ordinate alfabeticamente.

### 5.2 Dettaglio Materia (`/materie/:id`)
*   Pulsante "Torna alla dashboard".
*   Intestazione grande con Titolo e Descrizione Materia.
*   **Argomenti Layout a fisarmonica (Accordion)**: Visualizzazione della lista di argomenti, cliccabili per espandere e leggere il dettaglio.
*   **Sidebar laterale della card**:
    *   Obiettivi Didattici (lista con spunte verdi).
    *   Risorse Rapide: Shortlink ai documenti PDF e alle Slide proprie di quella specifica materia.

### 5.3 Moduli Didattici (Le seguenti viste mostrano dati solo della "materia attiva")
*   **Tutorial PDF (`/tutorial`)**: Griglia di PDF (simulati). Ogni card espone titolo, dimensione, n° di pagine. Cliccando "Visualizza" si apre una modale a tutto schermo che simula un visualizzatore PDF.
*   **Slides (`/slides`)**: Griglia di presentazioni. Se cliccate, generano una Modale Fullscreen (sfondo nero) con navigazione tramite frecce tra le diapositive.
*   **Glossario (`/glossario`)**: Elenco di lemmi alfabetico con ricerca istantanea, pre-filtrati per materia. Usa raggruppamento visuale per lettera iniziale.
*   **Quiz (`/quiz`)**: Single-page application simulator in cui una card pone una domanda e offre alternative multiple.
    *   Feedback in tempo reale (Azzurro per default, Verde se corretto, Rosso se sbagliato).
    *   Avanzamento manuale e punteggio finale riportato senza salvataggio persistente in backend.
*   **Strumenti Didattici (`/strumenti`)**: Applicazione basata sulla gamification. "Gioco di Matching" che ripesca coppie specifiche dal file data in base alla materia selezionata, consentendo di abbinare termini alle loro definizioni in stile drag & drop virtuale (click & click link).

## 6. Struttura Dati Statici (Il File `data.ts`)
Tutti i dati risiedono attualmente nel file statico.

**Entità Modellate**:
1.  `Subject`: ID, Titolo, Categoria, Descrizione, Obiettivi, Argomenti (Titolo, Contenuto), Icona, Colore background.
2.  `Tutorial`: Informazioni dei file PDF (Titolo, Pagine, Dimensioni, id-materia ricollegamento).
3.  `Presentation`: Oggetto slide formattata per step array, id-materia ricollegamento.
4.  `GlossaryTerm`: Termini, Definizioni, id-materia ricollegamento.
5.  `QuizQuestion`: Domande, array singole Opzioni, `correctIndex`, id-materia ricollegamento.
6.  `TOOL_GAMES` (in `Tools.tsx`): Strutturazione dati di coppie Key/Value dinamiche da far abbinare agli studenti divisa per chiavi di `activeSubjectId`.

**Dati Demo Presenti**:
*   *Inglese Turistico* (Umanistiche e Comunicative).
*   *Reti Informatiche* (Scientifiche e Informatiche).
*   *Igiene* (Tecnico-Professionali).

---
*Nota: Tutti gli step di questa applicazione, nel momento in cui necessitassero di un aggiornamento con backend, potranno essere facilmente sostituiti da chiamate `fetch` mantenendo gli hook di contesto (`AppContext`).*
