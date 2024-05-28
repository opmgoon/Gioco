//abbreviazioni
var fSx = document.getElementById("fSx");
var fGu = document.getElementById("fGu");
var fSu = document.getElementById("fSu");
var fDx = document.getElementById("fDx");
//variabili per controllo pressione freccette
var premiSx = false;
var premiGu = false;
var premiSu = false;
var premiDx = false;
//variabili per controllo movimento immagini
var MfSx = false;
var MfGu = false;
var MfSu = false;
var MfDx = false;
//counter errori
var errori = 0;
//controllo pausa
var pausa = false;
//contatore score
var score = 0;
//contatore moltiplicatore
var moltiplicatore = 0; 
//score per pezzo azzeccato
var scoreGuap = 10;
//controllo muto
var muto = false;
//velocità di riaggiornamento della funzione di movimento
var velocità = 5;
//ogni quanto viene chiamata una freccetta nuova
var qta = 1000;

//funzione che intercetta pressione freccette direzionali
function Punto(eTastiera ) {
    var tasto = eTastiera.which;
    if (tasto == 37 && MfSx == true) { //sinistra
        premiSx = true;
    }else if (tasto == 40 && MfGu == true){ //giù
        premiGu = true;
    }else if (tasto == 38 && MfSu == true){ //su
        premiSu = true;
    }else if (tasto == 39){ //destra
        premiDx = true;
    }
}

//scelta casuale tra le 4 frecce
function scegliFreccia() {
    if (pausa == true){
        Unpause();
    }
    if (pausa == false){ //se il gioco non è in pausa
        document.getElementById("Diff1").style.visibility = "hidden";
        document.getElementById("Diff2").style.visibility = "hidden";
        document.getElementById("Diff3").style.visibility = "hidden";
        setInterval(function(){
            var i = Math.floor(Math.random() * 4); //sceglie numero da 0 a 3, se 0 sx, se 1 dx, se 2 giù, se 3 su
            if (i == 0){
                MuovifSx();
            }
            else if (i == 1){
                MuovifDx();
            }
            else if (i == 2){
                MuovifGu();
            }
            else if (i == 3){
                MuovifSu();
            }
        }, Math.round(Math.random() * (qta - 0.5))) //in tempo random tra 0 e n secondi risceglie un'immagine
    }
}

//funzioni movimento immagini freccette
//funzione per muovere l'immagine freccia sinistra
function MuovifSx() {
    if (MfSx == false && pausa == false){ //se non si sta già muovendo e il gioco non è in pausa
        var passo = 2; //distanza percorsa dall'immagine 
        var ySx = fSx.offsetTop; //distanza iniziale dal margine superiore
        MfSx = true; //dichiarata in movimento l'immagine
    
        //ciclo per muovere la freccia fino al margine superiore
        var intervalloMovimento = setInterval(function() {
            if ((ySx <= 0 || ySx > 50 && premiSx == true) && pausa == false) { //se arriva al martgine sup, o viene premuta la giusta freccetta ma nel momento sbagliato, e non è in pausa
                clearInterval(intervalloMovimento); //ferma l'immagine
                MfSx = false; //dichiarata non in movimento
                fSx.style.top = ''; //deassegnazione del top (perchè nel css lo gestisco col bottom)
                fSx.style.bottom = 20 + "px"; // assegnazione della posizione iniziale
                premiSx = false; //pressione della freccetta non in atto
                moltiplicatore = 0; //azzeramento moltiplicatore in caso di errore
                errori++; //aumento contatore errori
                Errori(); //richiamata la funzione per controllare se si ha perso
            } else if (premiSx == true && pausa == false ){ //se si preme al momento giusto e non è in pausa
                clearInterval(intervalloMovimento); // Ferma la freccia quando raggiunge il margine superiore
                MfSx = false;
                fSx.style.top = '';
                fSx.style.bottom = 20 + "px";
                premiSx = false;
                AumentaPunteggio();
                if (muto == false){
                    var audio = new Audio("ding.mp3");
                    audio.play();
                }
                moltiplicatore++;
                Moltiplicatore();
            } else if (pausa == false) { //se nessuna delle condizioni sopra è vera e non è in pausa
                ySx -= passo; //la distanza dal margine sup diminuisce di 2
                fSx.style.top = ySx + "px"; //il margine superiore dell'immagine viene aggiornato
            }

        }, velocità); //ogni n secondi riparte il ciclo
    }
}

