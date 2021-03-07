/*---------------------------------- Exo 1 ---------------------------------

- We ask to read a sentence, which ends with a point, character by character and to determine:
  The length of the sentence (the number of characters).
  The number of words in the sentence (assuming that the words are separated by a single space).
  The number of vowels in the sentence.

--------------------------------------------------------------------------*/
function sentence(){
    let obj = {
        nbrChar : 0,
        nbrWords : 0, 
        nbrVowels : 0
    };
    let  char;
    
    do{ 
        char = prompt("Entrer un caractère");      
        if(char == " "){
            obj.nbrWords++;
        } else if(char=="a" || char=="e" || char=="i" || char=="o" || char=="u")  {
            obj.nbrVowels++;
        }  
        obj.nbrChar++;  
    }while(char != '.');

    return obj;
}
sentence();




/*---------------------------------- Exo 2 ---------------------------------

- A car rental organization offers two rental formulas:
   Rental by the kilometer:
    - for the first 100 kilometers: rate r1 per km,
    - for the kilometers from 101 to 1000: rate r2 per km,
    - beyond 1000 kilometers: rate r3 per km.
   Daily rate: Unlimited mileage at the price per day p_d.

  In both cases, it is necessary to add an insurance (whose cost per day is ins) and the value-added tax (VAT) .
  The quantities r1, r2, r3, p_d, ins as well as the rate of VAT are considered as constants.
  Take, for example: r1 = 0.7 r2 = 0.4 r3 = 0.2 p_d = 100 ins= 0.3 (expressed in dinars) and rate VAT = 0.18.
  Write a function which, given the total number of kilometers and the number of days of location, calculates the total costs of the two tariffs and indicates by a label the most suitable solution advantageous for the client.

--------------------------------------------------------------------------*/
function mentantLocationVoiture(km, days){
    const r1=0.7, r2=0.4, r3=0.2, p_d=100, ins=0.3, VAT=0.18;
    let obj = {
        prixParKm : 0,
        prixParJours : 0,
        meilleurPrix : ""
    };

    if(km<=100){
        obj.prixParKm = r1*km + ins*days + VAT;
    }else if(km>=101 && km<1000){
        obj.prixParKm = 100*r1 + r2*(km-100) + ins*days + VAT;
    }else if(km>=1000){
        obj.prixParKm = 100*r1 + r2*898 + r3*(km-1000) + ins*days + VAT;
    }

    obj.prixParJours = days*p_d + ins*days + VAT;
    
    if(obj.prixParKm < obj.prixParJours){
        obj.meilleurPrix = "La première formule revient moins chère que la deuxième !";
    }else if(obj.prixParKm > obj.prixParJours){
        obj.meilleurPrix = "La deuxième formule revient moins chère que la première !";
    }else{
        obj.meilleurPrix = "Les deux formules sont similaires !";
    }
    return obj;
}
mentantLocationVoiture(120,5); 


/*---------------------------------- Exo 3 ---------------------------------

- Interval is defined as [start, end]- the start of an interval to the end of the interval. Given a list of Intervals.
 Your task is to check if any two intervals overlap.
  Example:
   Given Interval: [[1,5], [6,10], [12,15], [3,7]]
   Intervals are overlapping

   Given Interval: [[1,5], [6,10], [12,15]]
   No intervals overlap
--------------------------------------------------------------------------*/

function intervals(){
    let borneInf, borneSup, bool = false;
    let array = [];
    let nbrIntervals = prompt("Entrer le nombre d'intervalles");

    for(let i=0; i<nbrIntervals; i++){
        array[i]=[];
    }   
    // Remplir les intervalles
    for(let i=0; i<nbrIntervals; i++){
        borneInf = prompt("Entrer la borne inférieure de l'intervalle "+i);
        borneSup = prompt("Entrer la borne supérieure de l'intervalle "+i);
        array[i][0] = parseInt(borneInf);
        array[i][1] = parseInt(borneSup);
    }
    // Tester si y'a des intervalles qui se chevauchent
    let i=0;
    while(bool==false && i<nbrIntervals-1){       
        for(let j=i+1; j<nbrIntervals; j++){                 
            if(((array[i][0] <= array[j][0]) && (array[i][1] > array[j][0])) ||  ((array[i][0] <= array[j][1]) && (array[i][1] > array[j][1]))){           
                bool=true;                
            }
        } 
        i++;   
        console.log("ok");    
    }
    if(bool==true){
        return ("Les intervalles se chevauchent : "+array);
    }else{
        return ("Les intervalles ne se chevauchent pas : "+array);
    }
}
intervals();



