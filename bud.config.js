/**
 * @typedef {import('@roots/bud').Bud} Bud
 */

/**
 * Config export
 *
 * @param {Bud} bud
 */
export default async (bud) => {
  bud.setPath({
    '@storage': `storage/bud`,
  });

  /**
   * Server config
   */
  bud
    .proxy(bud.env.get('WP_HOME'))
    .serve(`http://localhost:4000`)
    .watch([bud.path(`resources/views`), bud.path(`app`)]);

  /**
   * Setup compilers
   */
  await bud.make(`radicle`, applyRadicleConfig);

  /**
   * Apply general config to all compilers
   */
  bud.container(bud.children).every(applyGeneralConfig);
};

/**
 * Configure Radicle
 *
 * @param {Bud} radicle
 */
const applyRadicleConfig = async (radicle) => {
  /**
   * We must add the extensions without using the deferred {@link Bud.use} convenience method because
   * we need to be able to access {@link Bud.wpjson} and override the sage default paths immediately.
   */
  await radicle.extensions.add([
    `@roots/bud-swc`,
    `@roots/bud-preset-wordpress`,
    `@roots/sage`,
    `@roots/bud-tailwindcss`,
    `@roots/bud-tailwindcss-theme-json`,
    `@roots/bud-stylelint`,
    `@roots/bud-eslint`,
    `@roots/bud-imagemin`,
    `@roots/bud-sass`,
  ]);

  radicle
    .setPath(`@dist`, `public/dist`)
    .setPublicPath(`/dist/`)
    .entry({
      app: [`@scripts/app`, `@styles/app`],
      editor: [`@scripts/editor`, `@styles/editor`],
    })
    .assets(`images`);

  /**
   * Setup theme.json
   */
  radicle.wpjson
    .set(`path`, radicle.path(`public/content/themes/radicle/theme.json`))
    .set(`settings.layout.contentSize`, `64rem`)
    .set(`settings.color.custom`, false)
    .set(`settings.color.customDuotone`, false)
    .set(`settings.color.defaultDuotone`, false)
    .set(`settings.color.defaultGradients`, false)
    .set(`settings.color.defaultPalette`, false)
    .set(`settings.color.duotone`, [])
    .set(`settings.custom.spacing`, {})
    .set(`settings.custom.typography.font-size`, {})
    .set(`settings.custom.typography.line-height`, {})
    .set(`settings.spacing.padding`, true)
    .set(`settings.spacing.units`, [`px`, `%`, `em`, `rem`, `vw`, `vh`])
    .set(`settings.typography.customFontSize`, false)
    .set(`settings.typography.dropCap`, undefined)
    .set(`styles.spacing.blockGap`, `1.5rem`)
    .set(`styles.spacing.padding.left`, `1.5rem`)
    .set(`styles.spacing.padding.right`, `1.5rem`)
    .set(`styles.typography.fontFamily`, `var(--wp--preset--font-family--sans)`)
    .set(`styles.typography.fontSize`, `var(--wp--preset--font-size--normal)`)
    .useTailwindColors()
    .useTailwindFontFamily()
    .useTailwindFontSize();
};

/**
 * This config is applied to all child compilers
 *
 * @param {string} label - compiler label
 * @param {Bud} child - compiler instance
 */
const applyGeneralConfig = (label, {isProduction, root, ...child}) => {
  child
    .setPath(`@storage`, root.path(`@storage`, label))
    .experiments({topLevelAwait: true})
    .splitChunks(isProduction)
    .minimize(isProduction)

    /**
     * Eslint config (when sed by the child compiler)
     */
    .when(`eslint` in child, ({eslint, isProduction}) =>
      eslint
        .set(`failOnWarning`, isProduction)
        .set(`failOnError`, isProduction)
    )

    /**
     * Stylelint (when used by the child compiler)
     */
    .when(`stylelint` in child, ({isProduction, stylelint}) =>
      stylelint
        .set(`failOnError`, isProduction)
        .set(`failOnWarning`, isProduction)
        .set(`fix`, true),
    )

    /**
     * Imagemin (when used by the child compiler)
     */
    .when(`imagemin` in child, ({imagemin, isProduction}) => {
      imagemin.sharp
        .set(`encodeOptions.jpeg.mozjpeg`, true)
        .set(`encodeOptions.jpeg.quality`, 70)
        .enable(isProduction);

      imagemin.svgo.enable(isProduction);
    });
};