//funzione per muovere l'immagine freccia giù
function MuovifGu() {
    if (MfGu == false && pausa == false){
        var passo = 2;
        var fGu = document.getElementById("fGu");
        var yGu = fGu.offsetTop; 
        MfGu = true;
    
        var intervalloMovimento = setInterval(function() {
            if ((yGu <= 0|| yGu > 50 && premiGu == true) && pausa == false) {
                clearInterval(intervalloMovimento);
                MfGu = false;
                fGu.style.top = '';
                fGu.style.bottom = 20 + "px";
                premiGu = false;
                moltiplicatore = 0;
                errori++;
                Errori();
            } else if (premiGu == true && pausa == false){
                clearInterval(intervalloMovimento);
                MfGu = false;
                fGu.style.top = '';
                fGu.style.bottom = 20 + "px";
                premiGu = false;
                AumentaPunteggio();
                if (muto == false){
                    var audio = new Audio("ding.mp3");
                    audio.play();;
                }
                moltiplicatore++;
                Moltiplicatore();
            } else if (yGu > 0 && pausa == false) {
                yGu -= passo;
                fGu.style.top = yGu + "px";
            }
        }, velocità);
    }
}

//funzione per muovere l'immagine freccia su
function MuovifSu() {
    if (MfSu == false && pausa == false){
        var passo = 2;
        var fSu = document.getElementById("fSu");
        var ySu = fSu.offsetTop; 
        MfSu = true;
    
        var intervalloMovimento = setInterval(function() {
            if ((ySu <= 0 || ySu > 50 && premiSu == true) && pausa == false) {
                clearInterval(intervalloMovimento);
                MfSu = false;
                fSu.style.top = '';
                fSu.style.bottom = 20 + "px";
                premiSu = false;
                moltiplicatore = 0;
                errori++;
                Errori();
            } else if (premiSu == true && pausa == false){
                clearInterval(intervalloMovimento);
                MfSu = false;
                fSu.style.top = '';
                fSu.style.bottom = 20 + "px";
                premiSu = false;
                AumentaPunteggio();
                moltiplicatore++;   
                Moltiplicatore()
                if (muto == false){
                    var audio = new Audio("ding.mp3");
                    audio.play();
                };
            } else if (ySu > 0 && pausa == false) {
                ySu -= passo;
                fSu.style.top = ySu + "px";
            }

        }, velocità);
    }
}

//funzione per muovere l'immagine freccia destra
function MuovifDx() {
    if (MfDx == false && pausa == false){
        var passo = 2;
        var fDx = document.getElementById("fDx");
        var yDx = fDx.offsetTop; 
        MfDx = true;
    
        var intervalloMovimento = setInterval(function() {
            if ((yDx <= 0 || yDx > 50 && premiDx == true) && pausa == false) {
                clearInterval(intervalloMovimento);
                MfDx = false;
                fDx.style.top = '';
                fDx.style.bottom = 20 + "px";
                premiDx = false;
                moltiplicatore = 0;
                errori++;
                Errori();
            } else if (premiDx == true && pausa == false){
                clearInterval(intervalloMovimento);
                MfDx = false;
                fDx.style.top = '';
                fDx.style.bottom = 20 + "px";
                premiDx = false;
                AumentaPunteggio();
                moltiplicatore++;
                Moltiplicatore();
                if (muto == false){
                    var audio = new Audio("ding.mp3");
                    audio.play();
                }
            } else if (yDx > 0 && pausa == false) {
                yDx -= passo;
                fDx.style.top = yDx + "px";
            }

        }, velocità);
    }
}

