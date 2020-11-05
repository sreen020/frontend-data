# functional-programming-rdw
 
## Onderzoeksvraag <br>
**Hoofdvraag**<br>
Amsterdam wilt steeds minder auto's in de stad hebben, heeft dit invloed op de aantal parkeerautomaten die er worden neergezet en weggehaald?

**Deelvragen en assumptie**<br>
- komen er sommige jaren meer bij dan andere jaren? (Ik denk dat er ieder jaar meer bijkomen, zeker als we kijken naar de grotere steden)
- Zijn er plaatsen waar de toename groter is dan andere plaatsen? (Ik denk dat de toename in grote steden en daar omheen fors toeneemt)
- Moet ik hier het hele daar door betaald parkeren of alleen in bepaalde maanden? (In de voorbeeld datarijen zag ik veel colommen staan waar je een aantal maanden niet hoeft te betalen)
- Waar en hoeveel parkeer parkeerautomaten komen er jaarlijks bij? 
- Worden er ook parkeerautomaten weggehaald?

extra - Zitten er overeenkomsten of een verschillen in de metaalmethode en de parkeerautomaten? (In de grote steden kan je meestal niet meer met cash betalen dus dit zal een verschil zijn.)

## Dataset(s)

**Dataset #1**<br>
https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEO-VERKOOPPUNT/cgqw-pfbp/ 

**Wat krijg ik uit deze dataset?** 
- AreaManagerId, number (Identificatiecode van de gebiedsbeheerder of parkeerexploitant.)
- SellingPointId, number (Identificatiecode van een verkooppunt. Het SellingPointId is numeriek en hoeft niet uniek te zijn. Een SellingPointId kan op meerdere locaties voorkomen, die samen een verkooppuntgroep vormen.)
- StartDateSellingPoint, number (Datum vanaf wanneer een bepaald verkooppunt actief is.)
- EndDateSellingPoint, number (Datum waarop een bepaald verkooppunt niet meer actief is.)
- SellingPointDesc, string (Omschrijving van een verkooppunt.)
- Location, string (De coördinaten van een verkooppunt.)

StartDateSellingPoint en EndDateSellingPoint worden weergegeven als: 20150301. Hier staat 01-03-2015, dmv de slice functie javascript heb ik deze getransformeerd naar het juiste formaat.

De location wordt bijvoorbeeld als: (51.733028°, 3.774917°) getoond. Dit is opgedeeld in latitude en longitude. Deze heb ik in mijn javascript gescheiden waardoor ik ze straks met D3 kan verwerken.

**Wat ga ik gebruiken?** 
Ik wil uit deze dataset de location gebruiken om te laten zien waar en hoeveel parkeerautomaten er in Nederland zijn. Ook wil ik de StartDateSellingPoint en de EndDateSellingPoint gebruiken om aan de hand van een timeline weer te geven wanneer deze punten zijn neergezet.

**JSON**
``` js
{
  areamanagerid: "299"
  location: [
    {
      latitude: "51.930899297"
      longitude: "6.076162452"
    }
  ]
  sellingpointdesc: "Parkeerterrein Haspelstraat"
  sellingpointid: "8704"
  startdatesellingpoint: "20180604"
}

```

**Dataset #2**<br>
https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-BETAALMETHODE-VERKOOPPUNT/j96a-7nhx

**Wat krijg ik uit deze dataset?** 
- SellingPointNumber, number (Identificatie van een verkooppunt.) 
- PaymentMethod, string (Betaalmethode die gebruikt kan worden voor het betalen van parkeren binnen een parkeergebied of -faciliteit.)
- StartDatePaymentMethod, number (Begindatum en -tijd van de periode waarin een bepaalde betaalmethode voor een verkooppunt geldig is.)
- EndDatePaymentMethod, number (Einddatum en -tijd van de periode waarin een bepaalde betaalmethode voor een verkooppunt geldig is.)

**Wat ga ik gebruiken?** 
Met deze dataset kan ik zien hoe er voornamelijk wordt betaald bij verschillende verkooppunten. Hier kan ik weer nieuwe vraagstukken uit halen, zoals: Waarom wordt er in steden meer met mobiel betaald dan op het platteland? of Hoe zal het komen dat er na 2018 helemaal niet meer wordt betaald met cash in Amsterdam?

Als het goed is kan ik deze linken met de verkooppunten van dataset 1 en kan ik deze visualisaties samenvoegen.



