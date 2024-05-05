<footer>
    <section class="head">
        <a class="logo" href="@php echo get_home_url(); @endphp">
            <img src="@asset('images/logo.svg')" alt="La Poste Pro">
            <img src="@asset('images/titre_blog.svg')" alt="Mon Club Pro">
        </a>
        <div class="social">
            @if (get_field('reseaux_sociaux', 'option')['linkedin'])
                <a href="@php echo get_field('reseaux_sociaux', 'option')['linkedin']; @endphp">
                    <img src="@asset('images/icons/linkedin.svg')" alt="Linkedin">
                </a>
            @endif
            @if (get_field('reseaux_sociaux', 'option')['twitter'])
                <a href="@php echo get_field('reseaux_sociaux', 'option')['twitter']; @endphp">
                    <img src="@asset('images/icons/twitter.svg')" alt="Twitter">
                </a>
            @endif
            @if (get_field('reseaux_sociaux', 'option')['youtube'])
                <a href="@php echo get_field('reseaux_sociaux', 'option')['youtube']; @endphp">
                    <img src="@asset('images/icons/youtube.svg')" alt="Youtube">
                </a>
            @endif
        </div>
        @if (get_field('autres_sites', 'option'))
            <a class="other-sites" href="@php echo get_field('autres_sites', 'option'); @endphp">
                <p>Les autres sites <strong>La Poste Pro</strong></p>
                <div class="arrow">
                    <img src="@asset('images/icons/arrow.svg')" alt="Voir plus">
                </div>
            </a>
        @endif
    </section>
    <hr>
    <section class="nav">
        <nav>
            {!! wp_nav_menu(['footer_navigation' => 'legal']) !!}
        </nav>
    </section>
    @if (has_nav_menu('legal'))
        <hr>
        <section class="legal">
            <nav>
                {!! wp_nav_menu(['theme_location' => 'legal', 'separator' => '<hr>']) !!}
            </nav>
        </section>
    @endif
</footer>
