<div class="document <?= $section['sur_titre'] ? 'sur-titre' : '' ?>">
    @if ($section['sur_titre'])
        <p class="sur-titre">{{ $section['sur_titre'] }}</p>
    @endif
    <p class="titre">{{ $section['titre'] }}</p>
    <a href="{{ $section['document']['url'] }}" class="bouton bouton-violet" download>Télécharger</a>
</div>