/*---------------------------------- Exo 4 ---------------------------------

- Given a string, write a function to find the longest substring with at most K characters.
  Example:
   Input: aabbaacdeeeeddded, K = 3
   Output: Longest substring with 3 most unique characters is: cdeeeeddded with length 11
   Input: abcddefabc, K = 4
   Output: Longest substring with 4 most unique characters is: abcdd with length 5
   Input: aaaabbbb, K = 4
   Output: Not enough unique character is present in the input string

--------------------------------------------------------------------------*/
function substring(){
    let string = prompt("Entrer une chaine de caractères");
    console.log("La chaine de caractères : "+string);
    
    if(string != ""){
        let arrayChar = [], arraySubStrings = [];
        let k = prompt("Entrer le nombre de caractères (k) !");
        console.log("Le nombre de caractères k = "+k);
        let indice, j, cpt, bool, test=false;

        for(let i=0; i<=k; i++){
            arrayChar[i]=[];
        }
        arrayChar[0][0] = string[0];
        arrayChar[0][1] = 0;
        indice=0; cpt=0; 
        while(indice<string.length){           
            if(string[indice] != string[indice+1]){
                j=0; bool=false;
                while(j<arrayChar.length && bool==false){                   
                    if(string[indice+1] == arrayChar[j][0]) bool = true;
                    else j++;
                }
                if(bool==false){
                    cpt++;
                    arrayChar[cpt][0] = string[indice+1]; // le caractère
                    arrayChar[cpt][1] = indice+1; // l'indice du caractère dans string

                    if(cpt==k){  
                        test=true;                     
                        let m=arrayChar[0][1], subString="";
                        while(m<=indice){
                            subString = subString + string[m];
                            m++;
                        }                       
                        arraySubStrings.push(subString);
                        console.log("subString : "+subString);
                        arrayChar[0][0] = arrayChar[1][0];
                        arrayChar[0][1] = arrayChar[1][1];
                        indice = arrayChar[1][1];
                        for(let n=1; n<arrayChar.length; n++){
                            arrayChar[n][0]="";
                            arrayChar[n][1]=-1;
                        }
                        cpt=0;
                    }
                }                                   
            }              
            indice++;                                  
        }
        if(test==true){
            let longueur = 0;
            let longestSubString ="";
            for(let i=0; i<arraySubStrings.length; i++){
                if(arraySubStrings[i].length > longueur){
                    longueur = arraySubStrings[i].length;
                    longestSubString = arraySubStrings[i];
                }
            }
            return("La plus longue sous chaine est : "+longestSubString);  
        }else return("Y'a pas assez de caractères !");
              
    }else return("La chaine de caractères est vide.");
}
substring();



/*---------------------------------- Exo 5 ---------------------------------

- Given an array of positive and negative integers, write a function to find the two elements such their sum is closest to zero.
   a = {1, 4, -5, 3, -2, 10, -6, 20}; Output: Sum close to zero in the given array is : 1
   a = {-5, 5}; Output: Sum close to zero in the given array is : 0
   a = {5, 8}; Output: Sum close to zero in the given array is : 13
   a = {-5,-5}; Sum close to zero in the given array is : -10

--------------------------------------------------------------------------*/
function sumZero(){
    let nbrIntegers = prompt("Entrer le nombre d'entiers");
    let array = [];
    let sumMinPos = 1000, sumMinNeg = -1000;
    for(let i=0; i<nbrIntegers; i++){
        array[i] = prompt("Entrer un entier");
    }
    console.log("a = "+array);
    let cpt=0;
    while(cpt<array.length-1){
        for(let k=cpt+1; k<array.length; k++){
            sum = parseInt(array[cpt]) + parseInt(array[k]);
            if(sum < sumMinPos && sum >= 0){
                sumMinPos = sum;
            }else if(sum > sumMinNeg && sum < 0){
                sumMinNeg = sum;
            }
        }
        cpt++;
    }
    if(sumMinPos <= 0-sumMinNeg){
        return("Sum close to zero in the given array is : "+sumMinPos);
    }else if(sumMinPos > 0-sumMinNeg){
        return("Sum close to zero in the given array is : "+sumMinNeg);
    }   
}
sumZero();

