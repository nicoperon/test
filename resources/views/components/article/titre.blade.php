@php
    $titre = $section['texte'];
    $tag = $section['type'] == 'titre_1' ? 'h2' : 'h3';
@endphp

<{{ $tag }}>{{ $titre }}</{{ $tag }}>
