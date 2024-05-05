<div class="a-noter">
    <header>
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="48" viewBox="0 0 38 48" fill="none">
            <path
                d="M19 37.9536L6.9879 47.0209C4.28119 49.225 0.0530726 47.451 0 43.9209C0 43.885 0 43.8671 0 43.8313V4.90996C0 2.20411 2.17598 0 4.8473 0H33.1527C35.824 0 38 2.20411 38 4.90996V43.8492C38 48.4724 32.7989 48.7412 31.1359 47.0389"
                fill="#A71681" />
            <path
                d="M3.16664 4.90994C3.16664 3.97812 3.92735 3.20758 4.84727 3.20758H33.1527C34.0726 3.20758 34.8333 3.97812 34.8333 4.90994V43.5983C34.8333 44.3688 33.9665 44.8168 33.3473 44.3688L21.7067 35.5524C20.0968 34.3697 17.9031 34.3697 16.2933 35.5524L4.65267 44.3688C4.03349 44.8168 3.16664 44.3688 3.16664 43.5983V4.90994Z"
                fill="white" />
        </svg>
        <p class="titre">À noter</p>
    </header>
    <div class="contenu">
        {!! $section['texte'] !!}
    </div>
    @if ($section['bouton'])
        <a href="{{ $section['bouton']['url'] }}" target="{{ $section['bouton']['target'] }}"
            class="bouton bouton-jaune">{{ $section['bouton']['title'] }}</a>
    @endif
</div>