//funzione che controlla se sono stati fatti tre errori
function Errori() {
    if (errori == 1){ //se l'errore è 1 toglie la prima vita
        document.getElementById("Vita3").style.visibility = "hidden";
        if (muto == false) {
            var audio = new Audio("buzz.mp3");
            audio.play();
        }
    }else if (errori == 2) { //se gli errori sono 2 toglie la seconda vita
        document.getElementById("Vita2").style.visibility = "hidden";
        if (muto == false) {
            var audio = new Audio("buzz.mp3");
            audio.play();
        }
    }
    else if (errori == 3) { //se gli errori sono 3 toglie la terza vita e fa comparire popup di sconfitta
        if (muto == false) {
            var audio = new Audio("buzz.mp3");
            audio.play();
            audio = new Audio("lose.mp3"); //suono sconfitta
            audio.play();
        }
        document.getElementById("Vita1").style.visibility = "hidden";
        document.getElementById("button").click(); //clicca il bottone per far comparire il popup
        document.getElementById('scorepopup').textContent = "Hai totalizzato uno score di: " + score + "!";
    }
}

//funzione di pausa
function Pause() {
    document.getElementById("Pausa").style.visibility = "hidden"; //nasconde immagine stop
    document.getElementById("Pausa").style.zIndex = 1; //diminuisce l'indice z dell'immagine di pausa di modo che sia a pari all'immagine resume
    document.getElementById("Riprendi").style.visibility = "visible"; //mostra l'immagine resume
    document.getElementById("Riprendi").style.zIndex = 2; //aumenta l'indice z dell'immagine resume in modo che sovrasti quella di pausa
    pausa = true; //dichiara la pausa vera //ferma tutti i cicli che fanno scorrere le freccette
}

//funzione di resume
function Unpause() { //funzionamento contrario alla precedente
    document.getElementById("Pausa").style.visibility = "visible";
    document.getElementById("Pausa").style.zIndex = 2;
    document.getElementById("Riprendi").style.visibility = "hidden";
    document.getElementById("Riprendi").style.zIndex = 1;
    pausa = false;
}

//funzione togli volume (funzionamento analogo a pause e unpause)
function Muta() { 
    document.getElementById("Unmute").style.visibility = "visible";
    document.getElementById("Unmute").style.zIndex = 2;
    document.getElementById("Mute").style.visibility = "hidden";
    document.getElementById("Mute").style.zIndex = 1;
    muto = false;
}

//funzione metti volume
function Unmuta() {
    document.getElementById("Unmute").style.visibility = "hidden";
    document.getElementById("Unmute").style.zIndex = 1;
    document.getElementById("Mute").style.visibility = "visible";
    document.getElementById("Mute").style.zIndex = 2;
    muto = true;
}

//funzione che mostra il popup di sconfitta
function PopUp() {
    // il gioco viene messo in pausa
    pausa = true;
}

//funzione che fa giocare di nuovo una volta perso
function PlayAgain() {
    document.getElementById("close").click(); //chiude il popup
    location.reload(); //ricarica la pagina
}

//funzione per aumentare il punteggio
function AumentaPunteggio() {
    score += scoreGuap; //lo score totale diventa lo score + i punti guadagnati attualmente con il moltiplicatore
    document.getElementById('Score').innerText = "SCORE: " + score;
    document.getElementById('Score').style.visibility = "visible";
}

//funzione che aumenta i punti se si è in streak
function Moltiplicatore () {
    if (moltiplicatore < 5) { //meno di 5 di fila 10 pt
        scoreGuap = 10;
    }else if (moltiplicatore >= 5 && moltiplicatore < 10){ //tra 5 e 10: 15 pt
        scoreGuap = 15;
    } else if (moltiplicatore >= 10 && moltiplicatore < 20){ //tra 10 e 20: 20 pt
        scoreGuap = 20;
    } else if (moltiplicatore >= 20 && moltiplicatore < 40) { //tra 20 e 40: 25 pt
        scoreGuap = 25;
    } else if (moltiplicatore >= 40) { //più di 40: 30 pt
        scoreGuap = 30
    }
}

//funzioni di scelta difficoltà
function Difficoltà1() {
    velocità = 5; //ogni quanto si muove di un passo
    qta = 1000; //ogni quanto max tempo muove un'altra freccia
}

function Difficoltà2() {
    velocità = 3;
    qta = 700;
}

function Difficoltà3() {
    velocità = 1;
    qta = 400;
}