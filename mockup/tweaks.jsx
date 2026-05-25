/* MIC Redesign — Tweaks panel */
function MicTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Hero">
        <TweakRadio
          label="Variante"
          value={tweaks.heroVariant}
          options={[
            { label: 'Mosaico', value: 'mosaic' },
            { label: 'Grid', value: 'grid' },
            { label: 'Minimal', value: 'minimal' },
          ]}
          onChange={v => setTweak('heroVariant', v)}
        />
      </TweakSection>
      <TweakSection title="Layout">
        <TweakRadio
          label="Densidad"
          value={tweaks.density}
          options={[
            { label: 'Compacta', value: 'compact' },
            { label: 'Default', value: 'default' },
            { label: 'Aire', value: 'spacious' },
          ]}
          onChange={v => setTweak('density', v)}
        />
        <TweakToggle
          label="Mostrar barra de confianza"
          checked={tweaks.showTrustBar}
          onChange={v => setTweak('showTrustBar', v)}
        />
      </TweakSection>
      <TweakSection title="Marca">
        <TweakColor
          label="Color de acento"
          value={tweaks.accent}
          onChange={v => setTweak('accent', v)}
        />
        <TweakSelect
          label="Métrica de canales"
          value={tweaks.channelCount}
          options={[
            { label: '40+', value: '40+' },
            { label: '50+', value: '50+' },
            { label: '38', value: '38' },
            { label: '24', value: '24' },
          ]}
          onChange={v => setTweak('channelCount', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}
window.MicTweaks = MicTweaks;
