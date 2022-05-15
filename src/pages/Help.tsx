import React from "react";
import Wrapper from "../components/Wrapper";

const Help: React.FC = () => {
  return <div className="font-mono font-bold px-20 py-10 w-full h-full text-white text-center bg-gray-900 margin-auto">
        <h1 className="text-4xl">Jak grać</h1>

        <br></br>
        <br></br>
        <br></br>
        <article className="text-lg" >
          Twoim zadaniem jest zgadnąć słowo, które jest długości od 5 do 10 włącznie.
          Zgaduje kolejne słowa a dowiesz się:
          - Literka która jest na tym samym miejscu w słowie do zgadnięcia i w słowie wpisanym, zostanie podświetlona na zielono.
          - Literka która jest w słowie do zgadnięcia, ale nie znajduje się na dobrej pozycji, zostanie podświetlona na żółto.
          - Literka która w ogóle nie występuje w słowie do zgadnięcia, zostanie podświetlona na szaro.
        </article>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <article className="text-lg" >
          W celu ułatwienia sobie zadania, możesz skorzystać z jednego z 4 ułatwień:
          - Usunięcie ostatniej kolumny (jeżeli słowo do zgadnięcia nie jest za długie)
          - Dodanie kolejnej próby
          - Zapytanie o długość słowa do zgadnięcia, w porównaniu do ostatnio wpisanego słowa. Dostaniesz informacje czy słowo jest dłuższe, krótsze czy takie samo.
          - Usunięcie z klawiatury jednej literki, której nie ma w słowie do zgadnięcia.
        </article>
  </div>;
};

export default Help;
