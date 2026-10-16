# Canvas · prova web

La lavagna del team per portare un progetto Minecraft dall'idea al via libera, nella versione di prova che si apre nel
browser. Si lavora in diretta da browser a browser (WebRTC), senza server: i progetti stanno nel browser di chi li usa.

- Per trovarsi, i browser passano da tracker WebTorrent pubblici: vedono solo offerte cifrate con la chiave del progetto
  e l'indirizzo IP di chi si collega, mai il contenuto, i nomi o il progetto.
- Chi entra lo ammette un amministratore del progetto; chi viene tolto non riceve più niente, e l'invito cambia.
- Lo stesso invito vale nell'app Canvas per PC: chi usa il sito e chi usa l'app lavorano allo stesso progetto.
- I file trascinati sulla lavagna arrivano a tutti, interi e controllati; Canvas non li apre né li esegue mai.
- Per chi non riesce a collegarsi direttamente, il relè (TURN) è del progetto: lo mette un amministratore, e le credenziali
  arrivano solo ai membri.

Questo repository contiene solo il pacchetto pronto (codice impacchettato e ridotto). Le licenze delle librerie e dei
caratteri usati sono in LICENZE.txt. Il codice di Canvas non è open source: tutti i diritti riservati.
