Projektdokumentation
Navn: Kasper Lisberg
Hold: 1146521c105 / WU05
Uddannelse: Webudvikler
Uddannelsessted: Roskilde Tekniske Skole
https://iplaymusic-kawern.netlify.app/

Teknologi-stack
HTML
CSS
JavaScript
React
...
**Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen (Teknisk dokumentation)
(Hvilke npm-pakker har du installeret for at dit projekt virker? Beskriv kort hvilket "problem" hver pakke løser.)**

    @emotion/react - direkte styling af komponenterne (<div css={style}>)

    @reach/router - navigering mellem sider og links

    @reach/accordion - en Accordion brugt til kategorier (åben og luk kategorier, ligesom en read-more knap)

    animate.css - brugt til animationer på de forskellige sider (bla. indhold der fader ind)

    node-sass - gør det muligt at bruge sass i et nodeprojekt

    react-h5-audio-player - brugt til musikafspilleren, gør det muligt at afspille lyd i browseren, samtidig er der en indbygget player der virker som en wrapper for de forskellige funktioner (play, next, forward etc.). Af personlige grunde valgte jeg at istedet for "dummy-data"-audio, har jeg valgt at den afspiller et preview af sangen som brugeren har valgt at afspille.

    react-icons - giver mulighed for at importere (og bruge) ikoner ligesom med fx. Fontawesome, bare bedre.

    react-lazyload - lazyloading af billeder, gør det mere smooth for brugeren at hente billeder

    react-spotify-web-playback - brugt til min testPlayer, det er en wrapper der arbejder med Spotify's Webplay SDK (kunne ikke få det til at virke 100% da min token ikke gad du, og den token man kan hente på spotify kun virker i 1 time. Jeg vil meget gerne vise at det virker, men jeg valgte at gå med en anden og mere funktionel player)

**Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven
(Hvilke overvejelser har du gjort dig, fx. i forbindelse med dit valg af animationer)**

    Jeg har valgt at bruge @reach/accordion, da jeg ikke kunne få min egen "read-more"-agtige funktion til at fungerer efter hensigten. Jeg synes det er en udemærket løsning, dog tænker jeg at det kunne have været gjort lidt mere smooth ift visning af nye kategorier.
    
    Jeg valgte at bruge en npm-pakke til spotify webplay sdk (som jeg så ikke lykkedes at få til at virke med token fra tokencontext/callback/login), men ellers så virkede den helt fint (med den token man kan generere på spotify der kun virker 1 time, hvorefter der så skal genereres en ny.)


**Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)
(Hvad gik godt. Hvor prioriterede du forkert. Klagesange fra de varme lande om halvfærdigt produkt, på grund af manglende nattesøvn, fordi din kæle-skildpadde havde tandpine er IKKE interessante.)**

Alt i alt er jeg tilfreds med min indsats og gennemførelse af projektet.

Jeg kunne dog godt have lavet nogen komponenter lidt anderledes (føler lidt at noget af det jeg display'er skulle have været i en komponent for sig selv, fx slider->slideritem og lign), men jeg ved ikke om det er forkert det jeg har gjort, nevertheless, så virker det.. Men det er noget jeg helt sikkert med mig videre til næste projekt (slider->slideritem fx.)



***En beskrivelse af særlige punkter til bedømmelse
(er der en særlig detalje som du synes din underviser bør lægge mærke til når dit projekt evalueres)***


Jeg brugte næsten en hel dag på at mappe igennem noget, som jeg troede var et array. Det var så et objekt, hvilket man selvfølgelig ikke kan mappe igennem.......
```javascript

const handleClick = value => async() => {
  await axios.get(`https://api.spotify.com/v1/browse/categories/${value}/playlists?country=US`,  {
    headers: {
        "Authorization": token
    }
})
.then(response => setPlaylists(response.data.playlists.items))
setLoading(false)
}
```